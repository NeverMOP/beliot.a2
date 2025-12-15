"use client"

import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"
import { type BeliotObject } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ChevronsRight, Eye } from "lucide-react"

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

export const columns: ColumnDef<BeliotObject>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row, getValue }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();
        return (
            <div style={{ paddingLeft: `${row.depth * 2}rem` }} className="flex items-center gap-2">
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
                <span>{getValue<string>()}</span>
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
    header: "Кол-во устройств",
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
            <DropdownMenuItem disabled>Редактировать</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
