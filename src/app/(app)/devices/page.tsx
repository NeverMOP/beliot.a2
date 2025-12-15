'use client';

import * as React from 'react';
import { Suspense } from 'react';
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
import { useSearchParams } from 'next/navigation';

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

function DevicesPageContent() {
  const searchParams = useSearchParams();
  const objectNameFromUrl = searchParams.get('object_name');
  
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'water' | 'heat'>('all');
  const [searchField, setSearchField] = React.useState<keyof Device>('object_name');
  const [searchValue, setSearchValue] = React.useState(objectNameFromUrl || '');
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
    
    // Use initial search value from URL if available
    const initialSearchValue = objectNameFromUrl || searchValue;
    if (initialSearchValue) {
        newColumnFilters.push({ id: searchField, value: initialSearchValue });
    }

    setColumnFilters(newColumnFilters);
  }, [typeFilter, searchField, searchValue, objectNameFromUrl]);

  React.useEffect(() => {
    if (objectNameFromUrl) {
      setSearchField('object_name');
      setSearchValue(objectNameFromUrl);
    }
  }, [objectNameFromUrl]);

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

export default function DevicesPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <DevicesPageContent />
        </Suspense>
    )
}
