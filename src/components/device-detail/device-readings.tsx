
"use client";

import { type Device, type Reading } from "@/lib/types";
import { ReadingsTable } from "@/components/device-detail/readings-table";
import { readingsColumns } from "@/components/device-detail/readings-columns";
import { DeviceInfo } from "./device-info";
import { ReadingsCharts } from "./readings-charts";
import * as React from 'react';
import { DateRangePicker } from "../shared/date-range-picker";
import { type DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DeviceEventInfo } from "./device-event-info";
import { CardHeader, CardTitle } from "../ui/card";

export function DeviceReadings({
  device,
  readings,
}: {
  device: Device;
  readings: Reading[];
}) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  const filteredReadings = React.useMemo(() => {
    if (!dateRange?.from) { // Only 'from' is needed to start filtering
        return readings;
    }
    const fromDate = dateRange.from;
    // If only 'from' is selected, 'to' is the same day.
    const toDate = new Date(dateRange.to || dateRange.from);
    toDate.setHours(23, 59, 59, 999); // Set to the end of the day

    return readings.filter(reading => {
        const readingDate = new Date(reading.time);
        return readingDate >= fromDate && readingDate <= toDate;
    });
  }, [readings, dateRange]);


  const columns = readingsColumns(device);
  return (
    <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                <DeviceInfo device={device} />
                <DeviceEventInfo device={device} />
            </div>
            <div className="lg:col-span-2 space-y-4">
                 <DateRangePicker 
                    dateRange={dateRange} 
                    setDateRange={setDateRange} 
                    className="w-full sm:w-auto"
                />
                <ReadingsCharts device={device} readings={filteredReadings} />
            </div>
        </div>
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                 <div className="pb-4 sm:pb-0">
                     <h3 className="text-lg font-semibold leading-none tracking-tight">История показаний</h3>
                     <p className="text-sm text-muted-foreground pt-1">Выберите период для просмотра данных в таблице.</p>
                 </div>
                 <DateRangePicker
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    className="w-full sm:w-auto"
                 />
            </div>
            <ReadingsTable columns={columns} data={filteredReadings} />
        </div>
    </>
  );
}
