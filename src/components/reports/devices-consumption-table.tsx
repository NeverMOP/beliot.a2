"use client"

import { type Device, type Reading } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface DevicesConsumptionTableProps {
  devices: Device[]
  deviceReadings: Map<number, Reading[]>
}

export function DevicesConsumptionTable({ devices, deviceReadings }: DevicesConsumptionTableProps) {
  const tableData = devices.map(device => {
    const readings = deviceReadings.get(device.id) || []
    const getConsumptionValue = (reading: Reading) => device.type === 'heat' ? reading.energy || 0 : reading.in1 || 0;
    
    const startValue = readings.length > 0 ? getConsumptionValue(readings[0]) : 0
    const endValue = readings.length > 0 ? getConsumptionValue(readings[readings.length - 1]) : 0
    const consumption = endValue > startValue ? endValue - startValue : 0
    const unit = device.type === 'heat' ? device.unit_energy : device.unit_volume

    return {
      id: device.id,
      serial_number: device.serial_number,
      startValue: startValue.toFixed(3),
      endValue: endValue.toFixed(3),
      consumption: consumption.toFixed(3),
      unit,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Потребление по устройствам</CardTitle>
        <CardDescription>Детализация потребления для каждого устройства на объекте за выбранный период.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Серийный номер</TableHead>
              <TableHead>Начальные показания</TableHead>
              <TableHead>Конечные показания</TableHead>
              <TableHead className="text-right">Потребление</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link href={`/devices/${row.id}`} className="font-medium text-primary hover:underline">
                    {row.serial_number}
                  </Link>
                </TableCell>
                <TableCell>{row.startValue}</TableCell>
                <TableCell>{row.endValue}</TableCell>
                <TableCell className="text-right font-semibold">{row.consumption} {row.unit}</TableCell>
              </TableRow>
            ))}
            {tableData.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        Нет данных о потреблении для выбранного объекта и периода.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
