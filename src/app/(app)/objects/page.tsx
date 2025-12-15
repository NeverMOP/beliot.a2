'use client'

import { getObjectsTree } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/objects/columns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CreateObjectForm } from "@/components/objects/create-object-form";
import * as React from 'react';
import { type BeliotObject } from "@/lib/types";
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';

export default function ObjectsPage() {
    const [data, setData] = React.useState<BeliotObject[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({})

    React.useEffect(() => {
        setData(getObjectsTree());
    }, []);

    const table = useReactTable({
        data,
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
            <Card>
                <CardHeader>
                    <CardTitle>Карта объектов</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video w-full">
                        <Image 
                            src="https://picsum.photos/seed/map/1200/800" 
                            alt="Карта объектов" 
                            fill
                            className="rounded-md object-cover"
                            data-ai-hint="world map"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
