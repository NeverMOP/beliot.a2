"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { type BeliotObject } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ChevronsRight, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { EditForm } from "../shared/edit-form"

const objectTypeRussian: Record<BeliotObject['objectType'], string> = {
    residential: 'Жилой дом',
    business_center: 'Бизнес-центр',
    mall: 'Торговый центр',
    medical: 'Мед. учреждение',
    school: 'Школа',
    kindergarten: 'Детский сад',
    heating_point: 'Тепловой пункт',
    warehouse: 'Склад',
}

const DeviceStatusSummary = ({ row }: { row: any }) => {
    const { onlineCount = 0, offlineCount = 0, warningCount = 0 } = row.original;
    const canExpand = row.getCanExpand();

    if (!canExpand || row.getIsExpanded()) {
        return <span>{row.original.deviceCount}</span>;
    }

    return (
        <div className="flex items-center gap-4">
            <span className="font-bold">{row.original.deviceCount}</span>
            <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-[hsl(var(--chart-1))]">
                    <CheckCircle size={16} />
                    <span>{onlineCount}</span>
                </div>
                 <div className="flex items-center gap-1 text-muted-foreground">
                    <XCircle size={16} />
                    <span>{offlineCount}</span>
                </div>
                <div className="flex items-center gap-1 text-destructive">
                    <AlertTriangle size={16} />
                    <span>{warningCount}</span>
                </div>
            </div>
        </div>
    )
}

export const columns: ColumnDef<BeliotObject>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row, getValue }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();
        return (
            <div style={{ paddingLeft: `${row.depth * 1.5}rem` }} className="flex items-center gap-1">
                {canExpand && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => row.toggleExpanded()}
                        className="h-6 w-6"
                    >
                        <ChevronsRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                )}
                <span className="font-medium">{getValue<string>()}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "address",
    header: "Адрес",
  },
  {
    accessorKey: "objectType",
    header: "Тип объекта",
    cell: ({ row }) => {
      const type = row.getValue("objectType") as BeliotObject['objectType'];
      return <span>{objectTypeRussian[type]}</span>
    }
  },
  {
    accessorKey: "deviceCount",
    header: "Устройства",
    cell: ({ row }) => <DeviceStatusSummary row={row} />
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const object = row.original
 
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
                <Link href={`/devices?object_name=${encodeURIComponent(object.name)}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Посмотреть устройства
                </Link>
            </DropdownMenuItem>
             <EditForm
                entity={object}
                entityName="object"
                trigger={<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Редактировать</div>}
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
