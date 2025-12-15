"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Droplets, Thermometer } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice } from "@/lib/data"

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
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Идентификатор (DevEUI/IMEI)",
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
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
    id: "latest_data",
    header: "Последние данные",
    cell: ({ row }) => {
      const device = row.original;
      const readings = getReadingsForDevice(device.id);
      const latestReading = readings[readings.length - 1];

      if (!latestReading) {
        return <span className="text-muted-foreground">N/A</span>;
      }

      let value, unit;
      if (device.type === 'water' && latestReading.in1) {
        value = latestReading.in1.toFixed(2);
        unit = device.unit_volume;
      } else if (device.type === 'heat' && latestReading.energy) {
        value = latestReading.energy.toFixed(2);
        unit = device.unit_energy;
      } else {
         return <span className="text-muted-foreground">N/A</span>;
      }

      return <span>{value} {unit}</span>;
    }
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
    accessorKey: "created_at",
    header: "Дата создания",
    cell: ({row}) => {
        return new Date(row.original.created_at).toLocaleDateString()
    }
  },
  {
    id: "actions",
    enableHiding: false,
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
