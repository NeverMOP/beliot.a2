"use client"

import React from "react";
import { type ColumnDef, type Row } from "@tanstack/react-table"
import { type Company } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronsRight, LogIn } from "lucide-react"
import { useToast } from "@/hooks/use-toast";

const ActionsCell = ({ row }: { row: Row<Company> }) => {
    const company = row.original;
    const { toast } = useToast();

    const handleLogin = () => {
        toast({
            title: `Вход в компанию...`,
            description: `Переключение на контекст компании "${company.name}".`,
        });
    };

    return (
        <div className="flex items-center justify-end gap-2">
             <Button variant="outline" size="sm" onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                Войти
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Открыть меню</span>
                        <Menu className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem disabled>
                        Редактировать
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Название компании",
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "unp",
    header: "УНП",
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
]
