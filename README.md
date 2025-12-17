# Полная кодовая база проекта Beliot (Frontend)

Этот документ содержит полный исходный код всех файлов frontend-приложения Beliot. Он предназначен для использования в качестве исчерпывающего контекста для AI-ассистента при разработке соответствующего backend.

**Ключевая задача для AI:** На основе представленной кодовой базы (структуры данных, вызовы API, компоненты) разработать backend-сервис. Особое внимание следует уделить файлам `src/lib/types.ts` (контракт данных) и `src/lib/data.ts` (точки интеграции API).

---

## Содержание

Ниже представлен код каждого файла проекта, сгруппированный по его пути.

---

### `apphosting.yaml`

```yaml
# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1

```

---

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

---

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
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

```

---

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

---

### `src/ai/dev.ts`

```ts
// Flows will be imported for their side effects in this file.

```

---

### `src/ai/genkit.ts`

```ts
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
```

---

### `src/app/(app)/catalogs/page.tsx`

```tsx
import { CatalogCard } from '@/components/catalogs/catalog-card';
import { deviceModels, channelTypes, gatewayModels, objectTypes } from '@/lib/catalogs';

export default function CatalogsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Здесь вы сможете управлять списками моделей, типов каналов и другими параметрами системы.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <CatalogCard
          title="Модели устройств"
          description="Управление списком доступных моделей приборов учета."
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
        <CatalogCard
          title="Типы объектов"
          description="Управление типами объектов (жилой дом, склад и т.д.)."
          items={objectTypes}
          itemName="тип объекта"
          dialogTitle="Добавить новый тип объекта"
          dialogDescription="Введите название нового типа объекта."
          dialogInputPlaceholder="например, Промышленное здание"
        />
      </div>
    </div>
  );
}
```

---

### `src/app/(app)/companies/page.tsx`

```tsx
'use client'

import { getCompaniesTree } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as companyColumns } from "@/components/companies/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import * as React from 'react';
import { type Company } from "@/lib/types";
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CompaniesPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function CompaniesPageContent({ companies }: { companies: Company[] }) {
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    const columns = React.useMemo(() => companyColumns, []);

    const table = useReactTable({
        data: companies,
        columns,
        state: {
          expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.children,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });

  return (
    <div className="space-y-4">
      <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Компании</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button disabled variant="outline-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать компанию
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={companies} table={table} />
    </div>
  );
}


async function CompaniesPageContainer() {
    const tree = await getCompaniesTree();
    return <CompaniesPageContent companies={tree} />
}

export default function CompaniesPage() {
    return (
        <Suspense fallback={<CompaniesPageSkeleton />}>
            <CompaniesPageContainer />
        </Suspense>
    )
}
```

---

### `src/app/(app)/dashboard/page.tsx`

```tsx
'use client';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DeviceStatusChart } from '@/components/dashboard/device-status-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { getDevices } from '@/lib/data';
import { type Device } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <Skeleton className="h-[400px]" />
                </div>
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px]" />
                </div>
            </div>
        </div>
    )
}

function DashboardPageContent({ devices }: { devices: Device[] }) {
  return (
    <div className="space-y-6">
      <SummaryCards devices={devices} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DeviceStatusChart devices={devices} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity devices={devices} />
        </div>
      </div>
    </div>
  );
}

// This is the parent component that remains a client component to use `useSearchParams`
function DashboardPageContainer() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
    setLoading(true);
    getDevices(companyIdNum).then(fetchedDevices => {
      setDevices(fetchedDevices);
      setLoading(false);
    });
  }, [companyId]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return <DashboardPageContent devices={devices} />;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContainer />
    </Suspense>
  )
}
```

---

### `src/app/(app)/devices/[id]/logs/page.tsx`

```tsx
'use client';

import * as React from 'react';
import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { type Device, type Reading } from '@/lib/types';

const LOGS_PER_PAGE = 10;
const MAX_LOGS = 100;

export default function DeviceLogsPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const [device, setDevice] = React.useState<Device | null | undefined>(null);
  const [allReadings, setAllReadings] = React.useState<Reading[]>([]);

  React.useEffect(() => {
    async function fetchData() {
        const dev = await getDeviceById(deviceId);
        if (!dev) {
          setDevice(undefined);
          return;
        }
        setDevice(dev);
        const readings = await getReadingsForDevice(deviceId);
        setAllReadings(readings.reverse().slice(0, MAX_LOGS));
    }
    fetchData();
  }, [deviceId])


  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (device === null) {
    return <div>Загрузка...</div>;
  }
  
  if (device === undefined) {
      notFound();
  }

  const filteredReadings = React.useMemo(() => {
    if (!searchQuery) {
      return allReadings;
    }
    return allReadings.filter(reading => 
      JSON.stringify(reading).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allReadings, searchQuery]);

  const totalPages = Math.ceil(filteredReadings.length / LOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
  const endIndex = startIndex + LOGS_PER_PAGE;
  const currentLogs = filteredReadings.slice(startIndex, endIndex);

  const getSummary = (reading: any) => {
    const time = format(new Date(reading.time), 'dd.MM.yyyy HH:mm:ss', { locale: ru });
    let value = '';
    if (device?.type === 'water' && reading.in1 !== undefined) {
      value = `Объем: ${reading.in1.toFixed(3)} ${device.unit_volume}`;
    } else if (device?.type === 'heat' && reading.energy !== undefined) {
      value = `Энергия: ${reading.energy.toFixed(3)} ${device.unit_energy}`;
    }
    return `${time} - ${value}`;
  }
  
  // Reset page to 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Логи устройства</CardTitle>
          <CardDescription>
            Отображены последние {Math.min(MAX_LOGS, allReadings.length)} записей для устройства <strong>{device.serial_number}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по логам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <ScrollArea className="h-[55svh] w-full">
             <Accordion type="multiple" className="pr-4">
                {currentLogs.map((reading, index) => (
                    <AccordionItem value={`item-${startIndex + index}`} key={startIndex + index}>
                        <AccordionTrigger className="text-sm font-mono hover:no-underline">
                           {getSummary(reading)}
                        </AccordionTrigger>
                        <AccordionContent>
                             <pre className="text-xs bg-muted/50 p-4 rounded-md overflow-x-auto">
                                {JSON.stringify(reading, null, 2)}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
             {filteredReadings.length === 0 && (
                <div className="flex h-48 items-center justify-center">
                    <p className="text-sm text-muted-foreground">Нет данных для отображения.</p>
                </div>
              )}
          </ScrollArea>
        </CardContent>
        {totalPages > 1 && (
            <CardFooter className="flex items-center justify-end space-x-2 pt-4">
                 <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Стр. {currentPage} из {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
```

---

### `src/app/(app)/devices/[id]/page.tsx`

```tsx
import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DeviceReadings } from '@/components/device-detail/device-readings';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


function DeviceDetailSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-[350px]" />
                    <Skeleton className="h-[180px]" />
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-[300px]" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                    <Skeleton className="h-[550px]" />
                </div>
            </div>
             <Skeleton className="h-[400px]" />
        </div>
    )
}

async function DeviceDetailContent({ deviceId }: { deviceId: number }) {
  const device = await getDeviceById(deviceId);
  
  if (!device) {
    notFound();
  }
  
  const readings = await getReadingsForDevice(deviceId);

  return <DeviceReadings device={device} readings={readings} />;
}


export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);

  return (
    <Suspense fallback={<DeviceDetailSkeleton />}>
        <DeviceDetailContent deviceId={deviceId} />
    </Suspense>
  );
}
```

---

### `src/app/(app)/devices/page.tsx`

```tsx
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { getDevices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { columns as allColumns } from '@/components/devices/columns';
import { CreateDeviceForm } from '@/components/devices/create-device-form';
import { Button } from '@/components/ui/button';
import { type Device } from '@/lib/types';
import { List, Droplets, Thermometer, SlidersHorizontal, CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
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
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const searchFields: { value: keyof Device; label: string }[] = [
    { value: 'object_name', label: 'Объект' },
    { value: 'address', label: 'Адрес' },
    { value: 'serial_number', label: 'Серийный номер' },
    { value: 'id', label: 'ID' },
    { value: 'external_id', label: 'Идентификатор' },
]

type StatusFilter = 'all' | 'online' | 'offline' | 'warning';

function DesktopControls({
    typeFilter,
    setTypeFilter,
    searchField,
    setSearchField,
    searchValue,
    setSearchValue,
    statusFilter,
    setStatusFilter
}:{
    typeFilter: 'all' | 'water' | 'heat';
    setTypeFilter: (value: 'all' | 'water' | 'heat') => void;
    searchField: keyof Device;
    setSearchField: (value: keyof Device) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    statusFilter: StatusFilter;
    setStatusFilter: (value: StatusFilter) => void;
}) {
    return (
        <>
            <div className='flex gap-2 border-r pr-4'>
                <Button variant={typeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTypeFilter('all')} size="sm" >
                    <List className="mr-2 h-4 w-4" /> Все типы
                </Button>
                <Button variant={typeFilter === 'water' ? 'default' : 'outline'} onClick={() => setTypeFilter('water')} size="sm" >
                    <Droplets className="mr-2 h-4 w-4" /> Вода
                </Button>
                <Button variant={typeFilter === 'heat' ? 'default' : 'outline'} onClick={() => setTypeFilter('heat')} size="sm" >
                    <Thermometer className="mr-2 h-4 w-4" /> Тепло
                </Button>
            </div>
             <div className='flex gap-2 border-r pr-4'>
                <Button variant={statusFilter === 'all' ? 'default' : 'outline'} onClick={() => setStatusFilter('all')} size="sm" >
                    <List className="mr-2 h-4 w-4" /> Все статусы
                </Button>
                <Button variant={statusFilter === 'online' ? 'default' : 'outline'} onClick={() => setStatusFilter('online')} size="sm" >
                    <CheckCircle className="mr-2 h-4 w-4" /> Онлайн
                </Button>
                <Button variant={statusFilter === 'offline' ? 'default' : 'outline'} onClick={() => setStatusFilter('offline')} size="sm" >
                    <XCircle className="mr-2 h-4 w-4" /> Офлайн
                </Button>
                 <Button variant={statusFilter === 'warning' ? 'default' : 'outline'} onClick={() => setStatusFilter('warning')} size="sm" >
                    <AlertTriangle className="mr-2 h-4 w-4" /> Предупреждения
                </Button>
            </div>
            <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    placeholder={`Поиск по '${searchFields.find(f => f.value === searchField)?.label}'...`}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    className="pl-10 pr-10 w-full"
                />
                {searchValue && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setSearchValue('')}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
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
    statusFilter,
    setStatusFilter
}:{
    typeFilter: 'all' | 'water' | 'heat';
    setTypeFilter: (value: 'all' | 'water' | 'heat') => void;
    searchField: keyof Device;
    setSearchField: (value: keyof Device) => void;
    searchValue: string;
    setSearchValue: (value: string) => void;
    statusFilter: StatusFilter;
    setStatusFilter: (value: StatusFilter) => void;
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
                <p className="font-semibold text-sm">Тип</p>
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
                 <p className="font-semibold text-sm">Статус</p>
                 <div className="grid grid-cols-2 gap-2">
                     <Button
                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('all')}
                        size="sm"
                    >
                        <List className="mr-2 h-4 w-4" />
                        Все
                    </Button>
                    <Button
                        variant={statusFilter === 'online' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('online')}
                         size="sm"
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Онлайн
                    </Button>
                    <Button
                        variant={statusFilter === 'offline' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('offline')}
                         size="sm"
                    >
                        <XCircle className="mr-2 h-4 w-4" />
                        Офлайн
                    </Button>
                     <Button
                        variant={statusFilter === 'warning' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('warning')}
                         size="sm"
                    >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Предупр.
                    </Button>
                </div>
                 <p className="font-semibold text-sm">Поиск</p>
                 <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder={`Поиск...`}
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        className="pl-10 pr-10 w-full"
                    />
                    {searchValue && (
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setSearchValue('')}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
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
    gateway: true,
    status: true,
    last_activity: true,
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
    gateway: false,
    status: true,
    last_activity: false,
    actions: true,
}

function DevicesPageContent({ initialDevices }: { initialDevices: Device[] }) {
  const searchParams = useSearchParams();
  const objectNameFromUrl = searchParams.get('object_name');
  const statusFromUrl = searchParams.get('status') as StatusFilter | null;
  
  const [currentDevices, setCurrentDevices] = React.useState<Device[]>(initialDevices);
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'water' | 'heat'>('all');
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>(statusFromUrl || 'all');
  const [searchField, setSearchField] = React.useState<keyof Device>('object_name');
  const [searchValue, setSearchValue] = React.useState(objectNameFromUrl || '');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const isMobile = useIsMobile();
   
  const columns = React.useMemo<ColumnDef<Device>[]>(() => allColumns, []);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  React.useEffect(() => {
    setCurrentDevices(initialDevices);
  }, [initialDevices]);

  React.useEffect(() => {
    setColumnVisibility(isMobile ? MOBILE_COLUMN_VISIBILITY : DESKTOP_COLUMN_VISIBILITY);
  }, [isMobile]);

  React.useEffect(() => {
    const newColumnFilters: ColumnFiltersState = [];
    if (typeFilter !== 'all') {
        newColumnFilters.push({ id: 'type', value: typeFilter });
    }
    if (statusFilter !== 'all') {
        newColumnFilters.push({ id: 'status', value: statusFilter });
    }
    
    if (searchValue) {
        newColumnFilters.push({ id: searchField, value: searchValue });
    }

    setColumnFilters(newColumnFilters);
  }, [typeFilter, statusFilter, searchField, searchValue]);

  React.useEffect(() => {
    if (objectNameFromUrl) {
      setSearchField('object_name');
      setSearchValue(objectNameFromUrl);
    }
  }, [objectNameFromUrl]);
  
  React.useEffect(() => {
    if (statusFromUrl) {
      setStatusFilter(statusFromUrl);
    }
  }, [statusFromUrl]);


  const table = useReactTable({
    data: currentDevices,
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
        <div className="flex w-full flex-wrap items-center gap-2 md:ml-auto md:w-auto">
            { isMobile ? 
                <MobileControls 
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    searchField={searchField}
                    setSearchField={setSearchField}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                /> : 
                <DesktopControls
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    searchField={searchField}
                    setSearchField={setSearchField}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                /> 
            }
        </div>
      </div>
      <DataTable columns={columns} data={currentDevices} table={table} />
    </div>
  );
}

function DevicesPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function DevicesPageContainer() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const [devices, setDevices] = React.useState<Device[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
        setLoading(true);
        getDevices(companyIdNum).then(fetchedDevices => {
            setDevices(fetchedDevices);
            setLoading(false);
        });
    }, [companyId]);

    if (loading) {
        return <DevicesPageSkeleton />;
    }

    return <DevicesPageContent initialDevices={devices} />;
}

export default function DevicesPage() {
    return (
        <Suspense fallback={<DevicesPageSkeleton />}>
            <DevicesPageContainer />
        </Suspense>
    )
}
```

---

### `src/app/(app)/gateways/page.tsx`

```tsx
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { getDevices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { useGatewayColumns } from '@/components/gateways/columns';
import { CreateGatewayForm } from '@/components/gateways/create-gateway-form';
import { type Device } from '@/lib/types';
import { 
    type ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function GatewaysPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function GatewaysPageContent({ gateways: initialGateways }: { gateways: Device[]}) {
    const searchParams = useSearchParams();
    const searchFieldFromUrl = searchParams.get('search_field') as keyof Device | null;
    const searchValueFromUrl = searchParams.get('search_value');

    const [gateways, setGateways] = React.useState<Device[]>(initialGateways);
    const columns = useGatewayColumns();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    React.useEffect(() => {
        setGateways(initialGateways);
    }, [initialGateways]);

    React.useEffect(() => {
        if (searchFieldFromUrl && searchValueFromUrl) {
            setColumnFilters([{ id: searchFieldFromUrl, value: searchValueFromUrl }]);
        } else {
            setColumnFilters([]);
        }
    }, [searchFieldFromUrl, searchValueFromUrl]);

    const table = useReactTable({
        data: gateways,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 10,
            }
        }
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

async function GatewaysPageContainer() {
    const allDevices = await getDevices();
    const gateways = allDevices.filter(d => d.is_gateway);
    return <GatewaysPageContent gateways={gateways} />;
}

export default function GatewaysPage() {
  return (
    <Suspense fallback={<GatewaysPageSkeleton />}>
      <GatewaysPageContainer />
    </Suspense>
  )
}
```

---

### `src/app/(app)/layout.tsx`

```tsx
import { AppHeader } from '@/components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex min-h-svh w-full flex-col bg-background/80">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
  );
}
```

---

### `src/app/(app)/objects/page.tsx`

```tsx
'use client'

import { getObjectsTree, getAllObjects, getDevices } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as objectColumns } from "@/components/objects/columns";
import { CreateObjectForm } from "@/components/objects/create-object-form";
import * as React from 'react';
import { type BeliotObject, type Device } from "@/lib/types";
import { 
    type Row,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';
import { ObjectDeviceList } from "@/components/objects/object-device-list";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ObjectsPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    )
}

function ObjectsPageContent({ 
    initialTree, 
    initialAllObjects, 
    initialAllDevices 
}: { 
    initialTree: BeliotObject[], 
    initialAllObjects: BeliotObject[],
    initialAllDevices: Device[]
}) {
    const searchParams = useSearchParams();
    const selectedObjectIdFromUrl = searchParams.get('selected_object_id');

    const [data, setData] = React.useState<BeliotObject[]>(initialTree);
    const [allObjects, setAllObjects] = React.useState<BeliotObject[]>(initialAllObjects);
    const [allDevices, setAllDevices] = React.useState<Device[]>(initialAllDevices);

    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [selectedObject, setSelectedObject] = React.useState<BeliotObject | null>(null);
    const [devicesInSelectedObject, setDevicesInSelectedObject] = React.useState<Device[]>([]);

    
    // Helper function to recursively get all devices from an object and its children
    const getAllDevicesForObject = React.useCallback((object: BeliotObject, allDevs: Device[]): Device[] => {
        let objectDevices = allDevs.filter(d => d.objectId === object.id);
        if (object.children && object.children.length > 0) {
            objectDevices = objectDevices.concat(object.children.flatMap(child => getAllDevicesForObject(child, allDevs)));
        }
        return objectDevices;
    }, []);

    // Helper to find an object and its path in a tree
    const findObjectInTree = (nodes: BeliotObject[], id: number): BeliotObject | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findObjectInTree(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    // Helper to get all parent IDs of a given object
    const getParentIds = (allObjs: BeliotObject[], objectId: number): number[] => {
        const ids: number[] = [];
        let current = allObjs.find(o => o.id === objectId);
        while (current && current.parentId) {
            ids.push(current.parentId);
            current = allObjs.find(o => o.id === current.parentId);
        }
        return ids;
    };
    
    React.useEffect(() => {
        setData(initialTree);
        setAllObjects(initialAllObjects);
        setAllDevices(initialAllDevices);
    }, [initialTree, initialAllObjects, initialAllDevices]);
    
     React.useEffect(() => {
        if (selectedObjectIdFromUrl && data.length > 0 && allObjects.length > 0) {
            const objectId = parseInt(selectedObjectIdFromUrl, 10);
            const foundObject = findObjectInTree(data, objectId);
            if (foundObject) {
                setSelectedObject(foundObject);
                // Expand all parents of the selected object to make it visible
                const parentIds = getParentIds(allObjects, objectId);
                const newExpanded: ExpandedState = {};
                parentIds.forEach(id => {
                    newExpanded[String(id)] = true;
                });
                setExpanded(newExpanded);
            }
        } else {
            setSelectedObject(null);
            setExpanded({});
        }
    }, [selectedObjectIdFromUrl, data, allObjects]);


    React.useEffect(() => {
        if (selectedObject) {
            const devicesToShow = getAllDevicesForObject(selectedObject, allDevices);
            setDevicesInSelectedObject(devicesToShow);
        } else {
            setDevicesInSelectedObject([]);
        }
    }, [selectedObject, allDevices, getAllDevicesForObject]);


    const handleRowClick = (row: Row<BeliotObject>) => {
        setSelectedObject(row.original);
    };

    const columns = React.useMemo(() => objectColumns, []);

    const table = useReactTable({
        data,
        columns,
        state: {
          expanded,
        },
        getRowId: (row) => String(row.id),
        onExpandedChange: setExpanded,
        getSubRows: row => row.children,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        meta: {
            onRowClick: handleRowClick,
        }
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
           <DataTable columns={columns} data={data} table={table} />
        </div>
        <div>
            <ObjectDeviceList 
                selectedObject={selectedObject} 
                devices={devicesInSelectedObject} 
            />
        </div>
      </div>
    </div>
  );
}

function ObjectsPageContainer() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const [loading, setLoading] = React.useState(true);
    const [tree, setTree] = React.useState<BeliotObject[]>([]);
    const [allObjects, setAllObjects] = React.useState<BeliotObject[]>([]);
    const [allDevices, setAllDevices] = React.useState<Device[]>([]);

    React.useEffect(() => {
        const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
        setLoading(true);
        Promise.all([
            getObjectsTree(companyIdNum),
            getAllObjects(companyIdNum),
            getDevices(companyIdNum),
        ]).then(([fetchedTree, fetchedObjects, fetchedDevices]) => {
            setTree(fetchedTree);
            setAllObjects(fetchedObjects);
            setAllDevices(fetchedDevices);
            setLoading(false);
        });
    }, [companyId]);

    if (loading) {
        return <ObjectsPageSkeleton />;
    }

    return <ObjectsPageContent 
        initialTree={tree}
        initialAllObjects={allObjects}
        initialAllDevices={allDevices}
    />;
}


export default function ObjectsPage() {
    return (
        <Suspense fallback={<ObjectsPageSkeleton />}>
            <ObjectsPageContainer />
        </Suspense>
    )
}
```

---

### `src/app/(app)/reports/page.tsx`

```tsx
import { ReportForm } from '@/components/reports/report-form';
import { getAllObjects } from '@/lib/data';
import { Suspense } from 'react';

async function ReportsPageContent() {
  const objects = await getAllObjects();
  return <ReportForm objects={objects} />;
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Сформируйте отчеты по объектам и устройствам за выбранный период.
      </p>
      <Suspense fallback={<div>Загрузка формы...</div>}>
        <ReportsPageContent />
      </Suspense>
    </div>
  );
}
```

---

### `src/app/(app)/users/page.tsx`

```tsx
'use client'

import { getUsers } from "@/lib/data";
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
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { type User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";


function UsersPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function UsersPageContent({ users }: { users: User[] }) {
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


function UsersPageContainer() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
        setLoading(true);
        getUsers(companyIdNum).then(fetchedUsers => {
            setUsers(fetchedUsers);
            setLoading(false);
        });
    }, [companyId]);

    if (loading) {
        return <UsersPageSkeleton />;
    }

    return <UsersPageContent users={users} />;
}

export default function UsersPage() {
    return (
        <Suspense fallback={<UsersPageSkeleton />}>
            <UsersPageContainer />
        </Suspense>
    )
}
```

---

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

---

### `src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Beliot Dashboard',
  description: 'IoT-платформа для мониторинга устройств',
};

const backgroundImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; // This is a placeholder, the actual image is complex

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 z-[-1] opacity-5">
            <Image
                src="https://storage.googleapis.com/stedi-assets/belit-bg-tech.png"
                alt="Tech background"
                fill
                className="object-cover"
                quality={100}
                priority
            />
        </div>
        <Suspense>
          <div className="relative z-0">{children}</div>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
```

---

### `src/app/page.tsx`

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
}
```

---

### `src/components/catalogs/catalog-card.tsx`

```tsx
"use client";

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';
import { type CatalogItem } from '@/lib/catalogs';

interface CatalogCardProps {
  title: string;
  description: string;
  items: CatalogItem[];
  itemName: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogInputPlaceholder: string;
}

export function CatalogCard({
  title,
  description,
  items: initialItems,
  itemName,
  dialogTitle,
  dialogDescription,
  dialogInputPlaceholder,
}: CatalogCardProps) {
  const [items, setItems] = React.useState(initialItems);
  const [open, setOpen] = React.useState(false);
  const [newItemLabel, setNewItemLabel] = React.useState('');
  const { toast } = useToast();

  const handleAddItem = () => {
    if (newItemLabel.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Название не может быть пустым.',
      });
      return;
    }
    // In a real app, you'd call an API here.
    // For now, we simulate adding a new item.
    const newItem: CatalogItem = {
      id: newItemLabel.toLowerCase().replace(/\s+/g, '-'),
      value: newItemLabel,
      label: newItemLabel,
    }
    setItems([...items, newItem]);
    toast({
      title: `Новый элемент '${itemName}' добавлен`,
      description: `"${newItem.label}" был добавлен в справочник.`,
    });
    setNewItemLabel('');
    setOpen(false);
  };
  
  const handleDeleteItem = (itemToDelete: CatalogItem) => {
    // In a real app, you'd call an API here.
    setItems(items.filter(item => item.id !== itemToDelete.id));
    toast({
      title: `'${itemName}' удален`,
      description: `"${itemToDelete.label}" был удален из справочника.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-4">
            <div className="space-y-2">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Редактировать</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDeleteItem(item)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Удалить</span>
                        </Button>
                    </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline-primary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  placeholder={dialogInputPlaceholder}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit" onClick={handleAddItem}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
```

---

### `src/components/companies/columns.tsx`

```tsx
"use client"

import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { useRouter, usePathname } from "next/navigation";
import { type Company } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronsRight, LogIn } from "lucide-react"

const ActionsCell = ({ row }: { row: Row<Company> }) => {
    const company = row.original;
    const router = useRouter();
    const pathname = usePathname();

    const handleLogin = () => {
        const params = new URLSearchParams(); // Start with fresh params
        params.set("companyId", String(company.id));
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-end gap-2">
             <Button variant="outline" size="sm" onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                Войти
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem disabled>
                        Редактировать
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Название компании",
    cell: ({ row, getValue }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();
        return (
            <div 
                style={{ paddingLeft: `${row.depth * 1.5}rem` }} 
                className="flex items-center gap-1"
            >
                {canExpand && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            row.toggleExpanded();
                        }}
                        className="h-6 w-6"
                    >
                        <ChevronsRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                )}
                <span className="font-medium">{getValue<string>()}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "unp",
    header: "УНП",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
]
```

---

### `src/components/companies/page.tsx`

```tsx
import { users } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-4">
       <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Пользователи</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button disabled variant="outline-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать пользователя
            </Button>
        </div>
      </div>
       <DataTable columns={columns} data={users} />
    </div>
  );
}
```

---

### `src/components/dashboard/device-status-chart.tsx`

```tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { type Device } from '@/lib/types';
import { type ChartConfig } from '@/components/ui/chart';
import React from 'react';

const chartConfig = {
  count: {
    label: 'Устройства',
  },
  online: {
    label: 'Онлайн',
    color: 'hsl(var(--chart-1))',
  },
  offline: {
    label: 'Офлайн',
    color: 'hsl(var(--muted-foreground))',
  },
  warning: {
    label: 'Предупреждения',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function DeviceStatusChart({ devices }: { devices: Device[] }) {
  const chartData = React.useMemo(() => {
    if (!devices) return [];
    const statusData = devices.reduce((acc, device) => {
      acc[device.status] = (acc[device.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusData).map(([status, count]) => ({
      status,
      count,
    }));
  }, [devices]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Состояние устройств</CardTitle>
        <CardDescription>Распределение устройств по текущему статусу</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={chartConfig[entry.status as keyof typeof chartConfig]?.color} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
```

---

### `src/components/dashboard/recent-activity.tsx`

```tsx
'use client';

import Link from 'next/link';
import { getReadingsForDevice } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Droplets, Thermometer, BatteryLow, Magnet, AlertTriangle } from 'lucide-react';
import { type Device, type Reading } from '@/lib/types';
import React from 'react';

const getStatusVariant = (status: 'online' | 'offline' | 'warning'): "default" | "destructive" | "secondary" => {
    switch (status) {
      case 'warning':
        return 'destructive';
      case 'offline':
        return 'secondary';
      default:
        return 'default';
    }
}

const ERROR_FLAGS = {
  LOW_BATTERY: 1 << 0, // 1
  TAMPERING: 1 << 1,   // 2
  LEAK: 1 << 2,        // 4
};

const getWarningDetails = (device: Device, latestReading: Reading | undefined): { text: string; icon: React.ReactNode } => {
  if (device.status === 'offline') {
    return { text: 'Офлайн', icon: null };
  }

  if (latestReading) {
    if ((latestReading.error_flags & ERROR_FLAGS.TAMPERING) !== 0) {
      return { text: 'Вмешательство (магнит)', icon: <Magnet className="mr-2 h-4 w-4" /> };
    }
    if (latestReading.battery_percent < 10 || (latestReading.error_flags & ERROR_FLAGS.LOW_BATTERY) !== 0) {
      return { text: 'Низкий заряд батареи', icon: <BatteryLow className="mr-2 h-4 w-4" /> };
    }
     if ((latestReading.error_flags & ERROR_FLAGS.LEAK) !== 0) {
      return { text: 'Утечка', icon: <Droplets className="mr-2 h-4 w-4" /> };
    }
  }

  // Fallback for generic warning
  return { text: 'Предупреждение', icon: <AlertTriangle className="mr-2 h-4 w-4" /> };
};

function ActivityItem({ device }: { device: Device }) {
    const [warningDetails, setWarningDetails] = React.useState<{ text: string; icon: React.ReactNode } | null>(null);
    const [latestReading, setLatestReading] = React.useState<Reading | undefined>(undefined);

    React.useEffect(() => {
        getReadingsForDevice(device.id).then(readings => {
            const lastReading = readings.length > 0 ? readings[readings.length - 1] : undefined;
            setLatestReading(lastReading);
        });
    }, [device.id]);

    React.useEffect(() => {
        if (device) {
            setWarningDetails(getWarningDetails(device, latestReading));
        }
    }, [device, latestReading]);


    if (!warningDetails) {
        return null; // Or a loading skeleton
    }

    return (
        <Link href={`/devices/${device.id}`} className="block rounded-lg -mx-2 px-2 py-3 transition-colors hover:bg-muted">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary">
                    {device.type === 'water' ? <Droplets className="h-5 w-5 text-secondary-foreground" /> : <Thermometer className="h-5 w-5 text-secondary-foreground" />}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium leading-none">{device.object_name}</p>
                    <p className="text-sm text-muted-foreground">{device.serial_number}</p>
                </div>
                </div>
                <Badge variant={getStatusVariant(device.status)} className="flex items-center">
                {warningDetails.icon}
                {warningDetails.text}
                </Badge>
            </div>
        </Link>
    )
}

export function RecentActivity({ devices }: { devices: Device[] }) {
  const recentAlerts = React.useMemo(() => {
    if (!devices) return [];
    return devices
      .filter((d) => d.status === 'offline' || d.status === 'warning')
      .slice(0, 5);
  }, [devices]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние оповещения</CardTitle>
        <CardDescription>Устройства, требующие внимания.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {recentAlerts.length > 0 
            ? recentAlerts.map((device) => <ActivityItem key={device.id} device={device} />) 
            : <p className="text-sm text-muted-foreground">Нет активных оповещений.</p>}
      </CardContent>
    </Card>
  );
}
```

---

### `src/components/dashboard/summary-cards.tsx`

```tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircuitBoard, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Device } from '@/lib/types';
import React from 'react';

export function SummaryCards({ devices }: { devices: Device[] }) {
  const summary = React.useMemo(() => {
      if (!devices) return { total: 0, online: 0, offline: 0, warning: 0 };
      return {
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warning: devices.filter((d) => d.status === 'warning').length,
      }
  }, [devices]);

  const summaries = [
    { title: 'Всего устройств', value: summary.total, icon: CircuitBoard, color: 'text-muted-foreground', href: '/devices' },
    { title: 'Онлайн', value: summary.online, icon: CheckCircle, color: 'text-[hsl(var(--chart-1))]', href: '/devices?status=online' },
    { title: 'Офлайн', value: summary.offline, icon: XCircle, color: 'text-muted-foreground', href: '/devices?status=offline' },
    { title: 'Предупреждения', value: summary.warning, icon: AlertTriangle, color: 'text-destructive', href: '/devices?status=warning' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaries.map((summary) => (
        <Link key={summary.title} href={summary.href}>
          <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{summary.title}</p>
                <p className="text-2xl font-bold">{summary.value}</p>
              </div>
              <summary.icon className={cn('h-10 w-10', summary.color)} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
```

---

### `src/components/device-detail/device-event-info.tsx`

```tsx
import { type Device, type Reading } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BatteryLow, Magnet, Droplets, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { getReadingsForDevice } from '@/lib/data';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

const ERROR_FLAGS = {
  LOW_BATTERY: 1 << 0, // 1
  TAMPERING: 1 << 1,   // 2
  LEAK: 1 << 2,        // 4
};

const getEventDetails = (device: Device, latestReading: Reading | undefined): { text: string; icon: React.ReactNode; time: string | null, variant: "destructive" | "secondary" } | null => {
  let eventTime = latestReading?.time || null;

  if (device.status === 'offline') {
    return { text: 'Офлайн', icon: <XCircle className="mr-2 h-4 w-4" />, time: eventTime, variant: 'secondary' };
  }

  if (device.status === 'warning' && latestReading) {
    if ((latestReading.error_flags & ERROR_FLAGS.TAMPERING) !== 0) {
      return { text: 'Вмешательство (магнит)', icon: <Magnet className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
    if (latestReading.battery_percent < 10 || (latestReading.error_flags & ERROR_FLAGS.LOW_BATTERY) !== 0) {
      return { text: 'Низкий заряд батареи', icon: <BatteryLow className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
     if ((latestReading.error_flags & ERROR_FLAGS.LEAK) !== 0) {
      return { text: 'Утечка', icon: <Droplets className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
    // Fallback for generic warning
    return { text: 'Неизвестное предупреждение', icon: <AlertTriangle className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
  }
  
  return null; // No active event
};

export function DeviceEventInfo({ device, readings }: { device: Device, readings: Reading[] }) {
    const latestReading = readings.length > 0 ? readings[readings.length - 1] : undefined;
    const eventDetails = getEventDetails(device, latestReading);

  if (!eventDetails) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последнее событие</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Событие</span>
            <Badge variant={eventDetails.variant} className="flex items-center text-xs">
                {eventDetails.icon}
                {eventDetails.text}
            </Badge>
        </div>
         {eventDetails.time && (
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Clock size={16} />Время фиксации</span>
                <span>{format(new Date(eventDetails.time), 'PPPp', { locale: ru })}</span>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---

### `src/components/device-detail/device-info.tsx`

```tsx
import { type Device, type Reading } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery, Rss, Signal, Clock, Hash, Package, GripVertical, Paperclip } from 'lucide-react';
import { Separator } from '../ui/separator';

const getStatusVariant = (status: 'online' | 'offline' | 'warning'): "default" | "destructive" | "secondary" => {
    switch (status) {
      case 'online':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'offline':
        return 'secondary';
      default:
        return 'secondary';
    }
}

const statusRussian: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    warning: 'Предупреждение'
}

export function DeviceInfo({ device, readings }: { device: Device, readings: Reading[] }) {
    const latestReading = readings[readings.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация об устройстве</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Статус</span>
            <Badge variant={getStatusVariant(device.status)}>{statusRussian[device.status]}</Badge>
        </div>
        {latestReading && (
            <>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground"><Battery size={16} />Батарея</span>
                    <span>{latestReading.battery_percent.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground"><Rss size={16} />RSSI</span>
                    <span>{latestReading.rssi} dBm</span>
                </div>
            </>
        )}
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Hash size={16} />Идентификатор (DevEUI/IMEI)</span>
            <span className="font-mono text-xs">{device.external_id}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><GripVertical size={16} />Серийный номер</span>
            <span className="font-mono text-xs">{device.serial_number}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Package size={16} />Модель</span>
            <span>{device.model}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Signal size={16} />Канал</span>
            <span className="capitalize">{device.channel_type}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Clock size={16} />Создан</span>
            <span>{new Date(device.created_at).toLocaleDateString()}</span>
        </div>

        {device.attributes && device.attributes.length > 0 && (
            <>
                <Separator />
                <div className='space-y-4'>
                    <h3 className="flex items-center gap-2 font-medium text-muted-foreground"><Paperclip size={16} />Дополнительные атрибуты</h3>
                    {device.attributes.map(attr => (
                        <div key={attr.name} className="flex items-center justify-between">
                            <span className="text-muted-foreground">{attr.name}</span>
                            <span>{attr.value}</span>
                        </div>
                    ))}
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
```

---

### `src/components/device-detail/device-readings.tsx`

```tsx
"use client";

import { type Device, type Reading } from "@/lib/types";
import { ReadingsTable } from "@/components/device-detail/readings-table";
import { readingsColumns } from "@/components/device-detail/readings-columns";
import { DeviceInfo } from "./device-info";
import { ReadingsCharts } from "./readings-charts";
import * as React from 'react';
import { DateRangePicker } from "../shared/date-range-picker";
import { type DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DeviceEventInfo } from "./device-event-info";
import { Button } from "../ui/button";

export function DeviceReadings({
  device,
  readings,
}: {
  device: Device;
  readings: Reading[];
}) {
  const initialDateRange = {
    from: subDays(new Date(), 7),
    to: new Date(),
  };

  // State for the date picker component itself
  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);
  
  // State for the applied filter, which controls the charts and table
  const [appliedDateRange, setAppliedDateRange] = React.useState<DateRange | undefined>(initialDateRange);

  const handleApplyFilter = () => {
    setAppliedDateRange(date);
  };

  const filteredReadings = React.useMemo(() => {
    if (!appliedDateRange?.from) {
        return []; // Return empty if no range is applied
    }
    // Ensure 'to' date includes the entire day
    const fromDate = appliedDateRange.from;
    const toDate = new Date(appliedDateRange.to || appliedDateRange.from);
    toDate.setHours(23, 59, 59, 999); 

    return readings.filter(reading => {
        const readingDate = new Date(reading.time);
        return readingDate >= fromDate && readingDate <= toDate;
    });
  }, [readings, appliedDateRange]);


  const columns = readingsColumns(device);
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                <DeviceInfo device={device} readings={readings} />
                <DeviceEventInfo device={device} readings={readings} />
            </div>
            <div className="lg:col-span-2 space-y-4">
                 <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <DateRangePicker 
                        dateRange={date} 
                        setDateRange={setDate} 
                        className="w-full sm:w-auto"
                    />
                    <Button onClick={handleApplyFilter}>Применить</Button>
                </div>
                <ReadingsCharts device={device} readings={filteredReadings} />
            </div>
        </div>
        <ReadingsTable 
            columns={columns} 
            data={filteredReadings} 
        />
    </div>
  );
}
```

---

### `src/components/device-detail/readings-charts.tsx`

```tsx
'use client';
import { type Device, type Reading } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const waterChartConfig = {
  in1: { label: 'Накопленный объем 1', color: 'hsl(var(--chart-1))' },
  in2: { label: 'Накопленный объем 2', color: 'hsl(var(--chart-2))' },
  fflow1: { label: 'Мгновенный расход 1', color: 'hsl(var(--chart-1))' },
  fflow2: { label: 'Мгновенный расход 2', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const heatChartConfig = {
  energy: { label: 'Энергия', color: 'hsl(var(--chart-1))' },
  mass1: { label: 'Масса', color: 'hsl(var(--chart-2))' },
  temp_supply: { label: 't° Подачи', color: 'hsl(var(--chart-4))' },
  temp_return: { label: 't° Обратки', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

const BaseChart = ({ data, dataKey, label, unit, color }: { data: any[], dataKey: string, label: string, unit: string, color: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={{}} className="h-[250px] w-full">
         <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(value) => format(new Date(value), 'MM/dd HH:mm')}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tickCount={5}
            />
          <YAxis unit={unit} axisLine={false} tickLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
        </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

const TempChart = ({ data }: { data: Reading[] }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Температура</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={heatChartConfig} className="h-[250px] w-full">
           <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={(value) => format(new Date(value), 'MM/dd HH:mm')}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <YAxis unit="°C" axisLine={false} tickLine={false} tickMargin={8}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="temp_supply"
              type="natural"
              fill={heatChartConfig.temp_supply.color}
              fillOpacity={0.4}
              stroke={heatChartConfig.temp_supply.color}
              stackId="a"
            />
            <Area
              dataKey="temp_return"
              type="natural"
              fill={heatChartConfig.temp_return.color}
              fillOpacity={0.4}
              stroke={heatChartConfig.temp_return.color}
              stackId="b"
            />
          </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );

export function ReadingsCharts({ device, readings }: { device: Device; readings: Reading[] }) {
  if (readings.length === 0) {
    return <Card><CardHeader><CardTitle>Нет данных</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Нет показаний за выбранный период.</p></CardContent></Card>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {device.type === 'water' && (
        <>
          <BaseChart data={readings} dataKey="in1" label="Накопленный объем" unit={device.unit_volume} color={waterChartConfig.in1.color} />
          <BaseChart data={readings} dataKey="fflow1" label="Мгновенный расход" unit={`${device.unit_volume}/ч`} color={waterChartConfig.fflow1.color} />
        </>
      )}
      {device.type === 'heat' && (
        <>
          <BaseChart data={readings} dataKey="energy" label="Энергия" unit={device.unit_energy} color={heatChartConfig.energy.color} />
          <TempChart data={readings} />
        </>
      )}
    </div>
  );
}
```

---

### `src/components/device-detail/readings-columns.tsx`

```tsx
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Reading, type Device } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from 'date-fns';

export const readingsColumns = (device: Device): ColumnDef<Reading>[] => {
  const columns: ColumnDef<Reading>[] = [
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Время
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const time = row.getValue("time") as string;
        return <span>{format(new Date(time), 'dd.MM.yyyy HH:mm')}</span>
      }
    },
  ];

  if (device.type === 'water') {
    columns.push(
      {
        accessorKey: "in1",
        header: `Объем (${device.unit_volume})`,
        cell: ({ row }) => row.original.in1?.toFixed(3) ?? 'N/A'
      },
      {
        accessorKey: "fflow1",
        header: `Расход (${device.unit_volume}/ч)`,
        cell: ({ row }) => row.original.fflow1?.toFixed(3) ?? 'N/A'
      }
    )
  }

  if (device.type === 'heat') {
    columns.push(
      {
        accessorKey: "energy",
        header: `Энергия (${device.unit_energy})`,
        cell: ({ row }) => row.original.energy?.toFixed(3) ?? 'N/A'
      },
      {
        accessorKey: "temp_supply",
        header: `T° подачи (${device.unit_temperature})`,
        cell: ({ row }) => row.original.temp_supply?.toFixed(2) ?? 'N/A'
      },
      {
        accessorKey: "temp_return",
        header: `T° обратки (${device.unit_temperature})`,
        cell: ({ row }) => row.original.temp_return?.toFixed(2) ?? 'N/A'
      }
    )
  }

  columns.push(
    {
      accessorKey: "battery_percent",
      header: "Батарея (%)",
      cell: ({ row }) => row.original.battery_percent?.toFixed(0) ?? 'N/A'
    },
    {
      accessorKey: "rssi",
      header: "RSSI (dBm)",
      cell: ({ row }) => row.original.rssi ?? 'N/A'
    }
  );

  return columns;
};
```

---

### `src/components/device-detail/readings-table.tsx`

```tsx
"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
}

export function ReadingsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "time", desc: true },
  ]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
    initialState: {
        pagination: {
            pageSize: 10,
        }
    }
  })

  return (
    <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                 <CardTitle>История показаний</CardTitle>
                 <CardDescription className="pt-1">Данные за выбранный период.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
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
                         <TableHead className="text-right w-[50px]">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Отображение колонок</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                    {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        const header = column.columnDef.header;
                                        const headerText = typeof header === 'string' ? header : column.id;
                                        return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                            }
                                        >
                                            {headerText}
                                        </DropdownMenuCheckboxItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableHead>
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
                        {/* Empty cell for the settings column */}
                        <TableCell />
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                        Нет результатов.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-4">
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
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
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
      </CardContent>
    </Card>
  )
}
```

---

### `src/components/devices/columns.tsx`

```tsx
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device, type Reading } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Menu, Droplets, Thermometer, Settings } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice, getGatewayForDevice } from "@/lib/data"
import { EditForm } from "../shared/edit-form"
import React from "react"
import { format } from "date-fns"
import { DeviceParametersForm } from "./device-parameters-form"

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

const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isParametersDialogOpen, setIsParametersDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm 
                entity={device} 
                entityName="device"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DeviceParametersForm
                device={device}
                isOpen={isParametersDialogOpen}
                onOpenChange={setIsParametersDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}`}>Данные</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}/logs`}>Логи</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => setIsParametersDialogOpen(true)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Параметры
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const LatestDataCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [latestReading, setLatestReading] = React.useState<Reading | undefined>(undefined);

    React.useEffect(() => {
        getReadingsForDevice(device.id).then(readings => {
            setLatestReading(readings[readings.length - 1]);
        });
    }, [device.id]);

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
}

const LastActivityCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [lastReading, setLastReading] = React.useState<Reading | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getReadingsForDevice(device.id).then(readings => {
            setLastReading(readings[readings.length - 1] || null);
            setIsLoading(false);
        });
    }, [device.id]);
    
    if (isLoading) {
        return <span className="text-muted-foreground">...</span>;
    }

    if (!lastReading?.time) {
        return <span className="text-muted-foreground">N/A</span>;
    }
    return format(new Date(lastReading.time), 'dd.MM.yyyy HH:mm');
}

const GatewayCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [gateway, setGateway] = React.useState<Device | undefined>(undefined);

    React.useEffect(() => {
        if (device.is_gateway) return;
        getGatewayForDevice(device).then(setGateway);
    }, [device]);

    if (device.is_gateway) {
        return null;
    }
    if (!gateway) {
        return <span className="text-muted-foreground">-</span>;
    }
    return (
        <Link 
            href={`/gateways?search_field=serial_number&search_value=${gateway.serial_number}`} 
            className="text-primary hover:underline"
        >
            {gateway.serial_number}
        </Link>
    )
}

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    cell: ({ row }) => {
      const objectName = row.original.object_name;
      const objectId = row.original.objectId;
      if (!objectId || !objectName) {
        return <span className="text-muted-foreground">-</span>;
      }
      return <Link href={`/objects?selected_object_id=${objectId}`} className="hover:underline text-primary">{objectName}</Link>
    }
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    id: "latest_data",
    header: "Последние данные",
    cell: LatestDataCell,
  },
  {
    id: 'gateway',
    header: 'Шлюз',
    cell: GatewayCell,
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
    id: "last_activity",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Последняя активность
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: LastActivityCell,
     sortingFn: 'datetime', // Use built-in tanstack table sorting function
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
]
```

---

### `src/components/devices/create-device-form.tsx`

```tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { deviceModels, channelTypes } from "@/lib/catalogs";

const deviceSchema = z.object({
  external_id: z.string().min(1, "Идентификатор обязателен"),
  serial_number: z.string().min(1, "Серийный номер обязателен"),
  type: z.enum(["water", "heat"]),
  model: z.string().min(1, "Модель обязательна"),
  channel_type: z.string().min(1, "Тип канала обязателен"),
  object_name: z.string().min(1, "Название объекта обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
});

type DeviceFormValues = z.infer<typeof deviceSchema>;

export function CreateDeviceForm() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<DeviceFormValues>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      type: "water",
    },
  });

  function onSubmit(data: DeviceFormValues) {
    console.log("Creating device:", data);
    // Here you would typically call an API to create the device
    toast({
      title: "Устройство создано",
      description: `Устройство ${data.external_id} было успешно добавлено.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать устройство
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новое устройство</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления нового устройства.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="external_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Идентификатор (DevEUI/IMEI)</FormLabel>
                  <FormControl>
                    <Input placeholder="8A3B4C5D6E7F8G9H" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Серийный номер</FormLabel>
                  <FormControl>
                    <Input placeholder="SN-001-A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deviceModels.map((model) => (
                            <SelectItem key={model.id} value={model.value}>{model.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="object_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Объект</FormLabel>
                  <FormControl>
                    <Input placeholder="Жилой дом 'Центральный'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="ул. Ленина, д. 1, кв. 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="water">Вода</SelectItem>
                        <SelectItem value="heat">Тепло</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channel_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Канал</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите канал" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                         {channelTypes.map((type) => (
                            <SelectItem key={type.id} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

### `src/components/devices/data-table.tsx`

```tsx
"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  useReactTable,
  type Row,
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
  const onRowClick = (table.options.meta as any)?.onRowClick;

  return (
    <Card>
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
                <TableHead className="text-right w-[50px]">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Отображение колонок</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            const header = column.columnDef.header;
                            const headerText = typeof header === 'string' ? header : column.id;
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                column.toggleVisibility(!!value)
                                }
                            >
                                {headerText}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row)}
                  className={ onRowClick ? "cursor-pointer" : "" }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                   <TableCell />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  Нет результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        {!isMobile && table.getFilteredSelectedRowModel && <div className="flex-1 text-sm text-muted-foreground">
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
              {[5, 10, 25, 50, 100, 150].map((pageSize) => (
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

---

### `src/components/devices/device-parameters-form.tsx`

```tsx
"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { type Device } from "@/lib/types";
import { Trash2, PlusCircle } from "lucide-react";

const parametersSchema = z.object({
  attributes: z.array(
    z.object({
      name: z.string().min(1, "Название атрибута обязательно"),
      value: z.string().min(1, "Значение обязательно"),
    })
  ),
});

type ParametersFormValues = z.infer<typeof parametersSchema>;

interface DeviceParametersFormProps {
  device: Device;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceParametersForm({ device, isOpen, onOpenChange }: DeviceParametersFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ParametersFormValues>({
    resolver: zodResolver(parametersSchema),
    defaultValues: {
      attributes: device.attributes || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        attributes: device.attributes || [],
      });
    }
  }, [isOpen, device, form]);

  function onSubmit(data: ParametersFormValues) {
    console.log("Updating parameters:", data);
    // In a real app, you would send this data to your API to update the device
    toast({
      title: "Параметры обновлены",
      description: `Атрибуты для устройства ${device.serial_number} были успешно обновлены.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Параметры устройства</DialogTitle>
          <DialogDescription>
            Управление дополнительными атрибутами для устройства {device.serial_number}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="например, AppKey" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Значение</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", value: "" })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить атрибут
            </Button>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

### `src/components/gateways/columns.tsx`

```tsx
"use client"

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, GitBranch } from "lucide-react"
import Link from "next/link"
import { EditForm } from "../shared/edit-form";


const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm
                entity={device}
                entityName="gateway"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}`}>Данные</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const getBaseGatewayColumns: () => ColumnDef<Device>[] = () => [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "object_name",
    header: "Объект",
    enableHiding: true,
  },
  {
    accessorKey: "external_id",
    header: "Идентификатор (IMEI/EUI)",
    enableHiding: true,
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
    enableHiding: true,
  },
  {
    accessorKey: "model",
    header: "Модель",
    enableHiding: true,
  },
  {
    accessorKey: "channel_type",
    header: "Тип канала",
    cell: ({ row }) => {
      const type = row.getValue("channel_type") as string;
      return <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <span>{type}</span>
      </div>
    },
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: ({row}) => {
        return new Date(row.original.created_at).toLocaleDateString('ru-RU')
    },
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell
  },
];


export const useGatewayColumns = (): ColumnDef<Device>[] => {
  const columns = React.useMemo(() => getBaseGatewayColumns(), []);
  return columns;
};
```

---

### `src/components/gateways/create-gateway-form.tsx`

```tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { gatewayModels, channelTypes } from "@/lib/catalogs";

const gatewaySchema = z.object({
  external_id: z.string().min(1, "Идентификатор обязателен"),
  serial_number: z.string().min(1, "Серийный номер обязателен"),
  model: z.string().min(1, "Модель обязательна"),
  channel_type: z.string().min(1, "Тип канала обязателен"),
  object_name: z.string().min(1, "Название объекта обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
});

type GatewayFormValues = z.infer<typeof gatewaySchema>;

export function CreateGatewayForm() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<GatewayFormValues>({
    resolver: zodResolver(gatewaySchema),
    defaultValues: {
      channel_type: "lora",
    },
  });

  function onSubmit(data: GatewayFormValues) {
    console.log("Creating gateway:", { ...data, is_gateway: true, type: 'heat' }); // type is irrelevant for gateway but needed for Device type
    // Here you would typically call an API to create the gateway
    toast({
      title: "Шлюз создан",
      description: `Шлюз ${data.external_id} был успешно добавлен.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать шлюз
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новый шлюз</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления нового шлюза.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="external_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Идентификатор (DevEUI/IMEI)</FormLabel>
                  <FormControl>
                    <Input placeholder="8A3B4C5D6E7F8G9H" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Серийный номер</FormLabel>
                  <FormControl>
                    <Input placeholder="SN-GW-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gatewayModels.map((model) => (
                            <SelectItem key={model.id} value={model.value}>{model.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="object_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Объект</FormLabel>
                  <FormControl>
                    <Input placeholder="Тепловой узел №1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="ул. Центральная, д. 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="channel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип канала</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите канал" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {channelTypes.map((type) => (
                          <SelectItem key={type.id} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

### `src/components/layout/company-context-switcher.tsx`

```tsx
'use client';

import * as React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getCompanies } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Building, X } from 'lucide-react';
import { type Company } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function CompanyContextSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    
    const [companyName, setCompanyName] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        if (companyId) {
            setIsLoading(true);
            const id = parseInt(companyId, 10);
            getCompanies().then((companies: Company[]) => {
                const currentCompany = companies.find(c => c.id === id);
                setCompanyName(currentCompany ? currentCompany.name : 'Неизвестная компания');
                setIsLoading(false);
            });
        } else {
            setCompanyName(null);
            setIsLoading(false);
        }
    }, [companyId]);

    const handleExitContext = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('companyId');
        // Redirect to the same page but without company context
        router.push(`${pathname}?${params.toString()}`);
    };

    if (isLoading) {
        return <Skeleton className="h-8 w-48" />
    }

    if (!companyId || !companyName) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary-foreground">
            <Building className="h-4 w-4" />
            <span className="font-medium">{companyName}</span>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-white/20"
                onClick={handleExitContext}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Выйти из контекста компании</span>
            </Button>
        </div>
    );
}
```

---

### `src/components/layout/header.tsx`

```tsx
import { UserNav } from './user-nav';
import { MainNav } from './main-nav';
import { CompanyContextSwitcher } from './company-context-switcher';
import { Suspense } from 'react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-auto shrink-0 flex-col justify-center gap-4 border-b-4 border-primary bg-header px-4 text-header-foreground sm:px-6">
       <div className="flex h-16 w-full items-center gap-4">
            <MainNav />
            <div className="ml-auto flex items-center gap-4">
                <Suspense fallback={null}>
                  <CompanyContextSwitcher />
                </Suspense>
                <UserNav />
            </div>
      </div>
    </header>
  );
}
```

---

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
    { href: '/dashboard', label: 'Панель мониторинга' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/companies', label: 'Компании' },
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

---

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

---

### `src/components/objects/columns.tsx`

```tsx
"use client"

import Link from "next/link"
import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { type BeliotObject } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronsRight, Eye } from "lucide-react"
import { EditForm } from "../shared/edit-form"

const objectTypeRussian: Record<BeliotObject['objectType'], string> = {
    residential: 'Жилой дом',
    business_center: 'Бизнес-центр',
    mall: 'Торговый центр',
    medical: 'Мед. учреждение',
    school: 'Школа',
    kindergarten: 'Детский сад',
    heating_point: 'Тепловой пункт',
    warehouse: 'Склад',
}

const DeviceStatusSummary = ({ row }: { row: Row<BeliotObject> }) => {
    const { deviceCount, onlineCount = 0, offlineCount = 0, warningCount = 0 } = row.original;

    if (deviceCount === 0) {
        return <span className="text-muted-foreground">-</span>;
    }
    
    return (
        <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5" title="Онлайн">
                 <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]"></span>
                <span className="font-medium">{onlineCount}</span>
            </div>
             <div className="flex items-center gap-1.5" title="Офлайн">
                <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                <span className="font-medium">{offlineCount}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Предупреждения">
                 <span className="h-2 w-2 rounded-full bg-destructive"></span>
                <span className="font-medium">{warningCount}</span>
            </div>
        </div>
    )
}

const ActionsCell = ({ row }: { row: any }) => {
    const object = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm 
                entity={object} 
                entityName="object"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices?object_name=${encodeURIComponent(object.name)}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Посмотреть все устройства
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export const columns: ColumnDef<BeliotObject>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row, getValue }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();
        return (
            <div 
                style={{ paddingLeft: `${row.depth * 1.5}rem` }} 
                className="flex items-center gap-1"
            >
                {canExpand && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            row.toggleExpanded();
                        }}
                        className="h-6 w-6"
                    >
                        <ChevronsRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                )}
                <span className="font-medium">{getValue<string>()}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "address",
    header: "Адрес",
     cell: ({ row, getValue }) => (
        <div>
            {getValue<string>()}
        </div>
    )
  },
  {
    accessorKey: "deviceCount",
    header: "Статус",
    cell: ({ row }) => <div>
        <DeviceStatusSummary row={row} />
    </div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
]
```

---

### `src/components/objects/create-object-form.tsx`

```tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { objectTypes } from "@/lib/catalogs";

const objectSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
  objectType: z.string().min(1, "Тип объекта обязателен"),
});

type ObjectFormValues = z.infer<typeof objectSchema>;

export function CreateObjectForm() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<ObjectFormValues>({
    resolver: zodResolver(objectSchema),
    defaultValues: {
      name: "",
      address: "",
      objectType: "residential",
    },
  });

  function onSubmit(data: ObjectFormValues) {
    console.log("Creating object:", data);
    // Here you would typically call an API to create the object
    toast({
      title: "Объект создан",
      description: `Объект "${data.name}" был успешно добавлен.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать объект
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новый объект</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления нового объекта.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="Жилой дом 'Центральный'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="ул. Ленина, д. 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="objectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип объекта</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {objectTypes.map((type) => (
                           <SelectItem key={type.id} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

---

### `src/components/objects/object-device-list-columns.tsx`

```tsx
"use client"

import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { type Device, type Reading } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Droplets, Thermometer } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice } from "@/lib/data"
import { EditForm } from "../shared/edit-form"

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

const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm
                entity={device}
                entityName="device"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}`}>Данные</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}/logs`}>Логи</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

const LatestDataCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [latestReading, setLatestReading] = React.useState<Reading | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getReadingsForDevice(device.id).then(readings => {
            setLatestReading(readings[readings.length - 1]);
            setIsLoading(false);
        });
    }, [device.id]);

    if(isLoading) {
        return <span className="text-muted-foreground">...</span>;
    }

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
};


export const objectDeviceListColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "object_name",
    header: "Объект/Квартира",
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const Icon = type === 'water' ? Droplets : Thermometer;
      return <div className="flex justify-center">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
    },
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
  },
  {
    id: "latest_data",
    header: "Показания",
    cell: LatestDataCell
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
    id: "actions",
    cell: ActionsCell,
  },
]
```

---

### `src/components/objects/object-device-list.tsx`

```tsx
'use client';

import * as React from 'react';
import { type BeliotObject, type Device } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/card';
import { DataTable } from '../devices/data-table';
import { objectDeviceListColumns } from './object-device-list-columns';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

interface ObjectDeviceListProps {
    selectedObject: BeliotObject | null;
    devices: Device[];
}

export function ObjectDeviceList({ selectedObject, devices }: ObjectDeviceListProps) {

    const table = useReactTable({
        data: devices,
        columns: objectDeviceListColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
         initialState: {
            pagination: {
                pageSize: 5,
            }
        }
    });
    
    if (!selectedObject) {
        return (
            <Card className="flex h-full items-center justify-center">
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">Выберите объект, чтобы просмотреть его устройства.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Устройства объекта</CardTitle>
                <CardDescription>"{selectedObject.name}"</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={objectDeviceListColumns} data={devices} table={table} />
            </CardContent>
        </Card>
    );
}
```

---

### `src/components/reports/report-form.tsx`

```tsx
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { type BeliotObject } from '@/lib/types';

const reportSchema = z.object({
  objectId: z.string().min(1, { message: 'Необходимо выбрать объект' }),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Необходимо выбрать период',
      path: ['from'], // Assign error to one of the fields
    }),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export function ReportForm({ objects }: { objects: BeliotObject[] }) {
  const { toast } = useToast();
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = (data: ReportFormValues) => {
    // In a real app, you would generate a report here.
    console.log(data);
    toast({
      title: 'Отчет формируется',
      description: `Запрошен отчет для объекта ID: ${
        data.objectId
      } за период с ${format(data.dateRange.from!, 'PPP', {
        locale: ru,
      })} по ${format(data.dateRange.to!, 'PPP', { locale: ru })}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Параметры отчета</CardTitle>
        <CardDescription>
          Выберите объект и период для формирования отчета.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="objectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объект</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {objects.map((obj) => (
                          <SelectItem key={obj.id} value={String(obj.id)}>
                            {obj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Период</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value?.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y', {
                                    locale: ru,
                                  })}{' '}
                                  -{' '}
                                  {format(field.value.to, 'LLL dd, y', {
                                    locale: ru,
                                  })}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y', {
                                  locale: ru,
                                })
                              )
                            ) : (
                              <span>Выберите период</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={{
                            from: field.value?.from,
                            to: field.value?.to,
                          }}
                          onSelect={(range) => field.onChange(range)}
                          numberOfMonths={2}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Сформировать отчет</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
```

---

### `src/components/shared/date-range-picker.tsx`

```tsx
"use client";

import * as React from "react";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps {
    dateRange: DateRange | undefined;
    setDateRange: (dateRange: DateRange | undefined) => void;
    className?: string;
}

export function DateRangePicker({ dateRange, setDateRange, className }: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y', { locale: ru })} -{' '}
                  {format(dateRange.to, 'LLL dd, y', { locale: ru })}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y', { locale: ru })
              )
            ) : (
              <span>Выберите период</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
```

---

### `src/components/shared/edit-form.tsx`

```tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { type BeliotObject, type Device } from "@/lib/types";
import { getAllObjects, getDevices as getAllDevices, getGatewayForDevice } from "@/lib/data";
import { Label } from "@/components/ui/label";
import { Skeleton } from "../ui/skeleton";

type Entity = BeliotObject | Device;
type EntityName = "object" | "device" | "gateway";

const deviceSchema = z.object({
  objectId: z.string().optional(),
  gatewayId: z.string().optional(),
});

const objectSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
});


const schemas = {
  device: deviceSchema,
  object: objectSchema,
  gateway: deviceSchema, // Gateways are devices
};

const getFormDefaultValues = async (entityName: EntityName, entity: Entity) => {
    switch (entityName) {
        case 'device':
        case 'gateway':
            const dev = entity as Device;
            const gateway = await getGatewayForDevice(dev);
            return {
                objectId: dev.objectId ? String(dev.objectId) : "",
                gatewayId: gateway ? String(gateway.id) : "",
            };
        case 'object':
            const obj = entity as BeliotObject;
            return {
                name: obj.name,
                address: obj.address,
            }
        default:
            return {};
    }
}


interface EditFormProps {
  entity: Entity;
  entityName: EntityName;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditForm({ entity, entityName, isOpen, onOpenChange }: EditFormProps) {
  const { toast } = useToast();
  const [allObjects, setAllObjects] = React.useState<BeliotObject[]>([]);
  const [gateways, setGateways] = React.useState<Device[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // @ts-ignore
  const schema = schemas[entityName];

  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const fetchData = async () => {
          if (entityName === 'device' || entityName === 'gateway') {
            const [objects, allDevs] = await Promise.all([
                getAllObjects(),
                getAllDevices()
            ]);
            setAllObjects(objects);
            setGateways(allDevs.filter(d => d.is_gateway));
          }
          const defaultValues = await getFormDefaultValues(entityName, entity);
          form.reset(defaultValues);
          setIsLoading(false);
      }
      fetchData();
    }
  }, [entity, entityName, isOpen, form]);

  function onSubmit(data: any) {
    console.log(`Updating ${entityName}:`, data);
    toast({
      title: "Данные обновлены",
      description: `Информация была успешно обновлена.`,
    });
    onOpenChange(false);
  }
  
  const renderDeviceFields = () => {
      const device = entity as Device;
      return (
        <>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Идентификатор</Label>
                <Input value={device.external_id} readOnly className="col-span-3 font-mono" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Серийный номер</Label>
                <Input value={device.serial_number} readOnly className="col-span-3 font-mono" />
            </div>
            <FormField
                control={form.control}
                name="objectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объект</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Без привязки</SelectItem>
                        {allObjects.map((obj) => (
                          <SelectItem key={obj.id} value={String(obj.id)}>
                            {obj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="gatewayId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Шлюз (необязательно)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите шлюз" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Без привязки</SelectItem>
                        {gateways.map((gw) => (
                          <SelectItem key={gw.id} value={String(gw.id)}>
                            {gw.serial_number} ({gw.object_name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
        </>
      )
  }

    const renderObjectFields = () => (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название объекта</FormLabel>
                        <FormControl>
                            <Input placeholder="Название..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Адрес</FormLabel>
                        <FormControl>
                            <Input placeholder="Адрес..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );

  const getTitle = () => {
      switch (entityName) {
          case 'device': return 'Редактировать привязки устройства';
          case 'gateway': return 'Редактировать привязки шлюза';
          case 'object': return 'Редактировать объект';
          default: return 'Редактировать';
      }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
            <div className="space-y-4 py-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                {entityName === 'device' && renderDeviceFields()}
                {entityName === 'gateway' && renderDeviceFields()}
                {entityName === 'object' && renderObjectFields()}
                <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
                <Button type="submit">Сохранить</Button>
                </DialogFooter>
            </form>
            </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
```

---

### `src/components/ui/accordion.tsx`

```tsx
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

---

### `src/components/ui/alert-dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

---

### `src/components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

---

### `src/components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

---

### `src/components/ui/badge.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---

### `src/components/ui/button.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "outline-primary":
            "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

---

### `src/components/ui/calendar.tsx`

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

---

### `src/components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

---

### `src/components/ui/carousel.tsx`

```tsx
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

---

### `src/components/ui/chart.tsx`

```tsx
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

---

### `src/components/ui/checkbox.tsx`

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

---

### `src/components/ui/collapsible.tsx`

```tsx
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

---

### `src/components/ui/dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---

### `src/components/ui/dropdown-menu.tsx`

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

---

### `src/components/ui/form.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

---

### `src/components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

---

### `src/components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

---

### `src/components/ui/menubar.tsx`

```tsx
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
```

---

### `src/components/ui/popover.tsx`

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

---

### `src/components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

---

### `src/components/ui/radio-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

---

### `src/components/ui/scroll-area.tsx`

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

---

### `src/components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

---

### `src/components/ui/separator.tsx`

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

---

### `src/components/ui/sheet.tsx`

```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

---

### `src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

---

### `src/components/ui/slider.tsx`

```tsx
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

---

### `src/components/ui/switch.tsx`

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

---

### `src/components/ui/table.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

---

### `src/components/ui/tabs.tsx`

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

---

### `src/components/ui/textarea.tsx`

```tsx
import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
```

---

### `src/components/ui/toast.tsx`

```tsx
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

---

### `src/components/ui/toaster.tsx`

```tsx
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

---

### `src/components/ui/tooltip.tsx`

```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---

### `src/components/users/columns.tsx`

```tsx
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Badge } from "../ui/badge"

const roleRussian: Record<User['role'], string> = {
    admin: 'Администратор',
    user: 'Пользователь',
    viewer: 'Наблюдатель'
}

const roleVariant: Record<User['role'], 'default' | 'secondary' | 'outline'> = {
    admin: 'default',
    user: 'secondary',
    viewer: 'outline'
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "full_name",
    header: "Полное имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role = row.getValue("role") as User['role'];
      return <Badge variant={roleVariant[role]}>{roleRussian[role]}</Badge>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem disabled>Редактировать</DropdownMenuItem>
            <DropdownMenuItem disabled>Настроить права</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
```

---

### `src/components/users/page.tsx`

```tsx
import { users } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-4">
       <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Пользователи</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button disabled variant="outline-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать пользователя
            </Button>
        </div>
      </div>
       <DataTable columns={columns} data={users} />
    </div>
  );
}
```

---

### `src/hooks/use-mobile.tsx`

```tsx
"use client";

import * as React from "react"

const MOBILE_BREAKPOINT = 768

// This hook has been modified to avoid returning `undefined` on initial render,
// which can cause performance issues with components that depend on it.
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Check if window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
        return;
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(mql.matches)
    }

    // Set initial value on mount
    onChange();

    mql.addEventListener("change", onChange)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
```

---

### `src/hooks/use-toast.ts`

```ts
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

---

### `src/lib/catalogs.ts`

```ts
// In a real application, this data would likely come from a database or an API.

export type CatalogItem = {
    id: string;
    value: string;
    label: string;
    unit?: string;
}

export const deviceModels: CatalogItem[] = [
    { id: "rsyu-1400", value: "RSVU-1400", label: "RSVU-1400" },
    { id: "warmex-200", value: "WarmEx-200", label: "WarmEx-200" },
    { id: "aquaflow-500", value: "AquaFlow-500", label: "AquaFlow-500" },
    { id: "thermo-9", value: "Thermo-9", label: "Thermo-9" },
    { id: "warmex-300", value: "WarmEx-300", label: "WarmEx-300" }
];

export const gatewayModels: CatalogItem[] = [
    { id: "beliot-v1", value: "Beliot Gateway v1", label: "Beliot Gateway v1" },
    { id: "beliot-v2", value: "Beliot Gateway v2", label: "Beliot Gateway v2" },
    { id: "loramaster-3000", value: "LoRaMaster-3000", label: "LoRaMaster-3000" }
];

export const channelTypes: CatalogItem[] = [
    { id: "lora", value: "lora", label: "LoRaWAN" },
    { id: "nbiot", value: "nbiot", label: "NB-IoT" },
    { id: "rs485", value: "rs485", label: "RS-485" },
    { id: "gsm", value: "gsm", label: "GSM" }
];

export const objectTypes: CatalogItem[] = [
    { id: "residential", value: "residential", label: "Жилой дом" },
    { id: "business_center", value: "business_center", label: "Бизнес-центр" },
    { id: "mall", value: "mall", label: "Торговый центр" },
    { id: "medical", value: "medical", label: "Мед. учреждение" },
    { id: "school", value: "school", label: "Школа" },
    { id: "kindergarten", value: "kindergarten", label: "Детский сад" },
    { id: "heating_point", value: "heating_point", label: "Тепловой пункт" },
    { id: "warehouse", value: "warehouse", label: "Склад" },
]

export const readingTypes: { [key: string]: CatalogItem[] } = {
    water: [
        { id: "in1", value: "in1", label: "Объем (канал 1)", unit: "м³" },
        { id: "in2", value: "in2", label: "Объем (канал 2)", unit: "м³" },
        { id: "in3", value: "in3", label: "Объем (канал 3)", unit: "м³" },
        { id: "in4", value: "in4", label: "Объем (канал 4)", unit: "м³" },
        { id: "fflow1", value: "fflow1", label: "Расход (канал 1)", unit: "м³/ч" },
        { id: "fflow2", value: "fflow2", label: "Расход (канал 2)", unit: "м³/ч" },
        { id: "fflow3", value: "fflow3", label: "Расход (канал 3)", unit: "м³/ч" },
        { id: "fflow4", value: "fflow4", label: "Расход (канал 4)", unit: "м³/ч" },
    ],
    heat: [
        { id: "energy", value: "energy", label: "Тепловая энергия", unit: "ГДж" },
        { id: "mass1", value: "mass1", label: "Масса (подача)", unit: "т" },
        { id: "mass2", value: "mass2", label: "Масса (обратка)", unit: "т" },
        { id: "temp_supply", value: "temp_supply", label: "Температура (подача)", unit: "°C" },
        { id: "temp_return", value: "temp_return", label: "Температура (обратка)", unit: "°C" },
    ]
}
```

---

### `src/lib/data.ts`

```ts
import { type Device, type Reading, type BeliotObject, type User, type Company } from './types';

// ===================================================================================
// ASYNCHRONOUS DATA FUNCTIONS - This is the integration point for the backend.
// Replace the body of these functions with your actual API calls.
// ===================================================================================

export async function getDevices(companyId?: number): Promise<Device[]> {
  // TODO: Replace with your API call.
  // Example:
  // const response = await fetch(`/api/devices?companyId=${companyId}`);
  // const data = await response.json();
  // return data;
  console.log(`Fetching devices for companyId: ${companyId}`);
  return [];
}

export async function getAllObjects(companyId?: number): Promise<BeliotObject[]> {
  // TODO: Replace with your API call to get all objects, optionally filtered by companyId.
  console.log(`Fetching all objects for companyId: ${companyId}`);
  return [];
}

export async function getUsers(companyId?: number): Promise<User[]> {
  // TODO: Replace with your API call.
  console.log(`Fetching users for companyId: ${companyId}`);
  return [];
}

export async function getCompanies(): Promise<Company[]> {
  // TODO: Replace with your API call.
  return [];
}

export async function getObjectsTree(companyId?: number): Promise<BeliotObject[]> {
  // TODO: Replace with your API call.
  // This function should fetch objects and build a tree structure.
  console.log(`Fetching object tree for companyId: ${companyId}`);
  return [];
}

export async function getCompaniesTree(): Promise<Company[]> {
  // TODO: Replace with your API call.
  // This function should fetch companies and build a tree structure.
  return [];
}

export async function getDeviceById(id: number): Promise<Device | undefined> {
  // TODO: Replace with your API call.
  console.log(`Fetching device by id: ${id}`);
  return undefined;
}

export async function getReadingsForDevice(deviceId: number): Promise<Reading[]> {
  // TODO: Replace with your API call.
  console.log(`Fetching readings for deviceId: ${deviceId}`);
  return [];
}

export async function getGatewayForDevice(device: Device): Promise<Device | undefined> {
    // TODO: Replace with your API call.
    // This logic might need to be implemented on the backend.
    console.log(`Fetching gateway for device: ${device.id}`);
    return undefined;
};
```

---

### `src/lib/placeholder-images.json`

```json
{
  "placeholderImages": [
    {
      "id": "user-avatar",
      "description": "User avatar",
      "imageUrl": "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjU3NzMxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person portrait"
    }
  ]
}
```

---

### `src/lib/placeholder-images.ts`

```ts
import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
```

---

### `src/lib/types.ts`

```ts
export type BeliotObject = {
    id: number;
    name: string;
    address: string;
    objectType: string;
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
  channel_type: string;
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

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### `src/tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        header: {
          DEFAULT: 'hsl(var(--header))',
          foreground: 'hsl(var(--header-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

### `tailwind.config.ts`

```ts
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

---

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```