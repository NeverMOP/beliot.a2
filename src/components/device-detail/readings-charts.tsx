'use client';
import { type Device, type Reading } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const waterChartConfig = {
  in1: { label: 'Накопленный объем 1', color: 'hsl(var(--chart-1))' },
  in2: { label: 'Накопленный объем 2', color: 'hsl(var(--chart-2))' },
  fflow1: { label: 'Мгновенный расход 1', color: 'hsl(var(--chart-1))' },
  fflow2: { label: 'Мгновенный расход 2', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const heatChartConfig = {
  energy: { label: 'Энергия', color: 'hsl(var(--chart-1))' },
  mass1: { label: 'Масса', color: 'hsl(var(--chart-2))' },
  temp_supply: { label: 't° Подачи', color: 'hsl(var(--chart-4))' },
  temp_return: { label: 't° Обратки', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

const BaseChart = ({ data, dataKey, label, unit, color }: { data: any[], dataKey: string, label: string, unit: string, color: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-base">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer config={{}} className="h-[250px] w-full">
         <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(value) => format(new Date(value), 'MM/dd HH:mm')}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            tickCount={5}
            />
          <YAxis unit={unit} axisLine={false} tickLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
        </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

const TempChart = ({ data }: { data: Reading[] }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Температура</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={heatChartConfig} className="h-[250px] w-full">
           <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickFormatter={(value) => format(new Date(value), 'MM/dd HH:mm')}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <YAxis unit="°C" axisLine={false} tickLine={false} tickMargin={8}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="temp_supply"
              type="natural"
              fill={heatChartConfig.temp_supply.color}
              fillOpacity={0.4}
              stroke={heatChartConfig.temp_supply.color}
              stackId="a"
            />
            <Area
              dataKey="temp_return"
              type="natural"
              fill={heatChartConfig.temp_return.color}
              fillOpacity={0.4}
              stroke={heatChartConfig.temp_return.color}
              stackId="b"
            />
          </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );

export function ReadingsCharts({ device, readings }: { device: Device; readings: Reading[] }) {
  if (readings.length === 0) {
    return <Card><CardHeader><CardTitle>Нет данных</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Для этого устройства еще нет показаний.</p></CardContent></Card>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {device.type === 'water' && (
        <>
          <BaseChart data={readings} dataKey="in1" label="Накопленный объем" unit={device.unit_volume} color={waterChartConfig.in1.color} />
          <BaseChart data={readings} dataKey="fflow1" label="Мгновенный расход" unit={`${device.unit_volume}/ч`} color={waterChartConfig.fflow1.color} />
        </>
      )}
      {device.type === 'heat' && (
        <>
          <BaseChart data={readings} dataKey="energy" label="Энергия" unit={device.unit_energy} color={heatChartConfig.energy.color} />
          <TempChart data={readings} />
        </>
      )}
    </div>
  );
}
