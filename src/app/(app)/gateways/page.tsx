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

function GatewaysPageContent() {
    const searchParams = useSearchParams();
    const searchFieldFromUrl = searchParams.get('search_field') as keyof Device | null;
    const searchValueFromUrl = searchParams.get('search_value');

    const [gateways, setGateways] = React.useState<Device[]>([]);
    const columns = useGatewayColumns();
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    React.useEffect(() => {
        getDevices().then(allDevices => {
            setGateways(allDevices.filter(d => d.is_gateway));
        });
    }, []);

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

function GatewaysPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

export default function GatewaysPage() {
  return (
    <Suspense fallback={<GatewaysPageSkeleton />}>
      <GatewaysPageContent />
    </Suspense>
  )
}
