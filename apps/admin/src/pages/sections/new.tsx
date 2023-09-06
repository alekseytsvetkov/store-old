import { Button, Card, CardContent, Form, FormControl,  FormField, FormItem, FormLabel, FormMessage, Input, useToast } from "@store/ui";
import { ArrowLeft, Loader2 } from "@store/ui/icons";
import Link from "next/link";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/utils/api";
import { useRouter } from "next/router";

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

const defaultValues: Partial<SectionFormValues> = {
  name: "",
}

export default function NewSection() {
  const { t } = useTranslation('common')
  const { toast } = useToast()
  const router = useRouter();

  const utils = api.useContext();

  const {mutateAsync, isError, isLoading, error} = api.section.create.useMutation({
    async onSuccess() {
      await utils.section.list.invalidate()
    },
    onError() {
      toast({
        title: "К сожалению не удалось создать секцию",
      })
    }
  })

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: SectionFormValues) {
    try {
      await mutateAsync({
        name: data.name
      })

      if(!isLoading && !isError) {
        router.push('/sections');

        return toast({
          title: "Поздравляем!",
          description: `Вы успешно добавили секцию: ${data.name}`
        })
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add section');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-start-2 col-span-4 flex justify-between flex-col">
            <div className="space-y-1 flex flex-row items-center mb-6">
              <Link href="/sections">
                <div className="mr-2 mt-1 p-1 hover:bg-accent rounded-md">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('add')} {t('section_2')}
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
