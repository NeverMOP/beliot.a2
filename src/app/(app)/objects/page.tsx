'use client'

import { getObjectsTree, devices } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as objectColumns } from "@/components/objects/columns";
import { CreateObjectForm } from "@/components/objects/create-object-form";
import * as React from 'react';
import { type BeliotObject, type Device } from "@/lib/types";
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';
import { ObjectDeviceList } from "@/components/objects/object-device-list";

export default function ObjectsPage() {
    const [data, setData] = React.useState<BeliotObject[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [selectedObject, setSelectedObject] = React.useState<BeliotObject | null>(null);

    React.useEffect(() => {
        setData(getObjectsTree());
    }, []);

    const handleRowClick = (row: any) => {
        setSelectedObject(row.original);
    };

    const columns = React.useMemo(() => objectColumns(handleRowClick), []);

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
            <ObjectDeviceList 
                selectedObject={selectedObject} 
                devices={devices.filter(d => d.objectId === selectedObject?.id)} 
            />
        </div>
      </div>
    </div>
  );
}
