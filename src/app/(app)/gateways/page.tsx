'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { devices } from '@/lib/data';
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

function GatewaysPageContent() {
    const searchParams = useSearchParams();
    const searchFieldFromUrl = searchParams.get('search_field') as keyof Device | null;
    const searchValueFromUrl = searchParams.get('search_value');

    const gateways = React.useMemo(() => devices.filter((device) => device.is_gateway), []);
    const columns = useGatewayColumns();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    React.useEffect(() => {
        if (searchFieldFromUrl && searchValueFromUrl) {
            setColumnFilters([{ id: searchFieldFromUrl, value: searchValueFromUrl }]);
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

export default function GatewaysPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <GatewaysPageContent />
    </Suspense>
  )
}
