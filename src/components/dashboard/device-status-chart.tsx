'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { devices } from '@/lib/data';
import { type ChartConfig } from '@/components/ui/chart';

const statusData = devices.reduce((acc, device) => {
  acc[device.status] = (acc[device.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(statusData).map(([status, count]) => ({
  status,
  count,
}));

const chartConfig = {
  count: {
    label: 'Устройства',
  },
  online: {
    label: 'Онлайн',
    color: 'hsl(var(--chart-1))',
  },
  offline: {
    label: 'Офлайн',
    color: 'hsl(var(--muted-foreground))',
  },
  warning: {
    label: 'Предупреждения',
    color: 'hsl(var(--destructive))',
  },
} satisfies ChartConfig;

export function DeviceStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Состояние устройств</CardTitle>
        <CardDescription>Распределение устройств по текущему статусу</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={chartConfig[entry.status as keyof typeof chartConfig]?.color} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-[2rem] flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
