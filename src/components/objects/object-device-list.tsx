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
