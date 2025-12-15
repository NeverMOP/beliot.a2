'use client'

import { users } from "@/lib/data";
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

export default function UsersPage() {
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
            <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать пользователя
            </Button>
        </div>
      </div>
       <DataTable columns={columns} data={users} table={table} />
    </div>
  );
}
