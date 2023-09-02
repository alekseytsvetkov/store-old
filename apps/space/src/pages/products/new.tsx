import { Card, CardContent, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@store/ui";
import { ArrowLeft } from "@store/ui/icons";
import Link from "next/link";

export default function NewProduct() {
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-2 col-span-4 flex justify-between flex-col">
        <div className="space-y-1 flex flex-row items-center mb-6">
          <Link href="/products">
            <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
              <ArrowLeft className="h-5 w-5" />
            </div>
          </Link>
          <h2 className="text-lg font-semibold tracking-tight">
            Добавить товар
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <Card className="col-span-3">
            <CardContent className="grid gap-6 p-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Название</Label>
                <Input id="name" placeholder="Адена..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Какой-то информативный текст"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardContent className="grid gap-6 p-6">
              <div className="grid gap-2">
              <Label htmlFor="area">Статус</Label>
              <Select defaultValue="active">
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активен</SelectItem>
                  <SelectItem value="draft">Черновик</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
