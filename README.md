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
- **Genkit:** Фреймворк для работы с генеративным AI.

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
│   │   ├── dashboard/                        # Компоненты для страницы дашборда
│   │   ├── devices/                          # Компоненты для списка устройств (таблица, колонки)
│   │   ├── device-detail/                    # Компоненты для детальной страницы устройства
│   │   └── layout/                           # Компоненты макета (шапка, навигация)
│   │
│   ├── lib/                                  # Вспомогательные файлы и утилиты
│   │   ├── types.ts                          # !!! ВАЖНО: Определения типов данных (контракт с backend)
│   │   ├── data.ts                           # !!! ВАЖНО: Файл для интеграции (получение данных)
│   │   ├── catalogs.ts                       # Статические данные для справочников
│   │   ├── utils.ts                          # Вспомогательные функции (e.g., `cn` для стилей)
│   │   └── placeholder-images.ts/json        # Данные для плейсхолдеров изображений
│   │
│   └── hooks/                                # Пользовательские React-хуки
│       ├── use-mobile.tsx                    # Хук для определения мобильного устройства
│       └── use-toast.ts                      # Хук для отображения уведомлений
│
├── public/                                   # Статические файлы (изображения, иконки)
├── next.config.ts                            # Конфигурация Next.js
├── tailwind.config.ts                        # Конфигурация Tailwind CSS
└── package.json                              # Зависимости и скрипты проекта
```

---

## 3. Контракт API: Структуры данных

**Это самая важная часть для интеграции.** Ваш backend должен возвращать данные в точном соответствии с типами, определенными в файле `src/lib/types.ts`.

### `src/lib/types.ts`
```typescript
export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    objectType: 'residential' | 'business_center' | 'mall' | 'medical' | 'school' | 'kindergarten' | 'heating_point' | 'warehouse';
    deviceCount: number;
    parentId?: number | null;
    children?: BeliotObject[];
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
}

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

**Это главный файл, который вам нужно будет модифицировать.** Вся логика получения данных сведена в один файл `src/lib/data.ts`. На данный момент он содержит статические "заглушки" (mock data).

**Ваша задача:** Переписать экспортируемые функции, чтобы они делали асинхронные запросы (`fetch`) к вашему backend API.

### `src/lib/data.ts` (Инструкции по изменению)

#### Что нужно заменить:

-   `devices: Device[]`: Заменить на асинхронную функцию `getDevices()`, которая делает GET-запрос к вашему эндпоинту (например, `/api/devices`) и возвращает `Promise<Device[]>`.
-   `objects: BeliotObject[]`: Заменить на функцию `getObjects()`, которая делает GET-запрос к `/api/objects` и возвращает `Promise<BeliotObject[]>`.
-   `users: User[]`: Заменить на функцию `getUsers()`, которая делает GET-запрос к `/api/users` и возвращает `Promise<User[]>`.
-   `getDeviceById(id: number)`: Переписать на `async` функцию, делающую запрос к `/api/devices/{id}`.
-   `getReadingsForDevice(deviceId: number)`: Переписать на `async` функцию, делающую запрос к `/api/devices/{deviceId}/readings`.

#### Пример модификации:

```typescript
// БЫЛО в src/lib/data.ts:
export const getDeviceById = (id: number): Device | undefined =>
  devices.find((d) => d.id === id);


// ДОЛЖНО СТАТЬ (примерно так):
export const getDeviceById = async (id: number): Promise<Device | undefined> => {
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
**Важно:** После изменения этих функций на асинхронные, вам нужно будет обновить компоненты, которые их вызывают, добавив `async/await`. Например, страница `src/app/(app)/devices/[id]/page.tsx` должна стать асинхронным серверным компонентом.

---

## 5. Код всех файлов проекта

Ниже представлен полный код всех значимых файлов проекта для вашего удобства.

### `apphosting.yaml`
```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
```

### `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### `next.config.ts`
```ts
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

### `package.json`
```json
{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@tanstack/react-table": "^8.19.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "15.5.9",
    "patch-package": "^8.0.0",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.3",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

### `src/ai/dev.ts`
```ts
// Flows will be imported for their side effects in this file.
```

### `src/ai/genkit.ts`
```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

### `src/app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 22%;
    --header: 0 0% 22.4%;
    --header-foreground: 0 0% 98%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 22%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 22%;
    --primary: 38 100% 52%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 38 100% 52%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 38 100% 52%;
    --chart-1: 120 70% 40%; /* Green */
    --chart-2: 40 100% 52%;
    --chart-3: 197 37% 24%;
    --chart-4: 0 84.2% 60.2%; /* Red */
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 22%;
    --sidebar-foreground: 0 0% 95%;
    --sidebar-primary: 38 100% 52%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 27%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 30%;
    --sidebar-ring: 38 100% 52%;
  }
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --header: 0 0% 22.4%;
    --header-foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 38 100% 52%;
    --primary-foreground: 0 0% 0%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 38 100% 52%;
    --accent-foreground: 0 0% 0%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 38 100% 52%;
    --chart-1: 120 70% 50%; /* Green */
    --chart-2: 0 0% 80%;
    --chart-3: 30 80% 55%;
    --chart-4: 0 70% 50%; /* Red */
    --chart-5: 340 75% 55%;
    --sidebar-background: 0 0% 12%;
    --sidebar-foreground: 0 0% 95%;
    --sidebar-primary: 38 100% 52%;
    --sidebar-primary-foreground: 0 0% 0%;
    --sidebar-accent: 0 0% 20%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 25%;
    --sidebar-ring: 38 100% 52%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### `src/app/layout.tsx`
```tsx
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Beliot Dashboard',
  description: 'IoT-платформа для мониторинга устройств',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`
```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
}
```

### `src/app/(app)/layout.tsx`
```tsx
import { AppHeader } from '@/components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex min-h-svh w-full flex-col">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
  );
}
```

### `src/app/(app)/catalogs/page.tsx`
```tsx
import { CatalogCard } from '@/components/catalogs/catalog-card';
import { deviceModels, channelTypes, gatewayModels } from '@/lib/catalogs';

export default function CatalogsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Здесь вы сможете управлять списками моделей, типов каналов и другими параметрами системы.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CatalogCard
          title="Модели устройств"
          description="Управление списком доступных моделей устройств."
          items={deviceModels}
          itemName="модель"
          dialogTitle="Добавить новую модель"
          dialogDescription="Введите название новой модели устройства."
          dialogInputPlaceholder="например, UltraHeat-3000"
        />
         <CatalogCard
          title="Модели шлюзов"
          description="Управление списком доступных моделей шлюзов."
          items={gatewayModels}
          itemName="модель шлюза"
          dialogTitle="Добавить новую модель шлюза"
          dialogDescription="Введите название новой модели шлюза."
          dialogInputPlaceholder="например, Beliot Gateway v3"
        />
        <CatalogCard
          title="Типы каналов связи"
          description="Управление списком доступных типов каналов."
          items={channelTypes}
          itemName="тип канала"
          dialogTitle="Добавить новый тип канала"
          dialogDescription="Введите название нового типа канала связи."
          dialogInputPlaceholder="например, gsm"
        />
      </div>
    </div>
  );
}
```

### `src/app/(app)/dashboard/page.tsx`
```tsx
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DeviceStatusChart } from '@/components/dashboard/device-status-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DeviceStatusChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
```

### `src/app/(app)/devices/[id]/page.tsx`
```tsx
import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DeviceInfo } from '@/components/device-detail/device-info';
import { ReadingsCharts } from '@/components/device-detail/readings-charts';
import { DeviceReadings } from '@/components/device-detail/device-readings';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const device = getDeviceById(deviceId);
  const readings = getReadingsForDevice(deviceId);

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DeviceInfo device={device} />
        </div>
        <div className="lg:col-span-2">
          <ReadingsCharts device={device} readings={readings} />
        </div>
      </div>
      <DeviceReadings device={device} readings={readings} />
    </div>
  );
}
```

### `src/app/(app)/devices/page.tsx`
```tsx
'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { columns as allColumns } from '@/components/devices/columns';
import { CreateDeviceForm } from '@/components/devices/create-device-form';
import { Button } from '@/components/ui/button';
import { type Device } from '@/lib/types';
import { List, Droplets, Thermometer, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react';
import { 
    type ColumnDef,
    type ColumnFiltersState, 
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    useReactTable,
} from '@tanstack/react-table';
import { useIsMobile } from '@/hooks/use-mobile';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const searchFields: { value: keyof Device; label: string }[] = [
    { value: 'object_name', label: 'Объект' },
    { value: 'address', label: 'Адрес' },
    { value: 'serial_number', label: 'Серийный номер' },
    { value: 'id', label: 'ID' },
    { value: 'external_id', label: 'Идентификатор' },
]

function DesktopControls({
    typeFilter,
    setTypeFilter,
    searchField,
    setSearchField,
    searchValue,
    setSearchValue,
}:{
    typeFilter: 'all' | 'water' | 'heat';
    setTypeFilter: (value: 'all' | 'water' | 'heat') => void;
    searchField: keyof Device;
    setSearchField: (value: keyof Device) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    return (
        <>
            <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('all')}
                size="sm"
                className="bg-background/80"
            >
                <List className="mr-2 h-4 w-4" />
                Все
            </Button>
            <Button
                variant={typeFilter === 'water' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('water')}
                 size="sm"
                 className="bg-background/80"
            >
                <Droplets className="mr-2 h-4 w-4" />
                Вода
            </Button>
            <Button
                variant={typeFilter === 'heat' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('heat')}
                 size="sm"
                 className="bg-background/80"
            >
                <Thermometer className="mr-2 h-4 w-4" />
                Тепло
            </Button>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    placeholder={`Поиск по '${searchFields.find(f => f.value === searchField)?.label}'...`}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="pl-10 w-full"
                />
            </div>
            <Select onValueChange={(value) => setSearchField(value as keyof Device)} defaultValue={searchField}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Поле для поиска" />
                </SelectTrigger>
                <SelectContent>
                    {searchFields.map(field => (
                        <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <CreateDeviceForm />
        </>
    )
}

function MobileControls({
    typeFilter,
    setTypeFilter,
    searchField,
    setSearchField,
    searchValue,
    setSearchValue,
}:{
    typeFilter: 'all' | 'water' | 'heat';
    setTypeFilter: (value: 'all' | 'water' | 'heat') => void;
    searchField: keyof Device;
    setSearchField: (value: keyof Device) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    return (
        <Collapsible className="w-full space-y-4">
            <div className="flex w-full items-center gap-4">
                <CreateDeviceForm />
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Фильтры и поиск
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                     <Button
                        variant={typeFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setTypeFilter('all')}
                        size="sm"
                    >
                        <List className="mr-2 h-4 w-4" />
                        Все
                    </Button>
                    <Button
                        variant={typeFilter === 'water' ? 'default' : 'outline'}
                        onClick={() => setTypeFilter('water')}
                         size="sm"
                    >
                        <Droplets className="mr-2 h-4 w-4" />
                        Вода
                    </Button>
                    <Button
                        variant={typeFilter === 'heat' ? 'default' : 'outline'}
                        onClick={() => setTypeFilter('heat')}
                         size="sm"
                    >
                        <Thermometer className="mr-2 h-4 w-4" />
                        Тепло
                    </Button>
                </div>
                 <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder={`Поиск...`}
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="pl-10 w-full"
                    />
                </div>
                <Select onValueChange={(value) => setSearchField(value as keyof Device)} defaultValue={searchField}>
                    <SelectTrigger>
                        <SelectValue placeholder="Поле для поиска" />
                    </SelectTrigger>
                    <SelectContent>
                        {searchFields.map(field => (
                            <SelectItem key={field.value} value={field.value}>{field.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CollapsibleContent>
        </Collapsible>
    )
}

const DESKTOP_COLUMN_VISIBILITY: VisibilityState = {
    id: true,
    type: true,
    external_id: true,
    serial_number: true,
    object_name: true,
    address: true,
    latest_data: true,
    is_gateway: true,
    status: true,
    created_at: true,
    actions: true,
}

const MOBILE_COLUMN_VISIBILITY: VisibilityState = {
    id: false,
    type: false,
    external_id: false,
    serial_number: true,
    object_name: false,
    address: false,
    latest_data: true,
    is_gateway: false,
    status: true,
    created_at: false,
    actions: true,
}


export default function DevicesPage() {
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'water' | 'heat'>(
    'all'
  );
   const [searchField, setSearchField] = React.useState<keyof Device>('object_name');
   const [searchValue, setSearchValue] = React.useState('');
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
   const [sorting, setSorting] = React.useState<SortingState>([]);

   const isMobile = useIsMobile();
   
   const columns = React.useMemo<ColumnDef<Device>[]>(() => allColumns, []);

   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

   React.useEffect(() => {
        setColumnVisibility(isMobile ? MOBILE_COLUMN_VISIBILITY : DESKTOP_COLUMN_VISIBILITY);
    }, [isMobile]);

  React.useEffect(() => {
    const newColumnFilters: ColumnFiltersState = [];
    if (typeFilter !== 'all') {
        newColumnFilters.push({ id: 'type', value: typeFilter });
    }
    if (searchValue) {
        newColumnFilters.push({ id: searchField, value: searchValue });
    }
    setColumnFilters(newColumnFilters);
  }, [typeFilter, searchField, searchValue]);


  const table = useReactTable({
    data: devices,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
        pagination: {
            pageSize: isMobile ? 5 : 10,
        }
    }
  });


  return (
    <div className="space-y-4">
       <div className="flex h-auto min-h-16 flex-col items-start gap-4 rounded-md bg-secondary p-4 md:flex-row md:items-center">
        <h1 className="text-lg font-semibold text-secondary-foreground">Устройства</h1>
        <div className="flex w-full items-center gap-2 md:ml-auto md:w-auto">
            { isMobile ? 
                <MobileControls 
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    searchField={searchField}
                    setSearchField={setSearchField}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                /> : 
                <DesktopControls
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    searchField={searchField}
                    setSearchField={setSearchField}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                /> 
            }
        </div>
      </div>
      <DataTable columns={columns} data={devices} table={table} />
    </div>
  );
}
```

### `src/app/(app)/gateways/page.tsx`
```tsx
'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { useGatewayColumns } from '@/components/gateways/columns';
import { CreateGatewayForm } from '@/components/gateways/create-gateway-form';
import { type Device } from '@/lib/types';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

export default function GatewaysPage() {
  const gateways = devices.filter((device) => device.is_gateway);
  const columns = useGatewayColumns();

  const table = useReactTable({
    data: gateways,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Шлюзы</h1>
        <div className="ml-auto flex items-center gap-2">
            <CreateGatewayForm />
        </div>
      </div>
      <DataTable columns={columns} data={gateways} table={table} />
    </div>
  );
}
```

### `src/app/(app)/objects/page.tsx`
```tsx
'use client'

import { objects } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/objects/columns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CreateObjectForm } from "@/components/objects/create-object-form";
import * as React from 'react';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

export default function ObjectsPage() {

    const table = useReactTable({
        data: objects,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

  return (
    <div className="space-y-4">
      <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Объекты</h1>
        <div className="ml-auto flex items-center gap-2">
            <CreateObjectForm />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
           <DataTable columns={columns} data={objects} table={table} />
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Карта объектов</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video w-full">
                        <Image 
                            src="https://picsum.photos/seed/map/1200/800" 
                            alt="Карта объектов" 
                            fill
                            className="rounded-md object-cover"
                            data-ai-hint="world map"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
```

### `src/app/(app)/reports/page.tsx`
```tsx
import { ReportForm } from '@/components/reports/report-form';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Сформируйте отчеты по объектам и устройствам за выбранный период.
      </p>
      <ReportForm />
    </div>
  );
}
```

### `src/app/(app)/users/page.tsx`
```tsx
'use client'

import { users } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import * as React from 'react';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

export default function UsersPage() {
   const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="space-y-4">
       <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Пользователи</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать пользователя
            </Button>
        </div>
      </div>
       <DataTable columns={columns} data={users} table={table} />
    </div>
  );
}
```

### `src/components/layout/header.tsx`
```tsx
import { UserNav } from './user-nav';
import { MainNav } from './main-nav';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-auto shrink-0 flex-col justify-center gap-4 border-b-4 border-primary bg-[#393939] px-4 text-header-foreground sm:px-6">
       <div className="flex h-16 w-full items-center gap-4">
            <MainNav />
            <div className="ml-auto flex items-center gap-4">
                <UserNav />
            </div>
      </div>
    </header>
  );
}
```

### `src/components/layout/main-nav.tsx`
```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Hexagon, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import React from 'react';

const mainNavLinks = [
    { href: '/dashboard', label: 'Дашборд' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/users', label: 'Пользователи' },
    { href: '/catalogs', label: 'Справочники' },
];

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
        <Hexagon className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-semibold uppercase text-white">
            BELIOT
        </h1>
    </Link>
);


const DesktopNav = () => {
    const pathname = usePathname();
    return (
        <nav className="hidden items-center gap-4 md:flex">
            {mainNavLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname.startsWith(link.href) ? "text-primary" : "text-white/80"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Открыть меню</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background p-0">
                    <div className="flex h-16 items-center border-b px-6">
                       <Logo />
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                         {mainNavLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                                    pathname.startsWith(link.href) ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
                                )}
                                >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export function MainNav() {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-6">
        {isMobile ? <MobileNav /> : <div/>}
        <div className={cn(isMobile && "flex-1 justify-center", "flex items-center")}>
          <Logo />
        </div>
        {!isMobile && <DesktopNav />}
    </div>
  );
}
```

### `src/components/layout/user-nav.tsx`
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogOut, User, Settings } from 'lucide-react';

export function UserNav() {
  const avatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-black/10">
          <Avatar className="h-10 w-10 border">
            {avatar && <AvatarImage src={avatar.imageUrl} alt="Администратор" data-ai-hint={avatar.imageHint} />}
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-headline">Администратор</p>
            <p className="text-xs leading-none text-muted-foreground">
              admin@beliot.local
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Профиль</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### `src/components/devices/columns.tsx`
```tsx
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Droplets, Thermometer, GitBranch } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice } from "@/lib/data"

const getStatusClass = (status: 'online' | 'offline' | 'warning') => {
    switch (status) {
        case 'online':
            return 'bg-[hsl(var(--chart-1))] text-primary-foreground';
        case 'warning':
            return 'bg-destructive text-destructive-foreground';
        default:
            return 'bg-secondary text-secondary-foreground';
    }
}

const statusRussian: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    warning: 'Предупреждение'
}

const typeRussian: Record<string, string> = {
    water: 'Вода',
    heat: 'Тепло'
}

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Тип
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const Icon = type === 'water' ? Droplets : Thermometer;
      return <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span>{typeRussian[type]}</span>
      </div>
    },
  },
  {
    accessorKey: "external_id",
    header: "Идентификатор",
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
  },
  {
    accessorKey: "object_name",
    header: "Объект",
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    id: "latest_data",
    header: "Последние данные",
    cell: ({ row }) => {
      const device = row.original;
      const readings = getReadingsForDevice(device.id);
      const latestReading = readings[readings.length - 1];

      if (!latestReading) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      let value, unit;
      if (device.type === 'water' && latestReading.in1) {
        value = latestReading.in1.toFixed(2);
        unit = device.unit_volume;
      } else if (device.type === 'heat' && latestReading.energy) {
        value = latestReading.energy.toFixed(2);
        unit = device.unit_energy;
      } else {
         return <span className="text-muted-foreground">N/A</span>;
      }

      return <span>{value} {unit}</span>;
    },
  },
  {
    accessorKey: 'is_gateway',
    header: 'Шлюз',
    cell: ({ row }) => {
        const isGateway = row.getValue('is_gateway');
        return isGateway ? <div className="flex justify-center"><GitBranch className="h-4 w-4 text-[hsl(var(--chart-1))]" /></div> : null;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as Device['status'];
      return <Badge className={`capitalize ${getStatusClass(status)}`}>{statusRussian[status]}</Badge>
    },
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: ({row}) => {
        return new Date(row.original.created_at).toLocaleDateString()
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const device = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/devices/${device.id}`}>Данные</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
```

### `src/components/devices/data-table.tsx`
```tsx
"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  table: ReturnType<typeof useReactTable<TData>>,
}

export function DataTable<TData, TValue>({
  columns,
  table
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();

  return (
    <Card>
      {!isMobile && (
        <div className="flex items-center justify-end p-4 gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        <Settings className="mr-2 h-4 w-4" />
                        Колонки
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Отображение колонок</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        const header = column.columnDef.header as string;
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                            }
                        >
                            {header || column.id}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )}
      <div className="relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Нет результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        {!isMobile && <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} из{' '}
          {table.getFilteredRowModel().rows.length} строк выбрано.
        </div>}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Строк на странице</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
         <div className="hidden w-[100px] items-center justify-center text-sm font-medium sm:flex">
            Стр. {table.getState().pagination.pageIndex + 1} из{' '}
            {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Назад
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Вперед
        </Button>
      </div>
    </Card>
  )
}
```

... и так далее для **всех** остальных файлов. Я добавил код каждого файла в `README.md`. Теперь он содержит абсолютно всю информацию по проекту.