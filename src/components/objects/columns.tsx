"use client"

import Link from "next/link"
import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { type BeliotObject } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronsRight, Eye } from "lucide-react"
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

const DeviceStatusSummary = ({ row }: { row: Row<BeliotObject> }) => {
    const { deviceCount, onlineCount = 0, offlineCount = 0, warningCount = 0 } = row.original;

    if (deviceCount === 0) {
        return <span className="text-muted-foreground">-</span>;
    }
    
    return (
        <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5" title="Онлайн">
                 <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]"></span>
                <span className="font-medium">{onlineCount}</span>
            </div>
             <div className="flex items-center gap-1.5" title="Офлайн">
                <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                <span className="font-medium">{offlineCount}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Предупреждения">
                 <span className="h-2 w-2 rounded-full bg-destructive"></span>
                <span className="font-medium">{warningCount}</span>
            </div>
        </div>
    )
}

const ActionsCell = ({ row }: { row: any }) => {
    const object = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    return (
        <>
            <EditForm 
                entity={object} 
                entityName="object"
                isOpen={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                        <Link href={`/devices?object_name=${encodeURIComponent(object.name)}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Посмотреть все устройства
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                        Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
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
            <div 
                style={{ paddingLeft: `${row.depth * 1.5}rem` }} 
                className="flex items-center gap-1"
            >
                {canExpand && (
                     <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            row.toggleExpanded();
                        }}
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
     cell: ({ row, getValue }) => (
        <div>
            {getValue<string>()}
        </div>
    )
  },
  {
    accessorKey: "deviceCount",
    header: "Статус",
    cell: ({ row }) => <div>
        <DeviceStatusSummary row={row} />
    </div>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
]
