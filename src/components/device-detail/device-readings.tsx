"use client";

import { type Device, type Reading } from "@/lib/types";
import { ReadingsTable } from "@/components/device-detail/readings-table";
import { readingsColumns } from "@/components/device-detail/readings-columns";

export function DeviceReadings({
  device,
  readings,
}: {
  device: Device;
  readings: Reading[];
}) {
  const columns = readingsColumns(device);
  return <ReadingsTable columns={columns} data={readings} />;
}
