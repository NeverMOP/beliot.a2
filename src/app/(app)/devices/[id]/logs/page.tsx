'use client';

import * as React from 'react';
import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

const LOGS_PER_PAGE = 10;
const MAX_LOGS = 100;

export default function DeviceLogsPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  // These are server-side calls initially, but will be re-used on client.
  const device = getDeviceById(deviceId);
  const allReadings = getReadingsForDevice(deviceId).reverse().slice(0, MAX_LOGS);

  const [currentPage, setCurrentPage] = React.useState(1);

  if (!device) {
    // `notFound()` can be called in client components.
    // It will render the nearest not-found.js file.
    notFound();
  }

  const totalPages = Math.ceil(allReadings.length / LOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
  const endIndex = startIndex + LOGS_PER_PAGE;
  const currentLogs = allReadings.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Сырые данные (логи) устройства</CardTitle>
          <CardDescription>
            Отображены последние {MAX_LOGS} записей для устройства <strong>{device.serial_number}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60svh] w-full rounded-md border bg-muted/20 p-4">
            <div className="space-y-2">
              {currentLogs.map((reading, index) => (
                <pre key={startIndex + index} className="text-xs">
                  {JSON.stringify(reading, null, 2)}
                </pre>
              ))}
              {allReadings.length === 0 && (
                <p className="text-sm text-muted-foreground">Нет данных для отображения.</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        {totalPages > 1 && (
            <CardFooter className="flex items-center justify-end space-x-2 pt-4">
                 <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Стр. {currentPage} из {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
