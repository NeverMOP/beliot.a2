'use client'

import { getObjectsTree, devices } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as objectColumns } from "@/components/objects/columns";
import { CreateObjectForm } from "@/components/objects/create-object-form";
import * as React from 'react';
import { type BeliotObject, type Device } from "@/lib/types";
import { 
    type Row,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';
import { ObjectDeviceList } from "@/components/objects/object-device-list";

// Helper function to recursively get all device IDs from an object and its children
const getAllDeviceIds = (object: BeliotObject): number[] => {
    let ids = devices.filter(d => d.objectId === object.id).map(d => d.id);
    if (object.children && object.children.length > 0) {
        ids = ids.concat(object.children.flatMap(getAllDeviceIds));
    }
    return ids;
};

// Helper function to recursively get all devices from an object and its children
const getAllDevices = (object: BeliotObject): Device[] => {
    let objectDevices = devices.filter(d => d.objectId === object.id);
    if (object.children && object.children.length > 0) {
        objectDevices = objectDevices.concat(object.children.flatMap(getAllDevices));
    }
    return objectDevices;
}

export default function ObjectsPage() {
    const [data, setData] = React.useState<BeliotObject[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [selectedObject, setSelectedObject] = React.useState<BeliotObject | null>(null);
    const [devicesInSelectedObject, setDevicesInSelectedObject] = React.useState<Device[]>([]);

    React.useEffect(() => {
        setData(getObjectsTree());
    }, []);

    React.useEffect(() => {
        if (selectedObject) {
            const devicesToShow = getAllDevices(selectedObject);
            setDevicesInSelectedObject(devicesToShow);
        } else {
            setDevicesInSelectedObject([]);
        }
    }, [selectedObject]);


    const handleRowClick = (row: Row<BeliotObject>) => {
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
        meta: {
            onRowClick: handleRowClick,
        }
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
                devices={devicesInSelectedObject} 
            />
        </div>
      </div>
    </div>
  );
}
