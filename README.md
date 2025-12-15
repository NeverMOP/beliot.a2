# Документация по интерфейсу Beliot

Этот документ описывает структуру фронтенд-приложения, ключевые типы данных и файлы, которые необходимо модифицировать для интеграции с вашим backend.

## 1. Структура данных (Контракт API)

Все основные типы данных, используемые в приложении, определены в файле `src/lib/types.ts`. Ваш backend должен возвращать данные в соответствии с этими структурами.

---

### `Device` - Устройство

Представляет собой отдельный прибор учета (счетчик воды, тепла и т.д.).

```typescript
export type Device = {
  id: number;                 // Уникальный ID
  external_id: string;        // Внешний ID (DevEUI/IMEI)
  serial_number: string;      // Серийный номер
  type: 'water' | 'heat';     // Тип устройства: 'вода' или 'тепло'
  model: string;              // Модель
  channel_type: string;       // Тип канала связи (lora, nbiot, и т.д.)
  address: string;            // Полный адрес установки
  object_name: string;        // Название объекта, где установлено
  status: 'online' | 'offline' | 'warning'; // Статус
  unit_volume: 'м³';          // Единица измерения объема
  unit_energy: 'ГДж';         // Единица измерения энергии
  unit_temperature: '°C';     // Единица измерения температуры
  created_at: string;         // Дата создания (ISO 8601)
  objectId: number;           // ID объекта, к которому привязано устройство
  attributes?: DeviceAttribute[]; // Опциональные доп. атрибуты
  is_gateway?: boolean;       // Является ли шлюзом
};
```
- **Используется в:**
  - `src/app/(app)/devices/page.tsx` (Список всех устройств)
  - `src/app/(app)/devices/[id]/page.tsx` (Детальная страница устройства)
  - `src/app/(app)/dashboard/page.tsx` (Для виджетов)

---

### `Reading` - Показания

Представляет собой одну запись с данными, полученными от устройства.

```typescript
export type Reading = {
  time: string;           // Время снятия показания (ISO 8601)
  device_id: number;      // ID устройства
  battery_percent: number;// Уровень заряда батареи в %
  rssi: number;           // Уровень сигнала
  error_flags: number;    // Флаги ошибок

  // Поля для счетчиков воды
  in1?: number;           // Накопленный объем 1
  fflow1?: number;        // Мгновенный расход 1
  // ... in2, fflow2 и т.д.

  // Поля для счетчиков тепла
  energy?: number;        // Энергия
  mass1?: number;         // Масса
  temp_supply?: number;   // Температура подачи
  temp_return?: number;   // Температура обратки
};
```
- **Используется в:**
  - `src/app/(app)/devices/[id]/page.tsx` (Таблица и графики показаний)

---

### `BeliotObject` - Объект

Представляет собой физический объект (здание, тепловой пункт), на котором установлены устройства.

```typescript
export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    objectType: 'residential' | 'business_center' | 'mall' | 'medical' | 'school' | 'kindergarten' | 'heating_point' | 'warehouse';
    deviceCount: number; // Количество устройств на объекте
};
```
- **Используется в:**
  - `src/app/(app)/objects/page.tsx` (Список объектов)

---

### `User` - Пользователь

```typescript
export type User = {
    id: number;
    email: string;
    full_name: string;
    role: 'admin' | 'user' | 'viewer'; // Роль в системе
};
```
- **Используется в:**
  - `src/app/(app)/users/page.tsx` (Список пользователей)

---

## 2. Файлы для интеграции

Вся логика получения данных на данный момент является "заглушкой" и находится в одном файле.

### `src/lib/data.ts`

**Это главный файл, который вам нужно будет изменить.** Сейчас он содержит статические массивы с тестовыми данными.

**Что нужно сделать:**
1.  Удалить или закомментировать тестовые данные (`devices`, `objects`, `users`, `readings`).
2.  Переписать функции, которые экспортирует этот файл, чтобы они делали асинхронные запросы (fetch) к вашему backend API.

**Экспортируемые сущности, которые нужно заменить:**

-   `devices: Device[]`: Должен быть заменен функцией, которая получает все устройства.
-   `objects: BeliotObject[]`: Должен быть заменен функцией, которая получает все объекты.
-   `users: User[]`: Должен быть заменен функцией, которая получает всех пользователей.
-   `getDeviceById(id: number): Device | undefined`: Должна делать запрос к API для получения одного устройства по его ID.
-   `getReadingsForDevice(deviceId: number): Reading[]`: Должна делать запрос к API для получения всех показаний для конкретного устройства.

Пример, как может выглядеть измененная функция:

```typescript
// Было в src/lib/data.ts:
export const getDeviceById = (id: number): Device | undefined =>
  devices.find((d) => d.id === id);


// Должно стать (пример):
export const getDeviceById = async (id: number): Promise<Device | undefined> => {
  const response = await fetch(`https://your-api.com/devices/${id}`);
  if (!response.ok) {
    return undefined;
  }
  const device: Device = await response.json();
  return device;
};
```
*Примечание: после таких изменений вам нужно будет обновить компоненты, использующие эти функции, добавив `async/await`.*

---

## 3. Справочники

Данные для выпадающих списков (модели устройств, типы каналов) сейчас хранятся в `src/lib/catalogs.ts`.

```typescript
// src/lib/catalogs.ts
export const deviceModels: string[] = [ ... ];
export const gatewayModels: string[] = [ ... ];
export const channelTypes: string[] = [ ... ];
```
Эти массивы также можно заменить на запросы к вашему API, если эти данные будут управляться на backend. Они используются в формах создания устройств и шлюзов.
- `src/components/devices/create-device-form.tsx`
- `src/components/gateways/create-gateway-form.tsx`
- `src/app/(app)/catalogs/page.tsx`
