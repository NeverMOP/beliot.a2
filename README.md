# Документация по интерфейсу Beliot (Frontend)

Этот документ представляет собой исчерпывающее руководство по frontend-части приложения Beliot. Цель — предоставить backend-разработчикам всю необходимую информацию для успешной интеграции.

## 1. Обзор и стек технологий

Frontend-приложение представляет собой интерактивную панель управления (dashboard) для мониторинга IoT-устройств (счетчиков воды, тепла и т.д.).

**Ключевые технологии:**
- **Next.js (v14+):** React-фреймворк для создания серверных и статических веб-приложений. Используется App Router.
- **React (v18+):** Библиотека для построения пользовательских интерфейсов.
- **TypeScript:** Основной язык программирования, обеспечивающий строгую типизацию.
- **Tailwind CSS:** Утилитарный CSS-фреймворк для быстрой стилизации.
- **ShadCN/UI:** Коллекция готовых, стильных и адаптивных React-компонентов.
- **Recharts:** Библиотека для построения графиков и диаграмм.
- **Lucide React:** Набор иконок.

---

## 2. Структура проекта

Ниже описана структура ключевых директорий и файлов.

```
/
├── src/
│   ├── app/                                  # Основная папка Next.js App Router
│   │   ├── (app)/                            # Группа роутов для аутентифицированных пользователей
│   │   │   ├── dashboard/page.tsx            # Главная страница (дашборд)
│   │   │   ├── devices/
│   │   │   │   ├── [id]/page.tsx             # Детальная страница устройства
│   │   │   │   └── page.tsx                  # Страница со списком всех устройств
│   │   │   ├── objects/page.tsx              # Страница объектов
│   │   │   ├── gateways/page.tsx             # Страница шлюзов
│   │   │   ├── companies/page.tsx            # Страница компаний
│   │   │   ├── reports/page.tsx              # Страница для формирования отчетов
│   │   │   ├── users/page.tsx                # Страница управления пользователями
│   │   │   └── catalogs/page.tsx             # Страница справочников
│   │   │   └── layout.tsx                    # Общий макет для аутентифицированной зоны
│   │   ├── globals.css                       # Глобальные стили и переменные Tailwind/CSS
│   │   └── layout.tsx                        # Корневой макет приложения
│   │   └── page.tsx                          # Корневая страница (редиректит на /dashboard)
│   │
│   ├── components/                           # Папка с React-компонентами
│   │   ├── ui/                               # Компоненты из библиотеки ShadCN (кнопки, карточки, etc.)
│   │   └── ...                             # Компоненты для конкретных разделов (dashboard, devices, и т.д.)
│   │
│   ├── lib/                                  # Вспомогательные файлы и утилиты
│   │   ├── types.ts                          # !!! ВАЖНО: Определения типов данных (контракт с backend)
│   │   ├── data.ts                           # !!! ВАЖНО: Файл для интеграции (получение данных)
│   │   ├── catalogs.ts                       # Статические данные для справочников
│   │   └── utils.ts                          # Вспомогательные функции (e.g., `cn` для стилей)
│   │
│   └── hooks/                                # Пользовательские React-хуки
│
├── public/                                   # Статические файлы (изображения, иконки)
├── next.config.ts                            # Конфигурация Next.js
├── tailwind.config.ts                        # Конфигурация Tailwind CSS
└── package.json                              # Зависимости и скрипты проекта
```

---

## 3. Контракт API: Структуры данных

**Это самая важная часть для интеграции.** Ваш backend должен возвращать данные в точном соответствии с типами, определенными в файле `src/lib/types.ts`. Любые изменения в структурах данных на backend должны быть синхронизированы с этим файлом.

### `src/lib/types.ts`
```typescript
export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    objectType: 'residential' | 'business_center' | 'mall' | 'medical' | 'school' | 'kindergarten' | 'heating_point' | 'warehouse';
    deviceCount: number;
    onlineCount?: number;
    offlineCount?: number;
    warningCount?: number;
    parentId?: number | null;
    children?: BeliotObject[];
    companyId?: number;
}

export type DeviceAttribute = {
    name: string;
    value: string;
}

export type User = {
    id: number;
    email: string;
    full_name: string;
    role: 'admin' | 'user' | 'viewer';
    companyId?: number;
}

export type Company = {
    id: number;
    name: string;
    unp: string;
    parentId?: number | null;
    children?: Company[];
};

export type Device = {
  id: number;
  external_id: string;
  serial_number: string;
  type: 'water' | 'heat';
  model: string;
  channel_type: 'lora' | 'nbiot' | 'rs485';
  address: string;
  object_name: string;
  status: 'online' | 'offline' | 'warning';
  unit_volume: 'м³';
  unit_energy: 'ГДж';
  unit_temperature: '°C';
  created_at: string;
  objectId: number;
  attributes?: DeviceAttribute[];
  is_gateway?: boolean;
};

export type Reading = {
  time: string;
  device_id: number;
  battery_percent: number;
  rssi: number;
  error_flags: number;
  // Water specific
  in1?: number;
  in2?: number;
  in3?: number;
  in4?: number;
  fflow1?: number;
  fflow2?: number;
  fflow3?: number;
  fflow4?: number;
  // Heat specific
  energy?: number;
  mass1?: number;
  mass2?: number;
  mass3?: number;
  mass4?: number;
  temp_supply?: number;
  temp_return?: number;
};
```

---

## 4. Точка интеграции: Получение данных

**Это главный файл, который вам нужно будет модифицировать.** Вся логика получения данных сведена в один файл `src/lib/data.ts`. На данный момент он содержит асинхронные функции, которые возвращают статические "заглушки" (mock data).

**Ваша задача:** Переписать **тело** этих асинхронных функций, чтобы они делали реальные запросы (`fetch`) к вашему backend API. Сигнатуры функций менять не нужно.

### `src/lib/data.ts` (Инструкции по изменению)

#### Что нужно заменить:
Вам нужно заменить реализацию (тело функции) для следующих функций:
-   `getDevices(companyId?: number)`: Должна делать GET-запрос к вашему эндпоинту (например, `/api/devices`) и возвращать `Promise<Device[]>`.
-   `getAllObjects(companyId?: number)`: Должна делать GET-запрос к `/api/objects` и возвращать `Promise<BeliotObject[]>`.
-   `getUsers(companyId?: number)`: Должна делать GET-запрос к `/api/users` и возвращать `Promise<User[]>`.
-   `getCompanies()`: Должна делать GET-запрос к `/api/companies` и возвращать `Promise<Company[]>`.
-   `getDeviceById(id: number)`: Должна делать GET-запрос к `/api/devices/{id}`.
-   `getReadingsForDevice(deviceId: number)`: Должна делать GET-запрос к `/api/devices/{deviceId}/readings`.

#### Пример модификации:

```typescript
// БЫЛО в src/lib/data.ts:
export async function getDeviceById(id: number): Promise<Device | undefined> {
  const allDevices = await getDevices();
  return allDevices.find((d) => d.id === id);
}


// ДОЛЖНО СТАТЬ (примерно так):
export async function getDeviceById(id: number): Promise<Device | undefined> {
  const API_BASE_URL = 'https://your-backend-api.com/api';
  try {
    const response = await fetch(`${API_BASE_URL}/devices/${id}`);
    if (!response.ok) {
      console.error(`Failed to fetch device with id ${id}:`, response.statusText);
      return undefined;
    }
    const device: Device = await response.json();
    return device;
  } catch (error) {
    console.error('Error fetching device:', error);
    return undefined;
  }
};
```
**Важно:** Вся остальная часть приложения уже использует эти функции асинхронно. Вам не нужно вносить изменения в компоненты React. Вся интеграция сводится к модификации файла `src/lib/data.ts`.
