'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { columns } from '@/components/gateways/columns';
import { CreateGatewayForm } from '@/components/gateways/create-gateway-form';
import { type Device } from '@/lib/types';

export default function GatewaysPage() {
  const gateways = devices.filter((device) => device.is_gateway);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Шлюзы
        </h1>
        <CreateGatewayForm />
      </div>
      <DataTable columns={columns} data={gateways} />
    </div>
  );
}
