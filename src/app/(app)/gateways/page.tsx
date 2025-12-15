'use client';

import * as React from 'react';
import { devices } from '@/lib/data';
import { DataTable } from '@/components/devices/data-table';
import { useGatewayColumns } from '@/components/gateways/columns';
import { CreateGatewayForm } from '@/components/gateways/create-gateway-form';
import { type Device } from '@/lib/types';

export default function GatewaysPage() {
  const gateways = devices.filter((device) => device.is_gateway);
  const columns = useGatewayColumns();

  return (
    <div className="space-y-4">
      <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Шлюзы</h1>
        <div className="ml-auto flex items-center gap-2">
            <CreateGatewayForm />
        </div>
      </div>
      <DataTable columns={columns} data={gateways} />
    </div>
  );
}
