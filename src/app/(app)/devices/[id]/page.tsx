import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { DeviceReadings } from '@/components/device-detail/device-readings';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


function DeviceDetailSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-[350px]" />
                    <Skeleton className="h-[180px]" />
                </div>
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-[300px]" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                    <Skeleton className="h-[550px]" />
                </div>
            </div>
             <Skeleton className="h-[400px]" />
        </div>
    )
}

export default async function DeviceDetailPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const device = await getDeviceById(deviceId);
  
  if (!device) {
    notFound();
  }
  
  const readings = await getReadingsForDevice(deviceId);

  return (
    <Suspense fallback={<DeviceDetailSkeleton />}>
        <DeviceReadings device={device} readings={readings} />
    </Suspense>
  );
}
