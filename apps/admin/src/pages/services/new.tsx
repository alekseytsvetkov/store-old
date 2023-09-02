import { Button, Card, CardContent, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from "@store/ui";
import { ArrowLeft } from "@store/ui/icons";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const serviceFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Service name must be at least 1 characters.",
    })
    .max(32, {
      message: "Service name must not be longer than 32 characters.",
    }),
})

type ServiceFormValues = z.infer<typeof serviceFormSchema>

const defaultValues: Partial<ServiceFormValues> = {
  name: "",
}

export default function NewService() {
  const { t } = useTranslation('common')
  const { toast } = useToast()
  const router = useRouter();

  const { data, mutate, error } = api.service.add.useMutation()

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ServiceFormValues) {
    mutate({
      name: data.name
    })

    if(!error) {
      router.push('/services');

      toast({
        title: "Поздравляем!",
        description: `Вы успешно добавили сервис: ${data.name}`
      })
    }
  }

  console.log("data after mutate", data)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/services">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('add')} {t('service')}
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <Card className="col-span-4">
                <CardContent className="grid gap-6 p-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название</FormLabel>
                          <FormControl>
                            <Input placeholder="Аккаунты" {...field} />
                          </FormControl>
                          <FormDescription>
                            Тут будет описание поля Название
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button variant="outline" type="submit">{t('add')}</Button>
                </CardContent>
              </Card>
              {/* <Card className="col-span-1">
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
              </Card> */}
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}
