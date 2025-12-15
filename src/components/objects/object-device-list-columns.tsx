"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Droplets, Thermometer } from "lucide-react"
import Link from "next/link"

const getStatusClass = (status: 'online' | 'offline' | 'warning') => {
    switch (status) {
        case 'online':
            return 'bg-[hsl(var(--chart-1))] text-primary-foreground';
        case 'warning':
            return 'bg-destructive text-destructive-foreground';
        default:
            return 'bg-secondary text-secondary-foreground';
    }
}

const statusRussian: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    warning: 'Предупреждение'
}

export const objectDeviceListColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const Icon = type === 'water' ? Droplets : Thermometer;
      return <div className="flex justify-center">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
    },
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as Device['status'];
      return <Badge className={`capitalize ${getStatusClass(status)}`}>{statusRussian[status]}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const device = row.original
 
      return (
        <Button variant="ghost" asChild className="h-8 w-8 p-0">
            <Link href={`/devices/${device.id}`}>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">К устройству</span>
            </Link>
        </Button>
      )
    },
  },
]
