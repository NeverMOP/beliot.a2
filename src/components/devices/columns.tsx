"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Droplets, Thermometer } from "lucide-react"
import Link from "next/link"

const getStatusVariant = (status: 'online' | 'offline' | 'warning'): "default" | "destructive" | "secondary" => {
    switch (status) {
      case 'online':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'offline':
        return 'secondary';
      default:
        return 'secondary';
    }
}

const statusRussian: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    warning: 'Предупреждение'
}

const typeRussian: Record<string, string> = {
    water: 'Вода',
    heat: 'Тепло'
}

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Тип
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const Icon = type === 'water' ? Droplets : Thermometer;
      return <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span>{typeRussian[type]}</span>
      </div>
    }
  },
  {
    accessorKey: "external_id",
    header: "External ID",
  },
  {
    accessorKey: "object_name",
    header: "Объект",
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as Device['status'];
      return <Badge variant={getStatusVariant(status)} className="capitalize">{statusRussian[status]}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const device = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/devices/${device.id}`}>Посмотреть детали</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
