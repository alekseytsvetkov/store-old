import { Button, Card, CardContent, Form, FormControl,  FormField, FormItem, FormLabel, FormMessage, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from "@store/ui";
import { ArrowLeft, Loader2 } from "@store/ui/icons";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const productFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Product name must be at least 1 characters.",
    })
    .max(32, {
      message: "Product name must not be longer than 32 characters.",
    }),
  sectionId: z.string().uuid(),
  categoryId: z.string().uuid(),
})

type ProductFormValues = z.infer<typeof productFormSchema>

export default function NewProduct() {
  const { t } = useTranslation('common')
  const { toast } = useToast()
  const router = useRouter();

  const utils = api.useContext();

  const {data: sections, isLoading: isSectionsLoading, isError: isSectionsError} = api.section.list.useQuery({
    limit: 10
  })

  const defaultValues: Partial<ProductFormValues> = {
    name: "",
    sectionId: sections?.items[0]?.id,
    categoryId: sections?.items[0]?.categories[0]?.id
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const {data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError} = api.category.bySectionId.useQuery({
    sectionId: form.getValues().sectionId
  })

  const {mutateAsync, isError, isLoading, error} = api.product.create.useMutation({
    async onSuccess() {
      await utils.product.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось создать продукт",
      })
    }
  })

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [form.watch])

  async function onSubmit(data: ProductFormValues) {
    try {
      await mutateAsync({
        name: data.name,
        categoryId: data.categoryId
      })

      if(!isLoading && !isError) {
        router.push('/products');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно добавили товар: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add product');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/products">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('add')} {t('product')}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('category-capitalized')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a section to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map(category => (
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
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
                            <Input placeholder="Пример названия товара" {...field} />
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
