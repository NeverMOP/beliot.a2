import { CatalogCard } from '@/components/catalogs/catalog-card';
import { deviceModels, channelTypes, gatewayModels } from '@/lib/catalogs';

export default function CatalogsPage() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Здесь вы сможете управлять списками моделей, типов каналов и другими параметрами системы.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CatalogCard
          title="Модели устройств"
          description="Управление списком доступных моделей устройств."
          items={deviceModels}
          itemName="модель"
          dialogTitle="Добавить новую модель"
          dialogDescription="Введите название новой модели устройства."
          dialogInputPlaceholder="например, UltraHeat-3000"
        />
         <CatalogCard
          title="Модели шлюзов"
          description="Управление списком доступных моделей шлюзов."
          items={gatewayModels}
          itemName="модель шлюза"
          dialogTitle="Добавить новую модель шлюза"
          dialogDescription="Введите название новой модели шлюза."
          dialogInputPlaceholder="например, Beliot Gateway v3"
        />
        <CatalogCard
          title="Типы каналов связи"
          description="Управление списком доступных типов каналов."
          items={channelTypes}
          itemName="тип канала"
          dialogTitle="Добавить новый тип канала"
          dialogDescription="Введите название нового типа канала связи."
          dialogInputPlaceholder="например, gsm"
        />
      </div>
    </div>
  );
}
