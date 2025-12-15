import { getObjectsTree } from "@/lib/data";
import { ObjectsTree } from "@/components/objects/objects-tree";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ObjectsPage() {
  const objects = getObjectsTree();

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Объекты</h1>
       <ObjectsTree data={objects} />
    </div>
  );
}
