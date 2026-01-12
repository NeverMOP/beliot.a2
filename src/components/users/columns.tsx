"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { type User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Check, X, ShieldQuestion } from "lucide-react"
import { Badge } from "../ui/badge"
import { EditUserForm } from "./edit-user-form"
import { getCompanies } from "@/lib/data"

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

const ActionsCell = ({ row }: { row: any }) => {
    const user = row.original;
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [companies, setCompanies] = React.useState<any[]>([]);

    React.useEffect(() => {
        getCompanies().then(setCompanies);
    }, []);

    return (
        <>
            <EditUserForm
                user={user}
                companies={companies}
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
                <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>Редактировать</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" disabled>Удалить</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

const PermissionsCell = ({ row }: { row: any }) => {
    const { permissions } = row.original as User;

    if (!permissions) return <ShieldQuestion className="h-5 w-5 text-muted-foreground" />;

    const permissionItems = [
        { label: "Созд. устр.", value: permissions.canCreateDevices },
        { label: "Созд. комп.", value: permissions.canCreateCompanies },
        { label: "Ред. польз.", value: permissions.canEditUsers },
    ];

    return (
        <div className="flex items-center gap-2">
            {permissionItems.map(p => (
                <div key={p.label} className="flex items-center gap-1" title={p.label}>
                    {p.value ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-destructive" />}
                    <span className="text-xs text-muted-foreground hidden md:inline">{p.label}</span>
                </div>
            ))}
        </div>
    )
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
    id: "permissions",
    header: "Права доступа",
    cell: PermissionsCell,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionsCell,
  },
]
