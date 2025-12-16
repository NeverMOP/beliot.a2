"use client"

import React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { type Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Droplets, Thermometer } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice } from "@/lib/data"
import { EditForm } from "../shared/edit-form"

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

const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm
                entity={device}
                entityName="device"
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
                    <DropdownMenuItem asChild>
                        <Link href={`/devices/${device.id}/logs`}>Логи</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export const objectDeviceListColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "object_name",
    header: "Объект/Квартира",
  },
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
    id: "latest_data",
    header: "Показания",
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
    },
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
    cell: ActionsCell,
  },
]
