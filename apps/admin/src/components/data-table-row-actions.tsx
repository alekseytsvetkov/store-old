"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type Row } from "@tanstack/react-table"
import { sectionSchema } from "./data/schema"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger, useToast } from "@store/ui"
import { api } from "@/utils/api"
import { useRouter } from "next/router"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const section = sectionSchema.parse(row.original)

  const { toast } = useToast()
  const router = useRouter();
  const {mutateAsync, isError, isLoading} = api.section.delete.useMutation({
    async onSuccess() {
      await utils.section.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось удалить секцию",
      })
    }
  })

  const utils = api.useContext();

  const handleEdit = async () => {
    router.push(`/sections/edit/${section.id}`)
  }

  const handleDelete = async () => {
    router.reload(); // TODO: idc why invalidate not working
    const result = await mutateAsync({id: section.id})

    if(result && !isError && !isLoading) {
      toast({
        title: "Поздравляем!",
        description: `Вы успешно удалили секцию: ${section.name}`
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
