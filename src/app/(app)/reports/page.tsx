import { ReportForm } from '@/components/reports/report-form';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Сформируйте отчеты по объектам и устройствам за выбранный период.
      </p>
      <ReportForm />
    </div>
  );
}
