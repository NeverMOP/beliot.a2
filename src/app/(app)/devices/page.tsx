'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { columns } from '@/components/devices/columns';
import { CreateDeviceForm } from '@/components/devices/create-device-form';
import { Button } from '@/components/ui/button';
import { type Device } from '@/lib/types';
import { List, Droplets, Thermometer } from 'lucide-react';

export default function DevicesPage() {
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'water' | 'heat'>(
    'all'
  );

  const filteredDevices =
    typeFilter === 'all'
      ? devices
      : devices.filter((device) => device.type === typeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Устройства
        </h1>
        <CreateDeviceForm />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
      </div>
      <DataTable columns={columns} data={filteredDevices} />
    </div>
  );
}
