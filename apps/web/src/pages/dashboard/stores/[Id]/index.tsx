import { DashboardLayout, StoreLayout } from '@/components';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Textarea,
  Input,
  Button,
} from '@store/ui';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { api } from '@/utils/api';
import { storeRouter } from '@store/api/router';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { toast } from 'sonner';
import { Loader2 } from '@store/ui/icons';
import type { z } from 'zod';
import { storeSchema } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { catchError } from '@/utils';
import { useSession } from '@store/auth/react';

type Inputs = z.infer<typeof storeSchema>;

export default function UpdateStorePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const { data: session } = useSession();

  const {
    data: store,
    isLoading,
    isError,
  } = api.store.byId.useQuery({
    id: props.id,
  });

  const utils = api.useContext();

  const { mutateAsync: deleteStoreMutation, isLoading: isDeleteLoading } =
    api.store.delete.useMutation({
      async onSuccess() {
        await utils.store.list.invalidate();
        router.push('/dashboard/stores');
      },
    });

  const { mutateAsync: updateStoreMutation, isLoading: isUpdateLoading } =
    api.store.update.useMutation({
      async onSuccess() {
        await utils.store.list.invalidate();
        router.push('/dashboard/stores');
      },
    });

  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: useMemo(() => {
      return {
        name: store?.name,
        description: store?.description ?? '',
      };
    }, [store]),
    mode: 'onChange',
  });

  function onSubmit(data: Inputs) {
    startUpdateTransition(async () => {
      try {
        const userId = session?.user.id!;
        await updateStoreMutation({ id: props.id, ...data, userId });

        form.reset();
        toast.success(t('form_update_store_update_success'));
      } catch (err) {
        catchError(err);
      }
    });
  }

  const deleteStore = useCallback(() => {
    startDeleteTransition(async () => {
      try {
        await deleteStoreMutation({ id: props.id });

        form.reset();
        toast.success(t('form_update_store_delete_success'));
      } catch (err) {
        catchError(err);
      }
    });
  }, []);

  useEffect(() => {
    form.reset({ name: store?.name, description: store?.description ?? '' });
  }, [store]);

  return (
    <DashboardLayout>
      <section className="grid gap-1">
        <div className="flex space-x-4">
          <h1 className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl">{t('store')}</h1>
        </div>
        <p className="text-muted-foreground max-w-[750px] text-sm sm:text-base">
          {t('manage_your_store')}
        </p>
      </section>
      <StoreLayout>
        <div className="space-y-10">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">{t('update_your_store_title')}</CardTitle>
              <CardDescription>{t('update_your_store_description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-xl gap-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('name')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('input_store_name')}
                            {...field}
                            defaultValue={store?.name}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('description')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('input_store_description')}
                            {...field}
                            defaultValue={store?.description ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="xs:flex-row flex flex-row gap-2">
                    <Button disabled={isUpdateLoading} type="submit">
                      {isUpdateLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      )}
                      {t('update_store')}
                      <span className="sr-only">{t('update_store')}</span>
                    </Button>
                    <Button
                      disabled={isDeleteLoading}
                      onClick={deleteStore}
                      variant="destructive"
                      type="button"
                    >
                      {isDeleteLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      )}
                      {t('delete_store')}
                      <span className="sr-only">{t('delete_store')}</span>
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </StoreLayout>
    </DashboardLayout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string; locale: string }>,
) {
  const helpers = createServerSideHelpers({
    router: storeRouter,
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
