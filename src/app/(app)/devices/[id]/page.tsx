import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DeviceInfo } from '@/components/device-detail/device-info';
import { ReadingsCharts } from '@/components/device-detail/readings-charts';
import { DeviceReadings } from '@/components/device-detail/device-readings';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const device = getDeviceById(deviceId);
  const readings = getReadingsForDevice(deviceId);

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">{device.object_name}</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <DeviceInfo device={device} />
        </div>
        <div className="lg:col-span-2">
          <ReadingsCharts device={device} readings={readings} />
        </div>
      </div>
      <DeviceReadings device={device} readings={readings} />
    </div>
  );
}
