
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
    const toDate = dateRange.to || dateRange.from;

    return readings.filter(reading => {
        const readingDate = new Date(reading.time);
        // Compare dates only, ignoring time part for start and end
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
        <ReadingsTable columns={columns} data={filteredReadings} />
    </>
  );
}
