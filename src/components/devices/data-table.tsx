"use client"

import * as React from "react"
import {
  type ColumnDef,
  flexRender,
  useReactTable,
  type Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  table: ReturnType<typeof useReactTable<TData>>,
}

// Helper function to extract header text
const getHeaderText = (header: any): string => {
    if (typeof header === 'string') {
        return header;
    }
    if (typeof header === 'function') {
        // This is a simple heuristic, might need adjustment for more complex headers
        const rendered = header({});
        if (rendered && rendered.props && rendered.props.children) {
            const children = React.Children.toArray(rendered.props.children);
            const textChild = children.find(child => typeof child === 'string');
            if (textChild) return textChild as string;
            // Handle case where header is a component like <Button>
            const buttonChild = children.find((c: any) => c.props && c.props.children);
            if (buttonChild) {
                 const buttonChildren = React.Children.toArray((buttonChild as any).props.children);
                 const buttonText = buttonChildren.find(c => typeof c === 'string');
                 if (buttonText) return buttonText as string;
            }
        }
    }
    return '';
};

export function DataTable<TData, TValue>({
  columns,
  table
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const onRowClick = (table.options.meta as any)?.onRowClick;

  return (
    <Card>
      {!isMobile && table.getAllColumns().some(c => c.getCanHide()) && (
        <div className="flex items-center justify-end p-4 gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        <Settings className="mr-2 h-4 w-4" />
                        Колонки
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>Отображение колонок</DropdownMenuLabel>
                <DropdownMenuSeparator />
                    {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        const headerText = getHeaderText(column.columnDef.header) || column.id;
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                            }
                        >
                            {headerText}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )}
      <div className="relative">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                      if (onRowClick) {
                          onRowClick(row);
                      }
                  }}
                  className={ onRowClick ? "cursor-pointer" : "" }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={e => {
                        // Prevent row click from firing when clicking on dropdown menu
                        if (cell.column.id === 'actions') {
                            e.stopPropagation();
                        }
                    }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Нет результатов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        {!isMobile && table.getFilteredSelectedRowModel && <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} из{' '}
          {table.getFilteredRowModel().rows.length} строк выбрано.
        </div>}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Строк на странице</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
         <div className="hidden w-[100px] items-center justify-center text-sm font-medium sm:flex">
            Стр. {table.getState().pagination.pageIndex + 1} из{' '}
            {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Назад
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Вперед
        </Button>
      </div>
    </Card>
  )
}
