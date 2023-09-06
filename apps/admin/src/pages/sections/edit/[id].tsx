import { Button, Card, CardContent, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, useToast } from "@store/ui";
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
import { sectionRouter } from "@store/api/router";
import superjson from 'superjson';
import { useEffect, useMemo } from "react";

const sectionFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Section name must be at least 1 characters.",
    })
    .max(32, {
      message: "Section name must not be longer than 32 characters.",
    }),
})

type SectionFormValues = z.infer<typeof sectionFormSchema>

export default function EditSection(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('common')
  const { toast } = useToast()

  const router = useRouter();

  const utils = api.useContext();

  const { id } = props;

  const {data, isLoading, isError} = api.section.byId.useQuery({
    id
  })

  const {mutateAsync, isLoading: isUpdateLoading} = api.section.update.useMutation({
    async onSuccess() {
      await utils.section.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось обновить секцию",
      })
    }
  })

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
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

  async function onSubmit(data: SectionFormValues) {
    try {
      await mutateAsync({
        id,
        name: data.name,
      })

      if(!isLoading && !isError) {
        router.push('/sections');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно обновили секцию: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add section');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/sections">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('update')} {t('section_2')}{data?.name && `: ${data.name}`}
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
    router: sectionRouter,
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
