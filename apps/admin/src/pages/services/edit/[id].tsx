import { Button, Card, CardContent, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useToast } from "@store/ui";
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
import { serviceRouter } from "@store/api/router";
import superjson from 'superjson';
import { useEffect, useMemo, useState } from "react";

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



export default function EditService(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { toast } = useToast()

  const router = useRouter();

  const utils = api.useContext();

  const { id } = props;

  const {data, isLoading, isError} = api.service.byId.useQuery({
    id
  })

  const {mutateAsync, isLoading: isUpdateLoading} = api.service.update.useMutation({
    async onSuccess() {
      await utils.service.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось обновить сервис",
      })
    }
  })

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: useMemo(() => {
      return {
        name: data?.name
      }
    }, [data]),
    mode: "onChange",
  })

  useEffect(() => {
    form.reset(data);
  }, [data]);

  async function onSubmit(data: ServiceFormValues) {
    try {
      await mutateAsync({
        id,
        name: data.name,
      })

      if(!isLoading && !isError) {
        router.push('/services');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно обновили сервис: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add service');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/services">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('update')} {t('service')}{data?.name && `: ${data.name}`}
              </h2>
            </div>
            {isError ? <div>{t('not-found')}</div> : isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <div className="grid grid-cols-4 gap-6">
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
                <Button variant="outline" type="submit">
                  {!isUpdateLoading ? t('update') : <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
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
          </div>}
        </div>
      </form>
    </Form>
  )
}

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  const helpers = createServerSideHelpers({
    router: serviceRouter,
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
