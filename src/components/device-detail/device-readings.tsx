
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
import { Button } from "../ui/button";

export function DeviceReadings({
  device,
  readings,
}: {
  device: Device;
  readings: Reading[];
}) {
  const initialDateRange = {
    from: subDays(new Date(), 7),
    to: new Date(),
  };

  // State for the date picker component itself
  const [date, setDate] = React.useState<DateRange | undefined>(initialDateRange);
  
  // State for the applied filter, which controls the charts and table
  const [appliedDateRange, setAppliedDateRange] = React.useState<DateRange | undefined>(initialDateRange);

  const handleApplyFilter = () => {
    setAppliedDateRange(date);
  };

  const filteredReadings = React.useMemo(() => {
    if (!appliedDateRange?.from) {
        return []; // Return empty if no range is applied
    }
    // Ensure 'to' date includes the entire day
    const fromDate = appliedDateRange.from;
    const toDate = new Date(appliedDateRange.to || appliedDateRange.from);
    toDate.setHours(23, 59, 59, 999); 

    return readings.filter(reading => {
        const readingDate = new Date(reading.time);
        return readingDate >= fromDate && readingDate <= toDate;
    });
  }, [readings, appliedDateRange]);


  const columns = readingsColumns(device);
  return (
    <>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
                <DeviceInfo device={device} />
                <DeviceEventInfo device={device} />
            </div>
            <div className="lg:col-span-2 space-y-4">
                 <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <DateRangePicker 
                        dateRange={date} 
                        setDateRange={setDate} 
                        className="w-full sm:w-auto"
                    />
                    <Button onClick={handleApplyFilter}>Применить</Button>
                </div>
                <ReadingsCharts device={device} readings={filteredReadings} />
            </div>
        </div>
        <ReadingsTable 
            columns={columns} 
            data={filteredReadings} 
        />
    </>
  );
}
