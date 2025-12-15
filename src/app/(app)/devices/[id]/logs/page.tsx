import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DeviceLogsPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const device = getDeviceById(deviceId);
  const readings = getReadingsForDevice(deviceId).reverse(); // Newest first

  if (!device) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Сырые данные (логи) устройства</CardTitle>
          <CardDescription>
            Отображены последние 100 записей для устройства <strong>{device.serial_number}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60svh] w-full rounded-md border bg-muted/20 p-4">
            <div className="space-y-2">
              {readings.slice(0, 100).map((reading, index) => (
                <pre key={index} className="text-xs">
                  {JSON.stringify(reading, null, 2)}
                </pre>
              ))}
              {readings.length === 0 && (
                <p className="text-sm text-muted-foreground">Нет данных для отображения.</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
