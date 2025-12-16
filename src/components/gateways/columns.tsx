"use client"

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, GitBranch } from "lucide-react"
import Link from "next/link"
import { EditForm } from "../shared/edit-form";


const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm
                entity={device}
                entityName="gateway"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}`}>Данные</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const getBaseGatewayColumns: () => ColumnDef<Device>[] = () => [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "object_name",
    header: "Объект",
    enableHiding: true,
  },
  {
    accessorKey: "external_id",
    header: "Идентификатор (IMEI/EUI)",
    enableHiding: true,
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
    enableHiding: true,
  },
  {
    accessorKey: "model",
    header: "Модель",
    enableHiding: true,
  },
  {
    accessorKey: "channel_type",
    header: "Тип канала",
    cell: ({ row }) => {
      const type = row.getValue("channel_type") as string;
      return <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-muted-foreground" />
        <span>{type}</span>
      </div>
    },
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: "Дата создания",
    cell: ({row}) => {
        return new Date(row.original.created_at).toLocaleDateString('ru-RU')
    },
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell
  },
];


export const useGatewayColumns = (): ColumnDef<Device>[] => {
  const columns = React.useMemo(() => getBaseGatewayColumns(), []);
  return columns;
};
