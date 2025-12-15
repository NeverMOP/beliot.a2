'use client';

import { useMemo, useState } from 'react';
import DataGrid, {
  type Column,
  type RenderRowProps,
  type RowsChangeData,
} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { type BeliotObject } from '@/lib/types';
import { MoreHorizontal, ChevronRight, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

type Row = BeliotObject & {
  children?: Row[];
};

function rowKeyGetter(row: Row) {
  return row.id;
}

function TreeViewCell({
  row,
  isExpanded,
  onRowExpand,
}: Pick<RenderRowProps<Row>, 'row' | 'isExpanded'> & {
  onRowExpand: () => void;
}) {
  const Icon = isExpanded ? ChevronDown : ChevronRight;
  const hasChildren = row.children && row.children.length > 0;

  return (
    <div
      style={{ marginLeft: row.parentId ? 24 : 0 }}
      className="flex items-center gap-2"
    >
      {hasChildren && (
        <button onClick={onRowExpand} className="flex items-center gap-1">
          <Icon className="h-4 w-4" />
        </button>
      )}
      {!hasChildren && <div className="w-6" />}
      <span>{row.name}</span>
    </div>
  );
}

const columns: readonly Column<Row>[] = [
  {
    key: 'name',
    name: 'Название',
    renderCell(props) {
      return (
        <TreeViewCell
          {...props}
          onRowExpand={() => props.onRowExpand(true)}
        />
      );
    },
  },
  { key: 'address', name: 'Адрес' },
  { key: 'deviceCount', name: 'Кол-во устройств' },
  {
    key: 'actions',
    name: '',
    renderCell({ row }) {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem>Посмотреть детали</DropdownMenuItem>
              <DropdownMenuItem>Редактировать</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    width: 40,
  },
];

export function ObjectsTree({ data }: { data: Row[] }) {
  const [rows, setRows] = useState(data);
  const [expandedRows, setExpandedRows] = useState(
    () => new Set(data.map((r) => r.id))
  );

  const gridRows = useMemo((): readonly Row[] => {
    function getGroupRows(rows: readonly Row[]): readonly Row[] {
      const groupRows: Row[] = [];
      for (const row of rows) {
        groupRows.push(row);
        if (row.children && expandedRows.has(row.id)) {
          groupRows.push(...getGroupRows(row.children));
        }
      }
      return groupRows;
    }
    return getGroupRows(rows);
  }, [rows, expandedRows]);

  function onRowsChange(
    rows: readonly Row[],
    { indexes, column }: RowsChangeData<Row>
  ) {
    const newRows = [...rows];
    // Not implemented for this example
    setRows(newRows);
  }

  function onRowExpand(row: Row) {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(row.id)) {
      newExpandedRows.delete(row.id);
    } else {
      newExpandedRows.add(row.id);
    }
    setExpandedRows(newExpandedRows);
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <DataGrid
        columns={columns}
        rows={gridRows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={onRowsChange}
        className="rdg-light"
        rowHeight={48}
        headerRowHeight={48}
        renderers={{
          renderRow(key, props) {
            return (
              <div
                onClick={() => {
                  if (props.row.children && props.row.children.length > 0) {
                    onRowExpand(props.row);
                  }
                }}
              >
                {props.renderRow(props)}
              </div>
            );
          },
        }}
      />
    </div>
  );
}
