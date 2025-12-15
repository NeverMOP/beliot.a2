import { devices } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/devices/columns";

export default function DevicesPage() {
  return (
    <div className="space-y-6">
       <h1 className="font-headline text-3xl font-bold tracking-tight">Устройства</h1>
       <DataTable columns={columns} data={devices} />
    </div>
  );
}
