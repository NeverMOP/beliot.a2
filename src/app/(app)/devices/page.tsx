import { devices } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/devices/columns";
import { CreateDeviceForm } from "@/components/devices/create-device-form";

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Устройства</h1>
        <CreateDeviceForm />
      </div>
       <DataTable columns={columns} data={devices} />
    </div>
  );
}
