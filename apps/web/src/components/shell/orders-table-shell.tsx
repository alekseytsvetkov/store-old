'use client';

import * as React from 'react';
import Link from 'next/link';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { formatDate, formatId, formatPrice } from '@/utils';
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@store/ui';
import { cn } from '@store/ui/cn';

// TODO: type later
// type AwaitedOrder = Pick<Order, 'id' | 'quantity' | 'amount' | 'createdAt'> & {
//   customer: string | null;
//   status: string;
//   paymentIntentId: string;
// };

interface OrdersTableShellProps {
  transaction: Promise<{
    // TODO: type later
    // items: AwaitedOrder[];
    items: any[];
    count: number;
  }>;
  limit: number;
  storeId: string;
  isSearchable?: boolean;
}

export function OrdersTableShell({
  transaction,
  limit,
  storeId,
  isSearchable = true,
}: OrdersTableShellProps) {
  const { items: data, count } = React.use(transaction);

  const pageCount = Math.ceil(count / limit);

  // Memoize the columns so they don't re-render on every render
  // TODO: type later
  // const columns = React.useMemo<ColumnDef<AwaitedOrder, unknown>[]>(
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
    () => [
      {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Order ID" />,
        cell: ({ cell }) => {
          return <span>{formatId(Number(cell.getValue()))}</span>;
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Payment Status" />,
        cell: ({ cell }) => {
          return (
            <Badge
              variant="outline"
              className={cn('pointer-events-none text-sm capitalize text-white')}
            >
              {String(cell.getValue())}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'customer',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
      },
      {
        accessorKey: 'quantity',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Quantity" />,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => (
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
                <Link href={`/dashboard/stores/${storeId}/orders/${row.original.id}`}>
                  View details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`https://dashboard.stripe.com/test/payments/${row.original.paymentIntentId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Stripe
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [storeId],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={
        isSearchable
          ? [
              {
                id: 'customer',
                title: 'customers',
              },
            ]
          : []
      }
      filterableColumns={[
        // @ts-ignore
        // TODO: type later
        {
          id: 'status',
          title: 'Status',
        },
      ]}
    />
  );
}
