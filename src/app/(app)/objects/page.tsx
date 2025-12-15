import { objects } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/objects/columns";

export default function ObjectsPage() {
  return (
    <div className="space-y-6">
       <h1 className="font-headline text-3xl font-bold tracking-tight">Объекты</h1>
       <DataTable columns={columns} data={objects} />
    </div>
  );
}
