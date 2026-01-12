# Руководство по интеграции Backend API

Этот документ предоставляет исчерпывающее руководство для backend-разработчиков по подключению frontend-приложения Beliot к реальному API.

## Ключевая концепция

Вся логика получения данных с сервера инкапсулирована в одном файле: `src/lib/data.ts`.

**Ваша единственная задача** — реализовать функции в этом файле, заменив их текущие пустые реализации на реальные вызовы вашего API (например, с использованием `fetch`).

"Контракт данных" (типы, которые frontend ожидает от API) находится в файле `src/lib/types.ts`. Используйте его как источник истины для формирования ответов от вашего API.

---

## 1. Контракт данных: `src/lib/types.ts`

Этот файл определяет все основные сущности, с которыми работает frontend. Ваш API должен возвращать данные в строгом соответствии с этими типами.

### `Device` - Устройство

Представляет собой отдельный прибор учета (счетчик воды, тепла) или шлюз.

```typescript
export type Device = {
  id: number; // Уникальный числовой ID
  external_id: string; // Внешний идентификатор (DevEUI для LoRaWAN, IMEI для GSM и т.д.)
  serial_number: string; // Заводской серийный номер
  type: 'water' | 'heat'; // Тип прибора. Для шлюзов это поле не имеет значения, но должно присутствовать.
  model: string; // Модель устройства из справочника
  channel_type: string; // Тип канала связи ('lora', 'nbiot', и т.д.)
  address: string; // Фактический адрес установки
  object_name: string; // Название объекта, где установлено устройство (для быстрого отображения)
  status: 'online' | 'offline' | 'warning'; // Текущий статус
  unit_volume: 'м³'; // Единица измерения объема (для воды)
  unit_energy: 'ГДж'; // Единица измерения энергии (для тепла)
  unit_temperature: '°C'; // Единица измерения температуры (для тепла)
  created_at: string; // Дата создания в формате ISO 8601 (например, "2023-10-27T10:00:00.000Z")
  objectId: number; // ID объекта (`BeliotObject`), к которому привязано устройство
  attributes?: DeviceAttribute[]; // Опциональный массив доп. атрибутов
  is_gateway?: boolean; // Флаг, указывающий, является ли устройство шлюзом.
};
```

### `BeliotObject` - Объект

Представляет собой локацию, к которой могут быть привязаны устройства (например, здание, квартира, тепловой узел).

```typescript
export type BeliotObject = {
    id: number; // Уникальный числовой ID
    name: string; // Название объекта (например, "ЖК 'Солнечный', кв. 15")
    address: string; // Адрес объекта
    objectType: string; // Тип объекта из справочника (например, 'residential')
    deviceCount: number; // Общее количество устройств на объекте (включая дочерние)
    // Эти поля нужны для отображения статусов на странице "Объекты"
    onlineCount?: number;
    offlineCount?: number;
    warningCount?: number;
    parentId?: number | null; // ID родительского объекта для построения иерархии
    children?: BeliotObject[]; // Массив дочерних объектов (для иерархического отображения)
    companyId?: number; // ID компании, к которой относится объект
}
```

### `Reading` - Показание

Представляет собой единичный пакет данных, полученный от устройства.

```typescript
export type Reading = {
  time: string; // Время получения показания в формате ISO 8601
  device_id: number; // ID устройства, от которого пришли данные
  battery_percent: number; // Уровень заряда батареи в %
  rssi: number; // Уровень сигнала
  error_flags: number; // Битовая маска для флагов ошибок (см. UI для логики)
  // Поля для счетчиков воды
  in1?: number; // Накопленный объем, канал 1
  fflow1?: number; // Мгновенный расход, канал 1
  // ... (in2, fflow2 и т.д.)
  // Поля для счетчиков тепла
  energy?: number; // Накопленная энергия
  mass1?: number; // Масса (подача)
  temp_supply?: number; // Температура (подача)
  temp_return?: number; // Температура (обратка)
  // ... и другие
};
```

### Другие типы

*   `Company`: Описывает компанию-владельца. Структура аналогична `BeliotObject` с `parentId` для иерархии.
*   `User`: Описывает пользователя системы.
*   `DeviceAttribute`: Простой объект `{ name: string, value: string }` для дополнительных параметров устройства.

---

## 2. Точки интеграции: `src/lib/data.ts`

Это — **единственный файл, который вам нужно изменять**. Ниже приведено описание каждой функции и что она должна делать.

### `getDevices(companyId?: number): Promise<Device[]>`

*   **Назначение:** Получает список **всех** устройств.
*   **Параметры:**
    *   `companyId` (опционально, `number`): Если передан, API должен вернуть устройства, принадлежащие **только этой компании** (и ее дочерним компаниям). Если не передан, API должен вернуть **все устройства**, к которым у текущего пользователя есть доступ.
*   **Ожидаемый результат:** Массив объектов типа `Device`.
*   **Пример реализации:**
    ```typescript
    export async function getDevices(companyId?: number): Promise<Device[]> {
      const url = new URL('/api/v1/devices', 'https://your-api-endpoint.com');
      if (companyId) {
        url.searchParams.append('companyId', String(companyId));
      }
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }
        const data: Device[] = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return []; // Важно возвращать пустой массив в случае ошибки
      }
    }
    ```

### `getDeviceById(id: number): Promise<Device | undefined>`

*   **Назначение:** Получает одно устройство по его уникальному `id`.
*   **Ожидаемый результат:** Один объект типа `Device` или `undefined`, если устройство не найдено.
*   **Пример реализации:**
    ```typescript
    export async function getDeviceById(id: number): Promise<Device | undefined> {
      try {
        const response = await fetch(`https://your-api-endpoint.com/api/v1/devices/${id}`);
        if (response.status === 404) {
            return undefined;
        }
        if (!response.ok) {
            throw new Error('Failed to fetch device');
        }
        const data: Device = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return undefined;
      }
    }
    ```

### `getReadingsForDevice(deviceId: number): Promise<Reading[]>`

*   **Назначение:** Получает историю показаний для конкретного устройства.
*   **Ожидаемый результат:** Массив объектов типа `Reading`, отсортированный по времени (от старых к новым). Frontend сам обрабатывает фильтрацию по дате, поэтому API может возвращать все доступные показания (или, для оптимизации, за последний год).
*   **Пример реализации:**
    ```typescript
    export async function getReadingsForDevice(deviceId: number): Promise<Reading[]> {
      // Здесь можно добавить параметры для пагинации или фильтрации по дате, если ваш API это поддерживает.
      // Например: `/api/v1/devices/${deviceId}/readings?since=...`
      const response = await fetch(`https://your-api-endpoint.com/api/v1/devices/${deviceId}/readings`);
      // ... обработка ответа
      const data: Reading[] = await response.json();
      return data;
    }
    ```

### `getAllObjects(companyId?: number): Promise<BeliotObject[]>`

*   **Назначение:** Получает **плоский** список всех объектов. Используется в формах выбора и отчетах.
*   **Параметры:** `companyId` (опционально) - работает так же, как в `getDevices`.
*   **Ожидаемый результат:** **Плоский** массив (`BeliotObject[]`), **не иерархия**.
*   **Пример реализации:**
    ```typescript
    export async function getAllObjects(companyId?: number): Promise<BeliotObject[]> {
       // ... аналог getDevices
       const response = await fetch('...');
       const data: BeliotObject[] = await response.json();
       return data;
    }
    ```

### `getObjectsTree(companyId?: number): Promise<BeliotObject[]>`

*   **Назначение:** Получает иерархическую структуру объектов для отображения на странице "Объекты".
*   **Параметры:** `companyId` (опционально).
*   **Ожидаемый результат:** Массив `BeliotObject[]` **только корневых** объектов (у которых `parentId` равен `null`). Каждый объект, в свою очередь, должен содержать вложенный массив `children` со своими дочерними объектами. Frontend будет рекурсивно отображать это дерево.
*   **Пример реализации:**
    ```typescript
    export async function getObjectsTree(companyId?: number): Promise<BeliotObject[]> {
       const url = new URL('/api/v1/objects/tree', 'https://your-api-endpoint.com');
       if (companyId) {
         url.searchParams.append('companyId', String(companyId));
       }
       const response = await fetch(url.toString());
       // ... обработка ответа
       const data: BeliotObject[] = await response.json();
       return data;
    }
    ```

### Функции для `Company` и `User`

*   `getCompanies(): Promise<Company[]>`
*   `getCompaniesTree(): Promise<Company[]>`
*   `getUsers(companyId?: number): Promise<User[]>`

Эти функции работают по абсолютно аналогічной логике, что и их аналоги для `Device` и `BeliotObject`. `getCompaniesTree` также должна возвращать иерархическую структуру.

### `getGatewayForDevice(device: Device): Promise<Device | undefined>`

*   **Назначение:** Находит шлюз, к которому привязано устройство. Логика привязки зависит от вашей системы (например, через отдельное поле `gatewayId` в `Device`, которое нужно будет добавить в тип).
*   **Ожидаемый результат:** Объект шлюза (т.е. `Device` с `is_gateway: true`) или `undefined`.
*   **Пример реализации (если у устройства есть поле `gatewayId`):**
    ```typescript
    export async function getGatewayForDevice(device: Device): Promise<Device | undefined> {
        // Предполагаем, что вы добавите поле `gatewayId` в тип `Device`
        const gatewayId = (device as any).gatewayId;
        if (!gatewayId) {
            return undefined;
        }
        return getDeviceById(gatewayId); // Переиспользование уже существующей функции
    };
    ```

---

Следуя этому руководству, вы сможете планомерно и корректно подключить ваш backend к готовому frontend-интерфейсу.
