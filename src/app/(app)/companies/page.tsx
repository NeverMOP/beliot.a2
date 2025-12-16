'use client'

import { getCompaniesTree } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as companyColumns } from "@/components/companies/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import * as React from 'react';
import { type Company } from "@/lib/types";
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getExpandedRowModel,
    type ExpandedState,
    useReactTable,
} from '@tanstack/react-table';
import { Suspense } from "react";

function CompaniesPageContent() {
    const [data, setData] = React.useState<Company[]>([]);
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    React.useEffect(() => {
        const fetchData = async () => {
            const tree = await getCompaniesTree();
            setData(tree);
        };
        fetchData();
    }, []);

    const columns = React.useMemo(() => companyColumns, []);

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
        <h1 className="text-lg font-semibold text-secondary-foreground">Компании</h1>
        <div className="ml-auto flex items-center gap-2">
            <Button disabled variant="outline-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать компанию
            </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} table={table} />
    </div>
  );
}


export default function CompaniesPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <CompaniesPageContent />
        </Suspense>
    )
}
