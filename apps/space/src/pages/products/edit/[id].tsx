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
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createServerSideHelpers } from '@trpc/react-query/server';
import { productRouter } from "@store/api/router";
import superjson from 'superjson';
import { useEffect, useMemo } from "react";

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

export default function EditProduct(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;

  const { t } = useTranslation('common')
  const { toast } = useToast()

  const router = useRouter();

  const utils = api.useContext();

  const {data: sections, isLoading: isSectionsLoading, isError: isSectionsError} = api.section.list.useQuery({
    limit: 10
  })

  const {data, isLoading, isError} = api.product.byId.useQuery({
    id
  })

  const {mutateAsync, isLoading: isUpdateLoading} = api.product.update.useMutation({
    async onSuccess() {
      await utils.product.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось обновить товар",
      })
    }
  })

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: useMemo(() => {
      return {
        name: data?.name,
        sectionId: data?.category.sectionId,
        categoryId: data?.categoryId
      }
    }, [data]),
    mode: "onChange",
  })

  const sectionId = useMemo(() => form.getValues().sectionId, [])

  console.log({sectionId})

  const categoriesBySectionId = api.category.bySectionId.useQuery({
    sectionId
  }, {
    queryKey: ["category.bySectionId", { sectionId }]
  })

  const {data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError} = categoriesBySectionId;

  useEffect(() => {
    form.reset(data);
  }, [data, sections, categories]);

  async function onSubmit(data: ProductFormValues) {
    try {
      await mutateAsync({
        id,
        name: data.name,
        categoryId: data.categoryId
      })

      if(!isLoading && !isError) {
        router.push('/products');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно обновили товар: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add product');
    }
  }

  console.log("categories", categories)

  return isLoading ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/products">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('update')} {t('product')}{data?.name && `: ${data.name}`}
              </h2>
            </div>
            {isError ? <div>{t('not-found')}</div> : isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <div className="grid grid-cols-4 gap-6">
            <Card className="col-span-4">
              <CardContent className="grid gap-6 p-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="sectionId"
                    render={({ field }) => (
                      isSectionsLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
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
                      ))}
                  />
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      isCategoriesLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
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
                      ))}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input placeholder="Path of Exile" {...field} />
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
                {!isUpdateLoading ? t('update') : <Loader2 className="h-5 w-5 animate-spin" />}
              </Button>
            </div>
          </div>}
        </div>
      </form>
    </Form>
  )
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string, locale: string }>) {
  const helpers = createServerSideHelpers({
    router: productRouter,
    // @ts-ignore
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id as string;
  // prefetch `post.byId`
  await helpers.byId.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      // @ts-ignore
      ...(await serverSideTranslations(context.locale, [
        'common',
      ])),
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
      paths: [],
      fallback: 'blocking'
  }
}
