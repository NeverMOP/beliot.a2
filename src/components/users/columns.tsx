"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Badge } from "../ui/badge"

const roleRussian: Record<User['role'], string> = {
    admin: 'Администратор',
    user: 'Пользователь',
    viewer: 'Наблюдатель'
}

const roleVariant: Record<User['role'], 'default' | 'secondary' | 'outline'> = {
    admin: 'default',
    user: 'secondary',
    viewer: 'outline'
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "full_name",
    header: "Полное имя",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role = row.getValue("role") as User['role'];
      return <Badge variant={roleVariant[role]}>{roleRussian[role]}</Badge>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem disabled>Редактировать</DropdownMenuItem>
            <DropdownMenuItem disabled>Настроить права</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
