'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { columns } from '@/components/devices/columns';
import { CreateDeviceForm } from '@/components/devices/create-device-form';
import { Button } from '@/components/ui/button';
import { type Device } from '@/lib/types';
import { List, Droplets, Thermometer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from 'lucide-react';
import { type ColumnFiltersState } from '@tanstack/react-table';

const searchFields: { value: keyof Device; label: string }[] = [
    { value: 'object_name', label: 'Объект' },
    { value: 'address', label: 'Адрес' },
    { value: 'serial_number', label: 'Серийный номер' },
    { value: 'id', label: 'ID' },
    { value: 'external_id', label: 'Идентификатор' },
]

export default function DevicesPage() {
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'water' | 'heat'>(
    'all'
  );
   const [searchField, setSearchField] = React.useState<keyof Device>('object_name');
   const [searchValue, setSearchValue] = React.useState('');
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

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


  return (
    <div className="space-y-4">
       <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Устройства</h1>
        <div className="ml-auto flex items-center gap-2">
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
        </div>
      </div>
      <DataTable columns={columns} data={devices} columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
    </div>
  );
}
