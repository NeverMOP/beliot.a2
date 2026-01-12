"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { differenceInDays } from "date-fns"

interface AnalyticsSummaryProps {
  totalConsumption: number
  previousTotalConsumption: number
  dateRange: DateRange | undefined
  unit: string | undefined
}

export function AnalyticsSummary({
  totalConsumption,
  previousTotalConsumption,
  dateRange,
  unit,
}: AnalyticsSummaryProps) {
  const percentageChange =
    previousTotalConsumption > 0
      ? ((totalConsumption - previousTotalConsumption) / previousTotalConsumption) * 100
      : totalConsumption > 0
      ? 100
      : 0

  const daysInPeriod = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) + 1 : 1
  const averageDailyConsumption = totalConsumption / daysInPeriod

  const changeIcon = percentageChange > 0 ? <ArrowUp className="h-4 w-4 text-destructive" /> : percentageChange < 0 ? <ArrowDown className="h-4 w-4 text-green-600" /> : <Minus className="h-4 w-4 text-muted-foreground" />
  const changeColor = percentageChange > 0 ? "text-destructive" : percentageChange < 0 ? "text-green-600" : "text-muted-foreground"

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Суммарное потребление</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalConsumption.toFixed(2)} {unit}</div>
          <p className="text-xs text-muted-foreground">за выбранный период</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Сравнение с прошлым периодом</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${changeColor}`}>{percentageChange.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {previousTotalConsumption.toFixed(2)} {unit} за предыдущий период
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Среднее суточное потребление</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageDailyConsumption.toFixed(2)} {unit}/сут</div>
          <p className="text-xs text-muted-foreground">за {daysInPeriod} дней</p>
        </CardContent>
      </Card>
    </div>
  )
}
