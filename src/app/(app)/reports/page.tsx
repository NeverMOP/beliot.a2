import { AnalyticsDashboard } from '@/components/reports/analytics-dashboard';
import { getAllObjects, getDevices, getReadingsForDevice } from '@/lib/data';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AnalyticsPageSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
             <Skeleton className="h-[400px]" />
             <Skeleton className="h-[300px]" />
        </div>
    )
}

// We fetch all necessary data here on the server
async function ReportsPageContent() {
  // In a real app, you might want to fetch this data based on user permissions or initial filters.
  // For now, we fetch everything needed for the dashboard to function.
  const allObjects = await getAllObjects();
  const allDevices = await getDevices();
  
  // For mock data, we fetch all readings. In a real app, this should be done
  // dynamically on the backend based on selected object and date range.
  const allReadingsPromises = allDevices.map(d => getReadingsForDevice(d.id));
  const allReadingsArrays = await Promise.all(allReadingsPromises);
  const allReadings = allReadingsArrays.flat();


  return <AnalyticsDashboard 
            objects={allObjects} 
            devices={allDevices} 
            readings={allReadings}
        />;
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
       <div className="space-y-2">
         <h1 className="text-3xl font-bold tracking-tight">Аналитика и отчеты</h1>
         <p className="text-muted-foreground">
            Анализируйте данные о потреблении и формируйте отчеты по объектам.
         </p>
       </div>
      <Suspense fallback={<AnalyticsPageSkeleton />}>
        <ReportsPageContent />
      </Suspense>
    </div>
  );
}
