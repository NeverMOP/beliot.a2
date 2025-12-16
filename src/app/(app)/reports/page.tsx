import { ReportForm } from '@/components/reports/report-form';
import { getAllObjects } from '@/lib/data';
import { Suspense } from 'react';

export default async function ReportsPage() {
  const objects = await getAllObjects();
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Сформируйте отчеты по объектам и устройствам за выбранный период.
      </p>
      <Suspense fallback={<div>Загрузка формы...</div>}>
        <ReportForm objects={objects} />
      </Suspense>
    </div>
  );
}
