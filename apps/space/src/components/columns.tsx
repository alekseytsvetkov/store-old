"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { type Product, productSchema } from "./data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox, useToast } from "@store/ui"
import { useRouter } from "next/router"
import { api } from "@/utils/api"

export const productsColumns: ColumnDef<Product>[] = [
  {
    id: "select",
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="flex space-x-2">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Actions" />
      </div>
    ),
    cell: ({ row }) => {
      const { toast } = useToast()
      const router = useRouter()

      const product = productSchema.parse(row.original)

      const {mutateAsync, isError, isLoading} = api.product.delete.useMutation({
        async onSuccess() {
          await utils.product.list.invalidate()
        },
        onError() {
          toast({
            title: "К сожалению не удалось удалить товар",
          })
        }
      })

      const utils = api.useContext();

      const handleEdit = async () => {
        router.push(`/products/edit/${product.id}`)
      }

      const handleDelete = async () => {
        router.reload(); // TODO: idc why invalidate not working
        const result = await mutateAsync({id: product.id})

        if(result && !isError && !isLoading) {
          toast({
            title: "Поздравляем!",
            description: `Вы успешно удалили товар: ${product.name}`
          })
        }
      }

      return <div className="flex justify-end">
        <DataTableRowActions handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    }
  },
]
