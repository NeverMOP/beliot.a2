"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Device, type Reading } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Menu, Droplets, Thermometer, Settings } from "lucide-react"
import Link from "next/link"
import { getReadingsForDevice, getGatewayForDevice } from "@/lib/data"
import { EditForm } from "../shared/edit-form"
import React from "react"
import { format } from "date-fns"
import { DeviceParametersForm } from "./device-parameters-form"

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

const typeRussian: Record<string, string> = {
    water: 'Вода',
    heat: 'Тепло'
}

const ActionsCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isParametersDialogOpen, setIsParametersDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm 
                entity={device} 
                entityName="device"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DeviceParametersForm
                device={device}
                isOpen={isParametersDialogOpen}
                onOpenChange={setIsParametersDialogOpen}
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
                     <DropdownMenuItem onSelect={() => setIsParametersDialogOpen(true)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Параметры
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const LatestDataCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [latestReading, setLatestReading] = React.useState<Reading | undefined>(undefined);

    React.useEffect(() => {
        getReadingsForDevice(device.id).then(readings => {
            setLatestReading(readings[readings.length - 1]);
        });
    }, [device.id]);

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

const LastActivityCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [lastReading, setLastReading] = React.useState<Reading | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getReadingsForDevice(device.id).then(readings => {
            setLastReading(readings[readings.length - 1] || null);
            setIsLoading(false);
        });
    }, [device.id]);
    
    if (isLoading) {
        return <span className="text-muted-foreground">...</span>;
    }

    if (!lastReading?.time) {
        return <span className="text-muted-foreground">N/A</span>;
    }
    return format(new Date(lastReading.time), 'dd.MM.yyyy HH:mm');
}

const GatewayCell = ({ row }: { row: any }) => {
    const device = row.original;
    const [gateway, setGateway] = React.useState<Device | undefined>(undefined);

    React.useEffect(() => {
        if (device.is_gateway) return;
        getGatewayForDevice(device).then(setGateway);
    }, [device]);

    if (device.is_gateway) {
        return null;
    }
    if (!gateway) {
        return <span className="text-muted-foreground">-</span>;
    }
    return (
        <Link 
            href={`/gateways?search_field=serial_number&search_value=${gateway.serial_number}`} 
            className="text-primary hover:underline"
        >
            {gateway.serial_number}
        </Link>
    )
}

export const columns: ColumnDef<Device>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
    },
  },
  {
    accessorKey: "external_id",
    header: "Идентификатор",
  },
  {
    accessorKey: "serial_number",
    header: "Серийный номер",
  },
  {
    accessorKey: "object_name",
    header: "Объект",
    cell: ({ row }) => {
      const objectName = row.original.object_name;
      const objectId = row.original.objectId;
      if (!objectId || !objectName) {
        return <span className="text-muted-foreground">-</span>;
      }
      return <Link href={`/objects?selected_object_id=${objectId}`} className="hover:underline text-primary">{objectName}</Link>
    }
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    id: "latest_data",
    header: "Последние данные",
    cell: LatestDataCell,
  },
  {
    id: 'gateway',
    header: 'Шлюз',
    cell: GatewayCell,
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
    id: "last_activity",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Последняя активность
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: LastActivityCell,
     sortingFn: 'datetime', // Use built-in tanstack table sorting function
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
]
