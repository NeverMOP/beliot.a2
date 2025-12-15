import { users } from "@/lib/data";
import { DataTable } from "@/components/devices/data-table";
import { columns } from "@/components/users/columns";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать пользователя
        </Button>
      </div>
       <DataTable columns={columns} data={users} />
    </div>
  );
}
