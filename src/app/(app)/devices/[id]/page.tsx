import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DeviceInfo } from '@/components/device-detail/device-info';
import { DeviceReadings } from '@/components/device-detail/device-readings';
import { Suspense } from 'react';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const device = getDeviceById(deviceId);
  const readings = getReadingsForDevice(deviceId);

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Загрузка...</div>}>
         <DeviceReadings device={device} readings={readings} />
      </Suspense>
    </div>
  );
}
