'use client'

import { getUsers, getCompanies } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import * as React from 'react';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { type User, type Company } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateUserForm } from "@/components/users/create-user-form";


function UsersPageSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-96 w-full" />
        </div>
    )
}

function UsersPageContent({ users, companies }: { users: User[], companies: Company[] }) {
   const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
       <div className="flex h-16 items-center gap-4 rounded-md bg-secondary px-4">
        <h1 className="text-lg font-semibold text-secondary-foreground">Пользователи</h1>
        <div className="ml-auto flex items-center gap-2">
            <CreateUserForm companies={companies} />
        </div>
      </div>
       <DataTable columns={columns} data={users} table={table} />
    </div>
  );
}


function UsersPageContainer() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const [users, setUsers] = React.useState<User[]>([]);
    const [companies, setCompanies] = React.useState<Company[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
        setLoading(true);
        Promise.all([
            getUsers(companyIdNum),
            getCompanies()
        ]).then(([fetchedUsers, fetchedCompanies]) => {
            setUsers(fetchedUsers);
            setCompanies(fetchedCompanies);
            setLoading(false);
        });
    }, [companyId]);

    if (loading) {
        return <UsersPageSkeleton />;
    }

    return <UsersPageContent users={users} companies={companies} />;
}

export default function UsersPage() {
    return (
        <Suspense fallback={<UsersPageSkeleton />}>
            <UsersPageContainer />
        </Suspense>
    )
}
