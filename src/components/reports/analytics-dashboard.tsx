"use client";

import * as React from 'react';
import { type BeliotObject, type Device, type Reading } from '@/lib/types';
import { DateRangePicker } from '@/components/shared/date-range-picker';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { subDays, startOfMonth, endOfMonth, format, differenceInDays } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { ConsumptionChart } from './consumption-chart';
import { AnalyticsSummary } from './analytics-summary';
import { DevicesConsumptionTable } from './devices-consumption-table';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


type TimePreset = 'current_month' | 'last_month' | 'last_7_days' | 'last_30_days';

export function AnalyticsDashboard({ 
    objects,
    devices: allDevices,
    readings: allReadings
}: { 
    objects: BeliotObject[];
    devices: Device[];
    readings: Reading[];
}) {
    const { toast } = useToast();
    const [selectedObjectId, setSelectedObjectId] = React.useState<string | undefined>(objects[0]?.id.toString());
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    });

    const handlePresetChange = (preset: TimePreset) => {
        const now = new Date();
        if (preset === 'current_month') {
            setDateRange({ from: startOfMonth(now), to: endOfMonth(now) });
        } else if (preset === 'last_month') {
            const lastMonth = subDays(startOfMonth(now), 1);
            setDateRange({ from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) });
        } else if (preset === 'last_7_days') {
            setDateRange({ from: subDays(now, 6), to: now });
        } else if (preset === 'last_30_days') {
            setDateRange({ from: subDays(now, 29), to: now });
        }
    }
    
    // Memoize filtered data based on selections
    const { filteredDevices, deviceReadings, previousPeriodReadings, consumptionData, totalConsumption, previousTotalConsumption } = React.useMemo(() => {
        if (!selectedObjectId || !dateRange?.from || !dateRange?.to) {
            return { filteredDevices: [], deviceReadings: new Map(), previousPeriodReadings: new Map(), consumptionData: [], totalConsumption: 0, previousTotalConsumption: 0 };
        }
        
        const objectIdNum = parseInt(selectedObjectId, 10);
        const filteredDevices = allDevices.filter(d => d.objectId === objectIdNum);
        
        const periodLength = differenceInDays(dateRange.to, dateRange.from);
        const previousPeriodFrom = subDays(dateRange.from, periodLength + 1);
        const previousPeriodTo = subDays(dateRange.to, periodLength + 1);

        const deviceReadings = new Map<number, Reading[]>();
        const previousPeriodReadings = new Map<number, Reading[]>();

        let totalConsumption = 0;
        let previousTotalConsumption = 0;

        filteredDevices.forEach(device => {
            const readings = allReadings.filter(r => r.device_id === device.id);
            const getConsumption = (reading: Reading) => device.type === 'heat' ? reading.energy || 0 : reading.in1 || 0;
            
            const firstReading = readings.length > 0 ? readings[0] : null;

            const inPeriod = readings.filter(r => {
                const time = new Date(r.time);
                return time >= dateRange.from! && time <= dateRange.to!;
            });
            deviceReadings.set(device.id, inPeriod);

            const inPrevPeriod = readings.filter(r => {
                const time = new Date(r.time);
                return time >= previousPeriodFrom && time <= previousPeriodTo;
            });
            previousPeriodReadings.set(device.id, inPrevPeriod);


            const firstInPeriod = inPeriod[0] ? getConsumption(inPeriod[0]) : 0;
            const lastInPeriod = inPeriod.length > 0 ? getConsumption(inPeriod[inPeriod.length - 1]) : 0;
            if(lastInPeriod > firstInPeriod) totalConsumption += (lastInPeriod - firstInPeriod);

            const firstInPrevPeriod = inPrevPeriod[0] ? getConsumption(inPrevPeriod[0]) : 0;
            const lastInPrevPeriod = inPrevPeriod.length > 0 ? getConsumption(inPrevPeriod[inPrevPeriod.length - 1]) : 0;
            if(lastInPrevPeriod > firstInPrevPeriod) previousTotalConsumption += (lastInPrevPeriod - firstInPrevPeriod);
        });

        const dailyConsumptionData: { [key: string]: number } = {};

        deviceReadings.forEach((readings, deviceId) => {
            const device = filteredDevices.find(d => d.id === deviceId);
            if (!device) return;
            const getConsumption = (reading: Reading) => device.type === 'heat' ? reading.energy || 0 : reading.in1 || 0;

            for (let i = 0; i < readings.length -1; i++) {
                const day = format(new Date(readings[i].time), 'yyyy-MM-dd');
                const consumption = getConsumption(readings[i+1]) - getConsumption(readings[i]);
                if (consumption > 0) {
                    dailyConsumptionData[day] = (dailyConsumptionData[day] || 0) + consumption;
                }
            }
        });

        const consumptionData = Object.entries(dailyConsumptionData).map(([date, consumption]) => ({
            date: date,
            consumption: parseFloat(consumption.toFixed(2))
        })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());


        return { filteredDevices, deviceReadings, previousPeriodReadings, consumptionData, totalConsumption, previousTotalConsumption };

    }, [selectedObjectId, dateRange, allDevices, allReadings]);

    const handleExport = () => {
        if (consumptionData.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Нет данных для экспорта',
                description: 'Пожалуйста, выберите другой период или объект.'
            });
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "date,consumption\r\n"; // Header
        consumptionData.forEach(row => {
            csvContent += `${row.date},${row.consumption}\r\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `report_${selectedObjectId}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: 'Экспорт успешно завершен',
            description: 'Файл отчета был скачан.'
        });
    }

    const unit = filteredDevices[0]?.type === 'heat' ? filteredDevices[0]?.unit_energy : filteredDevices[0]?.unit_volume;

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
                     <Select value={selectedObjectId} onValueChange={setSelectedObjectId}>
                        <SelectTrigger className="w-full md:w-[250px]">
                            <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                        <SelectContent>
                            {objects.map((obj) => (
                                <SelectItem key={obj.id} value={String(obj.id)}>
                                    {obj.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <Select onValueChange={(value: TimePreset) => handlePresetChange(value)}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Быстрый выбор" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="current_month">Текущий месяц</SelectItem>
                            <SelectItem value="last_month">Прошлый месяц</SelectItem>
                            <SelectItem value="last_7_days">Последние 7 дней</SelectItem>
                            <SelectItem value="last_30_days">Последние 30 дней</SelectItem>
                        </SelectContent>
                    </Select>
                     <DateRangePicker 
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        className="w-full md:w-auto"
                    />
                     <Button onClick={handleExport} variant="outline" className="ml-auto w-full md:w-auto">
                        <Download className="mr-2 h-4 w-4" />
                        Экспорт (CSV)
                    </Button>
                </CardContent>
            </Card>

            <AnalyticsSummary 
                totalConsumption={totalConsumption}
                previousTotalConsumption={previousTotalConsumption}
                dateRange={dateRange}
                unit={unit}
            />

            <ConsumptionChart data={consumptionData} unit={unit} />

            <DevicesConsumptionTable devices={filteredDevices} deviceReadings={deviceReadings} />
        </div>
    )
}
