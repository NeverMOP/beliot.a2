'use client'

import { getObjectsTree, getAllObjects, getDevices } from "@/lib/data";
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
import { Skeleton } from "@/components/ui/skeleton";

function ObjectsPageContent() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const selectedObjectIdFromUrl = searchParams.get('selected_object_id');

    const [data, setData] = React.useState<BeliotObject[]>([]);
    const [allObjects, setAllObjects] = React.useState<BeliotObject[]>([]);
    const [allDevices, setAllDevices] = React.useState<Device[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});
    const [selectedObject, setSelectedObject] = React.useState<BeliotObject | null>(null);
    const [devicesInSelectedObject, setDevicesInSelectedObject] = React.useState<Device[]>([]);

    const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
    
    // Helper function to recursively get all devices from an object and its children
    const getAllDevicesForObject = React.useCallback((object: BeliotObject, allDevs: Device[]): Device[] => {
        let objectDevices = allDevs.filter(d => d.objectId === object.id);
        if (object.children && object.children.length > 0) {
            objectDevices = objectDevices.concat(object.children.flatMap(child => getAllDevicesForObject(child, allDevs)));
        }
        return objectDevices;
    }, []);

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
    const getParentIds = (allObjs: BeliotObject[], objectId: number): number[] => {
        const ids: number[] = [];
        let current = allObjs.find(o => o.id === objectId);
        while (current && current.parentId) {
            ids.push(current.parentId);
            current = allObjs.find(o => o.id === current.parentId);
        }
        return ids;
    };
    
    React.useEffect(() => {
        const fetchData = async () => {
            const [tree, objects, devices] = await Promise.all([
                getObjectsTree(companyIdNum),
                getAllObjects(),
                getDevices(companyIdNum),
            ]);
            setData(tree);
            setAllObjects(objects);
            setAllDevices(devices);
        }
        fetchData();
    }, [companyIdNum]);
    
     React.useEffect(() => {
        if (selectedObjectIdFromUrl && data.length > 0 && allObjects.length > 0) {
            const objectId = parseInt(selectedObjectIdFromUrl, 10);
            const foundObject = findObjectInTree(data, objectId);
            if (foundObject) {
                setSelectedObject(foundObject);
                // Expand all parents of the selected object to make it visible
                const parentIds = getParentIds(allObjects, objectId);
                const newExpanded: ExpandedState = {};
                parentIds.forEach(id => {
                    newExpanded[String(id)] = true;
                });
                setExpanded(newExpanded);
            }
        }
    }, [selectedObjectIdFromUrl, data, allObjects]);


    React.useEffect(() => {
        if (selectedObject) {
            const devicesToShow = getAllDevicesForObject(selectedObject, allDevices);
            setDevicesInSelectedObject(devicesToShow);
        } else {
            setDevicesInSelectedObject([]);
        }
    }, [selectedObject, allDevices, getAllDevicesForObject]);


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
        getRowId: (row) => String(row.id),
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

function ObjectsPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Skeleton className="h-96 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    )
}

export default function ObjectsPage() {
    return (
        <Suspense fallback={<ObjectsPageSkeleton />}>
            <ObjectsPageContent />
        </Suspense>
    )
}
