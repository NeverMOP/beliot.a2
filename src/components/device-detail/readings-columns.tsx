"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type Reading, type Device } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from 'date-fns';

export const readingsColumns = (device: Device): ColumnDef<Reading>[] => {
  const columns: ColumnDef<Reading>[] = [
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Время
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const time = row.getValue("time") as string;
        return <span>{format(new Date(time), 'dd.MM.yyyy HH:mm')}</span>
      }
    },
  ];

  if (device.type === 'water') {
    columns.push(
      {
        accessorKey: "in1",
        header: `Объем (${device.unit_volume})`,
        cell: ({ row }) => row.original.in1?.toFixed(3) ?? 'N/A'
      },
      {
        accessorKey: "fflow1",
        header: `Расход (${device.unit_volume}/ч)`,
        cell: ({ row }) => row.original.fflow1?.toFixed(3) ?? 'N/A'
      }
    )
  }

  if (device.type === 'heat') {
    columns.push(
      {
        accessorKey: "energy",
        header: `Энергия (${device.unit_energy})`,
        cell: ({ row }) => row.original.energy?.toFixed(3) ?? 'N/A'
      },
      {
        accessorKey: "temp_supply",
        header: `T° подачи (${device.unit_temperature})`,
        cell: ({ row }) => row.original.temp_supply?.toFixed(2) ?? 'N/A'
      },
      {
        accessorKey: "temp_return",
        header: `T° обратки (${device.unit_temperature})`,
        cell: ({ row }) => row.original.temp_return?.toFixed(2) ?? 'N/A'
      }
    )
  }

  columns.push(
    {
      accessorKey: "battery_percent",
      header: "Батарея (%)",
      cell: ({ row }) => row.original.battery_percent?.toFixed(0) ?? 'N/A'
    },
    {
      accessorKey: "rssi",
      header: "RSSI (dBm)",
      cell: ({ row }) => row.original.rssi ?? 'N/A'
    }
  );

  return columns;
};
