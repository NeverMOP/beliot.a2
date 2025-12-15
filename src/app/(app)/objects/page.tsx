import { objects } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/objects/columns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ObjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Объекты</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
           <DataTable columns={columns} data={objects} />
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Карта объектов</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video w-full">
                        <Image 
                            src="https://picsum.photos/seed/map/1200/800" 
                            alt="Карта объектов" 
                            fill
                            className="rounded-md object-cover"
                            data-ai-hint="world map"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
