import { Button, Card, CardContent, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from "@store/ui";
import { ArrowLeft, Loader2 } from "@store/ui/icons";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category name must be at least 1 characters.",
    })
    .max(32, {
      message: "Category name must not be longer than 32 characters.",
    }),
  sectionId: z.string().uuid(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

export default function NewSection() {
  const { t } = useTranslation('common')
  const { toast } = useToast()
  const router = useRouter();

  const utils = api.useContext();

  const {data: sections, isLoading: isSectionsLoading, isError: isSectionsError} = api.section.list.useQuery({
    limit: 10
  })

  const {mutateAsync, isError, isLoading} = api.category.create.useMutation({
    async onSuccess() {
      await utils.category.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось создать категорию",
      })
    }
  })

  const defaultValues: Partial<CategoryFormValues> = {
    name: "",
    sectionId: sections?.items[0]?.id
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: CategoryFormValues) {
    try {
      await mutateAsync({
        name: data.name,
        sectionId: data.sectionId
      })

      if(!isLoading && !isError) {
        router.push('/categories');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно добавили категорию: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add category');
    }
  }

  return isSectionsLoading ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/categories">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('add')} {t('category_2')}
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <Card className="col-span-4">
                <CardContent className="grid gap-6 p-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="sectionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('section-capitalized')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={sections?.items[0]?.id ?? field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a section to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sections?.items.map(section => (
                                <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название</FormLabel>
                          <FormControl>
                            <Input placeholder="Аккаунты" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-4 flex justify-end">
                <Button variant="outline" type="submit">
                  {!isLoading ? t('add') : <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export async function getStaticProps({ locale } : { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}
