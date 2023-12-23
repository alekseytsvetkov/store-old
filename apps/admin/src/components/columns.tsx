'use client';

import { type ColumnDef } from '@tanstack/react-table';

import {
  type Category,
  type Subcategory,
  type User,
  categorySchema,
  subcategorySchema,
} from './data/schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Checkbox, useToast } from '@store/ui';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';

export const usersColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue('name')}</div>,
  },
];

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Actions" />
      </div>
    ),
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();

      const category = categorySchema.parse(row.original);

      const { mutateAsync, isError, isLoading } = api.subcategory.delete.useMutation({
        async onSuccess() {
          await utils.subcategory.list.invalidate();
        },
        onError() {
          toast({
            title: 'К сожалению не удалось удалить категорию',
          });
        },
      });

      const utils = api.useUtils();

      const handleEdit = async () => {
        router.push(`/categories/edit/${category.id}`);
      };

      const handleDelete = async () => {
        router.reload(); // TODO: idc why invalidate not working
        const result = await mutateAsync({ id: category.id });

        if (result && !isError && !isLoading) {
          toast({
            title: 'Поздравляем!',
            description: `Вы успешно удалили категорию: ${category.name}`,
          });
        }
      };

      return (
        <div className="flex justify-end">
          <DataTableRowActions handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];

export const subcategoriesColumns: ColumnDef<Subcategory>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.original.category.name}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue('name')}</div>,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Actions" />
      </div>
    ),
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();

      const subcategory = subcategorySchema.parse(row.original);

      const { mutateAsync, isError, isLoading } = api.subcategory.delete.useMutation({
        async onSuccess() {
          await utils.subcategory.list.invalidate();
        },
        onError() {
          toast({
            title: 'К сожалению не удалось удалить подкатегорию',
          });
        },
      });

      const utils = api.useUtils();

      const handleEdit = async () => {
        router.push(`/subcategories/edit/${subcategory.id}`);
      };

      const handleDelete = async () => {
        router.reload(); // TODO: idc why invalidate not working
        const result = await mutateAsync({ id: subcategory.id });

        if (result && !isError && !isLoading) {
          toast({
            title: 'Поздравляем!',
            description: `Вы успешно удалили подкатегорию: ${subcategory.name}`,
          });
        }
      };

      return (
        <div className="flex justify-end">
          <DataTableRowActions handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
