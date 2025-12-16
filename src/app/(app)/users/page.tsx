'use client'

import { getUsers } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import * as React from 'react';
import { 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { type User } from "@/lib/types";

function UsersPageContent() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get('companyId');
    const [currentUsers, setCurrentUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
        setCurrentUsers(getUsers(companyIdNum));
    }, [companyId]);

   const table = useReactTable({
    data: currentUsers,
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
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать пользователя
            </Button>
        </div>
      </div>
       <DataTable columns={columns} data={currentUsers} table={table} />
    </div>
  );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <UsersPageContent />
        </Suspense>
    )
}
