import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@store/ui';
import { ArrowLeft, Loader2 } from '@store/ui/icons';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { categoryRouter } from '@store/api/router';
import superjson from 'superjson';
import { useEffect, useMemo } from 'react';

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Category name must be at least 1 characters.',
    })
    .max(32, {
      message: 'Category name must not be longer than 32 characters.',
    }),
  sectionId: z.string().uuid(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function EditCategory(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { id } = props;

  const { t } = useTranslation('common');
  const { toast } = useToast();

  const router = useRouter();

  const utils = api.useUtils();

  const {
    data: sections,
    isLoading: isSectionsPending,
    isError: isSectionsError,
  } = api.section.list.useQuery({
    limit: 10,
  });

  const { data, isLoading, isError } = api.category.byId.useQuery({
    id,
  });

  const { mutateAsync, isLoading: isUpdatePending } = api.category.update.useMutation({
    async onSuccess() {
      await utils.category.list.invalidate();
    },
    onError() {
      toast({
        title: 'К сожалению не удалось обновить категорию',
      });
    },
  });

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: useMemo(() => {
      return {
        name: data?.name,
        sectionId: data?.sectionId,
      };
    }, [data]),
    mode: 'onChange',
  });

  useEffect(() => {
    form.reset({
      name: data?.name,
      sectionId: data?.sectionId,
    });
  }, [data]);

  async function onSubmit(data: CategoryFormValues) {
    try {
      await mutateAsync({
        id,
        name: data.name,
        sectionId: data.sectionId,
      });

      if (!isLoading && !isError) {
        router.push('/categories');

        return toast({
          title: 'Поздравляем!',
          description: `Вы успешно обновили секцию: ${data.name}`,
        });
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add category');
    }
  }

  return isLoading || isSectionsPending ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col justify-between">
          <div className="mb-6 flex flex-row items-center space-y-1">
            <Link href="/categories">
              <div className="hover:bg-accent mr-2 mt-1 rounded-md p-1">
                <ArrowLeft className="h-5 w-5" />
              </div>
            </Link>
            <h2 className="text-lg font-semibold tracking-tight">
              {t('update')} {t('category_2')}
              {data?.name && `: ${data.name}`}
            </h2>
          </div>
          {isError ? (
            <div>{t('not-found')}</div>
          ) : isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={data.sectionId ?? field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a section to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sections?.items.map((section) => (
                                <SelectItem key={section.id} value={section.id}>
                                  {section.name}
                                </SelectItem>
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
                  {!isUpdatePending ? t('update') : <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; locale: string }>,
) {
  const helpers = createServerSideHelpers({
    router: categoryRouter,
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
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
