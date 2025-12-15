'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { devices } from '@/lib/data';

const pathTranslations: { [key: string]: string } = {
  dashboard: 'Дашборд',
  devices: 'Устройства',
  objects: 'Объекты',
  catalogs: 'Справочники',
  reports: 'Отчеты',
  users: 'Пользователи',
  gateways: 'Шлюзы'
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  const getDeviceName = (id: string) => {
    const device = devices.find(d => d.id.toString() === id);
    return device ? device.external_id : id;
  }

  return (
    <nav aria-label="breadcrumb" className="hidden text-secondary-foreground md:flex">
      <ol className="flex items-center gap-1.5 text-sm">
        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          
          let title = pathTranslations[segment] || segment;
          if (segments[index-1] === 'devices' && !isNaN(parseInt(segment))) {
            title = getDeviceName(segment);
          }


          return (
            <Fragment key={href}>
              {index > 0 && <ChevronRight className="h-4 w-4 " />}
              <li>
                <Link
                  href={href}
                  className={
                    isLast
                      ? 'font-medium text-secondary-foreground'
                      : 'text-secondary-foreground/70 hover:text-secondary-foreground'
                  }
                >
                  {title}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
