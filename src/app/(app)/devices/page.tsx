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
                <Button variant={typeFilter === 'all' ? 'default' : 'outline'} onClick={() => setTypeFilter('all')} size="sm" className="bg-background/80" >
                    <List className="mr-2 h-4 w-4" /> Все типы
                </Button>
                <Button variant={typeFilter === 'water' ? 'default' : 'outline'} onClick={() => setTypeFilter('water')} size="sm" className="bg-background/80" >
                    <Droplets className="mr-2 h-4 w-4" /> Вода
                </Button>
                <Button variant={typeFilter === 'heat' ? 'default' : 'outline'} onClick={() => setTypeFilter('heat')} size="sm" className="bg-background/80" >
                    <Thermometer className="mr-2 h-4 w-4" /> Тепло
                </Button>
            </div>
             <div className='flex gap-2 border-r pr-4'>
                <Button variant={statusFilter === 'all' ? 'default' : 'outline'} onClick={() => setStatusFilter('all')} size="sm" className="bg-background/80" >
                    <List className="mr-2 h-4 w-4" /> Все статусы
                </Button>
                <Button variant={statusFilter === 'online' ? 'default' : 'outline'} onClick={() => setStatusFilter('online')} size="sm" className="bg-background/80" >
                    <CheckCircle className="mr-2 h-4 w-4" /> Онлайн
                </Button>
                <Button variant={statusFilter === 'offline' ? 'default' : 'outline'} onClick={() => setStatusFilter('offline')} size="sm" className="bg-background/80" >
                    <XCircle className="mr-2 h-4 w-4" /> Офлайн
                </Button>
                 <Button variant={statusFilter === 'warning' ? 'default' : 'outline'} onClick={() => setStatusFilter('warning')} size="sm" className="bg-background/80" >
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
    gateway: false,
    status: true,
    created_at: false,
    actions: true,
}

function DevicesPageContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const objectNameFromUrl = searchParams.get('object_name');
  const statusFromUrl = searchParams.get('status') as StatusFilter | null;
  
  const [currentDevices, setCurrentDevices] = React.useState<Device[]>([]);
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
    const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
    setCurrentDevices(getDevices(companyIdNum));
  }, [companyId]);

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

export default function DevicesPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <DevicesPageContent />
        </Suspense>
    )
}
