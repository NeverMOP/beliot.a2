'use client'

import { getObjectsTree, getDevices, allObjects as allObjectsData } from "@/lib/data";
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
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ObjectsPageContent() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const selectedObjectIdFromUrl = searchParams.get('selected_object_id');

    const [data, setData] = React.useState<BeliotObject[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [selectedObject, setSelectedObject] = React.useState<BeliotObject | null>(null);
    const [devicesInSelectedObject, setDevicesInSelectedObject] = React.useState<Device[]>([]);

    const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
    const allDevicesForContext = React.useMemo(() => getDevices(companyIdNum), [companyIdNum]);
    const allObjectsForContext = React.useMemo(() => allObjectsData, []);
    
    // Helper function to recursively get all devices from an object and its children
    const getAllDevices = React.useCallback((object: BeliotObject): Device[] => {
        let objectDevices = allDevicesForContext.filter(d => d.objectId === object.id);
        if (object.children && object.children.length > 0) {
            objectDevices = objectDevices.concat(object.children.flatMap(getAllDevices));
        }
        return objectDevices;
    }, [allDevicesForContext]);

    // Helper to find an object and its path in a tree
    const findObjectInTree = (nodes: BeliotObject[], id: number): BeliotObject | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
                const found = findObjectInTree(node.children, id);
                if (found) return found;
            }
        }
        return null;
    };

    // Helper to get all parent IDs of a given object
    const getParentIds = (allObjects: BeliotObject[], objectId: number): number[] => {
        const ids: number[] = [];
        let current = allObjects.find(o => o.id === objectId);
        while (current && current.parentId) {
            ids.push(current.parentId);
            current = allObjects.find(o => o.id === current.parentId);
        }
        return ids;
    };


    React.useEffect(() => {
        setData(getObjectsTree(companyIdNum));
    }, [companyIdNum]);
    
     React.useEffect(() => {
        if (selectedObjectIdFromUrl) {
            const objectId = parseInt(selectedObjectIdFromUrl, 10);
            const foundObject = findObjectInTree(data, objectId);
            if (foundObject) {
                setSelectedObject(foundObject);
                // Expand all parents of the selected object to make it visible
                const parentIds = getParentIds(allObjectsForContext, objectId);
                const newExpanded: ExpandedState = {};
                parentIds.forEach(id => {
                    newExpanded[id] = true;
                });
                setExpanded(newExpanded);
            }
        }
    }, [selectedObjectIdFromUrl, data, allObjectsForContext]);


    React.useEffect(() => {
        if (selectedObject) {
            const devicesToShow = getAllDevices(selectedObject);
            setDevicesInSelectedObject(devicesToShow);
        } else {
            setDevicesInSelectedObject([]);
        }
    }, [selectedObject, getAllDevices]);


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

export default function ObjectsPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <ObjectsPageContent />
        </Suspense>
    )
}
