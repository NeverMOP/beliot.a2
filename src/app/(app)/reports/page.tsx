import { ReportForm } from '@/components/reports/report-form';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Отчеты</h1>
        <p className="text-muted-foreground">
          Сформируйте отчеты по объектам и устройствам за выбранный период.
        </p>
      </div>
      <ReportForm />
    </div>
  );
}
