# Руководство по интеграции Backend API для Beliot

Этот документ — исчерпывающее руководство для backend-разработчиков по подключению frontend-приложения Beliot к реальному API. Он содержит описание архитектуры, структуры файлов и детальное описание "контракта данных" между frontend и backend.

## 1. Ключевая концепция: Единая точка интеграции

Вся логика получения данных с сервера инкапсулирована в одном файле: **`src/lib/data.ts`**.

**Ваша единственная задача** — реализовать `async` функции в этом файле, заменив их текущие реализации (которые возвращают демонстрационные mock-данные) на реальные вызовы вашего API (например, с использованием `fetch`).

Frontend уже построен с расчетом на асинхронное получение данных и использует нативные для Next.js механизмы, такие как `Suspense` и серверные компоненты, для отображения состояний загрузки.

---

## 2. Контракт данных: `src/lib/types.ts`

Этот файл — "источник истины". Ваш API должен возвращать данные в строгом соответствии с этими типами.

```typescript
// src/lib/types.ts

export type BeliotObject = {
    id: number; // Уникальный числовой ID
    name: string; // Название объекта (например, "ЖК 'Солнечный', кв. 15")
    address: string; // Адрес объекта
    objectType: string; // Тип объекта из справочника (например, 'residential')
    deviceCount: number; // Общее количество устройств на объекте (включая дочерние)
    onlineCount?: number; // Количество устройств онлайн
    offlineCount?: number; // Количество устройств офлайн
    warningCount?: number; // Количество устройств с предупреждениями
    parentId?: number | null; // ID родительского объекта для иерархии
    children?: BeliotObject[]; // Массив дочерних объектов (для древовидного представления)
    companyId?: number; // ID компании-владельца
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
    unp: string; // УНП (Учетный номер плательщика)
    parentId?: number | null;
    children?: Company[];
};

export type Device = {
  id: number;
  external_id: string; // Внешний идентификатор (DevEUI для LoRaWAN, IMEI для GSM и т.д.)
  serial_number: string; // Заводской серийный номер
  type: 'water' | 'heat'; // Тип прибора
  model: string; // Модель устройства из справочника
  channel_type: string; // Тип канала связи ('lora', 'nbiot', и т.д.)
  address: string; // Фактический адрес установки
  object_name: string; // Название объекта, где установлено устройство
  status: 'online' | 'offline' | 'warning'; // Текущий статус
  unit_volume: 'м³';
  unit_energy: 'ГДж';
  unit_temperature: '°C';
  created_at: string; // Дата создания в формате ISO 8601
  objectId: number; // ID объекта (`BeliotObject`), к которому привязан прибор
  companyId?: number; // ID компании-владельца
  gatewayId?: number; // ID шлюза, через который работает устройство (опционально)
  attributes?: DeviceAttribute[]; // Дополнительные атрибуты (ключ-значение)
  is_gateway?: boolean; // Флаг, является ли устройство шлюзом
};

export type Reading = {
  time: string; // Время показания в формате ISO 8601
  device_id: number;
  battery_percent: number;
  rssi: number;
  error_flags: number; // Битовая маска флагов ошибок
  // Поля для воды
  in1?: number;
  in2?: number;
  in3?: number;
  in4?: number;
  fflow1?: number; // Мгновенный расход
  fflow2?: number;
  fflow3?: number;
  fflow4?: number;
  // Поля для тепла
  energy?: number;
  mass1?: number;
  mass2?: number;
  mass3?: number;
  mass4?: number;
  temp_supply?: number; // Температура подачи
  temp_return?: number; // Температура обратки
};
```

---

## 3. Точки интеграции: `src/lib/data.ts`

Это — **единственный файл, который вам нужно изменять**. Ниже приведено описание каждой функции, что она должна делать, и как ее результат используется в UI.

### `getDevices(companyId?: number): Promise<Device[]>`

*   **Назначение:** Получает список **всех** устройств.
*   **Параметры:**
    *   `companyId` (опционально, `number`): Если передан, API должен вернуть устройства, принадлежащие **только этой компании** и всем её дочерним компаниям. Если не передан, API должен вернуть **все устройства**, к которым у текущего пользователя есть доступ (в зависимости от его роли и прав).
*   **Ожидаемый результат:** Массив объектов типа `Device`.
*   **Используется:**
    *   `src/app/(app)/dashboard/page.tsx`: Для отображения общей статистики на дашборде.
    *   `src/app/(app)/devices/page.tsx`: Для отображения основной таблицы устройств.
    *   `src/app/(app)/gateways/page.tsx`: Для фильтрации и отображения только шлюзов.

### `getDeviceById(id: number): Promise<Device | undefined>`

*   **Назначение:** Получает одно устройство по его уникальному `id`.
*   **Ожидаемый результат:** Один объект типа `Device` или `undefined`, если устройство не найдено (frontend обработает это и покажет 404 страницу).
*   **Используется:**
    *   `src/app/(app)/devices/[id]/page.tsx`: Для отображения детальной информации об устройстве.
    *   `src/app/(app)/devices/[id]/logs/page.tsx`: Для получения информации об устройстве на странице логов.

### `getReadingsForDevice(deviceId: number): Promise<Reading[]>`

*   **Назначение:** Получает историю показаний для конкретного устройства.
*   **Ожидаемый результат:** Массив объектов типа `Reading`, отсортированный по времени (от старых к новым). Frontend сам выполняет фильтрацию по дате на клиенте, поэтому для простоты API может возвращать все доступные показания (или, для оптимизации, за последние 3-12 месяцев).
*   **Используется:**
    *   `src/app/(app)/devices/[id]/page.tsx`: Для построения графиков и таблицы показаний.
    *   `src/components/dashboard/recent-activity.tsx`: Для определения деталей последних предупреждений.

### `getAllObjects(companyId?: number): Promise<BeliotObject[]>`

*   **Назначение:** Получает **плоский** список всех объектов.
*   **Параметры:** `companyId` (опционально) - работает так же, как в `getDevices`.
*   **Ожидаемый результат:** **Плоский** массив `BeliotObject[]`, **не иерархия**. Frontend использует этот плоский список для форм выбора, где нужна простая структура.
*   **Используется:**
    *   `src/app/(app)/reports/page.tsx`: Для выпадающего списка в форме отчетов.
    *   `src/components/shared/edit-form.tsx`: Для выбора объекта при редактировании устройства.

### `getObjectsTree(companyId?: number): Promise<BeliotObject[]>`

*   **Назначение:** Получает иерархическую структуру объектов для отображения на странице "Объекты".
*   **Ожидаемый результат:** Массив `BeliotObject[]` **только корневых** объектов (у которых `parentId` равен `null`). Каждый объект, в свою очередь, должен содержать вложенный массив `children` со своими дочерними объектами, если они есть. Frontend рекурсивно отобразит это дерево.
*   **Важно:** Для каждого объекта в дереве должны быть рассчитаны поля `deviceCount`, `onlineCount`, `offlineCount`, `warningCount`, которые включают в себя **все устройства на этом объекте и на всех его дочерних объектах**.
*   **Используется:**
    *   `src/app/(app)/objects/page.tsx`: Для построения интерактивной таблицы объектов.

### `getCompanies(): Promise<Company[]>`

*   **Назначение:** Получает **плоский** список всех компаний.
*   **Ожидаемый результат:** Плоский массив `Company[]`.
*   **Используется:**
    *   `src/components/users/create-user-form.tsx`: Для выбора компании при создании пользователя.
    *   `src/components/companies/create-company-form.tsx`: Для выбора родительской организации.

### `getCompaniesTree(): Promise<Company[]>`

*   **Назначение:** Получает иерархическую структуру компаний.
*   **Ожидаемый результат:** Массив `Company[]` только корневых компаний, где у каждой в `children` находятся дочерние.
*   **Используется:**
    *   `src/app/(app)/companies/page.tsx`: Для построения таблицы компаний.

### `getUsers(companyId?: number): Promise<User[]>`

*   **Назначение:** Получает список пользователей.
*   **Параметры:** `companyId` (опционально) - работает так же, как в `getDevices`.
*   **Ожидаемый результат:** Массив `User[]`.
*   **Используется:**
    *   `src/app/(app)/users/page.tsx`: Для отображения списка пользователей.

### `getGatewayForDevice(device: Device): Promise<Device | undefined>`

*   **Назначение:** Находит шлюз, к которому привязано устройство.
*   **Логика:** Frontend предполагает, что у `Device` есть опциональное поле `gatewayId: number`. Эта функция должна найти устройство с `id`, равным `gatewayId` и у которого `is_gateway: true`.
*   **Ожидаемый результат:** Объект шлюза (т.е. `Device` с `is_gateway: true`) или `undefined`.
*   **Используется:**
    *   `src/components/devices/columns.tsx`: Для отображения ссылки на шлюз в таблице устройств.

---

## 4. Справочники: `src/lib/catalogs.ts`

Этот файл содержит статические данные для выпадающих списков. В будущем вы можете легко переделать его для загрузки этих данных из вашего API.

```typescript
// src/lib/catalogs.ts

export type CatalogItem = {
    id: string;
    value: string;
    label: string;
    unit?: string;
}

// Модели устройств
export const deviceModels: CatalogItem[] = [ ... ];

// Модели шлюзов
export const gatewayModels: CatalogItem[] = [ ... ];

// Типы каналов связи
export const channelTypes: CatalogItem[] = [ ... ];

// Типы объектов
export const objectTypes: CatalogItem[] = [ ... ];

// Типы показаний (для построения отчетов в будущем)
export const readingTypes: { [key: string]: CatalogItem[] } = {
    water: [ ... ],
    heat: [ ... ]
}
```

---

## 5. Структура проекта (ключевые файлы)

```
.
├── src
│   ├── app
│   │   ├── (app)                     # Основная группа роутов приложения (с layout)
│   │   │   ├── catalogs/page.tsx       # Страница "Справочники"
│   │   │   ├── companies/page.tsx      # Страница "Компании"
│   │   │   ├── dashboard/page.tsx      # Дашборд
│   │   │   ├── devices
│   │   │   │   ├── [id]
│   │   │   │   │   ├── logs/page.tsx # Логи устройства
│   │   │   │   │   └── page.tsx      # Детальная страница устройства
│   │   │   │   └── page.tsx          # Список всех устройств
│   │   │   ├── gateways/page.tsx       # Страница "Шлюзы"
│   │   │   ├── objects/page.tsx        # Страница "Объекты"
│   │   │   ├── reports/page.tsx        # Страница "Отчеты"
│   │   │   ├── users/page.tsx          # Страница "Пользователи"
│   │   │   └── layout.tsx            # Главный layout приложения (шапка, сайдбар)
│   │   ├── globals.css               # Глобальные стили и переменные Tailwind
│   │   └── layout.tsx                # Корневой layout (шрифты, фон)
│   │
│   ├── components
│   │   ├── catalogs/                 # Компоненты для страницы "Справочники"
│   │   ├── companies/                # Компоненты для страницы "Компании"
│   │   ├── dashboard/                # Компоненты для дашборда
│   │   ├── device-detail/            # Компоненты для детальной страницы устройства
│   │   ├── devices/                  # Компоненты для списка устройств
│   │   ├── gateways/                 # Компоненты для шлюзов
│   │   ├── layout/                   # Компоненты layout-а (шапка, навигация)
│   │   ├── objects/                  # Компоненты для страницы "Объекты"
│   │   ├── reports/                  # Компоненты для отчетов
│   │   ├── shared/                   # Общие переиспользуемые компоненты (формы, пикеры)
│   │   ├── ui/                       # Базовые UI-компоненты (кнопки, карточки и т.д. - ShadCN)
│   │   └── users/                    # Компоненты для страницы "Пользователи"
│   │
│   ├── hooks/                        # Пользовательские React хуки
│   │   ├── use-mobile.tsx            # Хук для определения мобильного устройства
│   │   └── use-toast.ts              # Хук для управления уведомлениями
│   │
│   └── lib
│       ├── catalogs.ts               # !!! Справочные данные (модели, типы и т.д.)
│       ├── data.ts                   # !!! ЕДИНСТВЕННАЯ ТОЧКА ИНТЕГРАЦИИ API
│       ├── types.ts                  # !!! КОНТРАКТ ДАННЫХ (типы TypeScript)
│       └── utils.ts                  # Вспомогательные утилиты (например, `cn` для стилей)
│
├── docs
│   └── integration-guide.md        # Подробное руководство по интеграции (этот файл)
│
└── package.json                    # Зависимости проекта
```

Следуя этому руководству, вы сможете планомерно и корректно подключить ваш backend к готовому frontend-интерфейсу.
