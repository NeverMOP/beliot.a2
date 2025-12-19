'use client'

import { getCompaniesTree } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns as companyColumns } from "@/components/companies/columns";
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
import { Skeleton } from "@/components/ui/skeleton";
import { CreateCompanyForm } from "@/components/companies/create-company-form";

function CompaniesPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function CompaniesPageContent({ companies }: { companies: Company[] }) {
    const [expanded, setExpanded] = React.useState<ExpandedState>({});

    const columns = React.useMemo(() => companyColumns, []);

    const table = useReactTable({
        data: companies,
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
            <CreateCompanyForm />
        </div>
      </div>
      <DataTable columns={columns} data={companies} table={table} />
    </div>
  );
}


async function CompaniesPageContainer() {
    const tree = await getCompaniesTree();
    return <CompaniesPageContent companies={tree} />
}

export default function CompaniesPage() {
    return (
        <Suspense fallback={<CompaniesPageSkeleton />}>
            <CompaniesPageContainer />
        </Suspense>
    )
}
