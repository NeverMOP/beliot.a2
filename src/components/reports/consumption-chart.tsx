"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface ConsumptionChartProps {
  data: { date: string; consumption: number }[]
  unit: string | undefined
}

export function ConsumptionChart({ data, unit }: ConsumptionChartProps) {
  const chartConfig = {
    consumption: {
      label: `Потребление (${unit || ''})`,
      color: "hsl(var(--primary))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика потребления</CardTitle>
        <CardDescription>Суммарное потребление по дням за выбранный период.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => format(new Date(value), "dd MMM", { locale: ru })}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} unit={unit} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="consumption" fill="var(--color-consumption)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
