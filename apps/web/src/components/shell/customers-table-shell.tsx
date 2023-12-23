'use client';

import * as React from 'react';
import Link from 'next/link';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';

import { DataTable, DataTableColumnHeader } from '@/components';
import { formatPrice, formatDate } from '@/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@store/ui';
import { useMemo } from 'react';
import type { User } from '@store/db/types';

interface CustomersTableShellProps {
  customers: User[];
  storeId: string;
}

export function CustomersTableShell({ customers, storeId }: CustomersTableShellProps) {
  // const pageCount = Math.ceil(count / limit);

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      },
      {
        accessorKey: 'totalSpent',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Spent" />,
        cell: ({ cell }) =>
          formatPrice(cell.getValue() as number, {
            notation: 'standard',
          }),
      },
      {
        accessorKey: 'orderPlaced',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order Placed" />,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const slug = row.original.email
            ?.replace('@', `-${Math.random().toString(36).substring(2, 10)}-`)
            .replace('.com', '');

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
                >
                  <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/stores/${storeId}/customers/${slug}`}>View orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [storeId],
  );

  return (
    <DataTable
      columns={columns}
      data={customers}
      // pageCount={pageCount}
      searchableColumns={[
        {
          id: 'email',
          title: 'emails',
        },
      ]}
    />
  );
}
