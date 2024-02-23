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
  toast,
} from '@store/ui';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { storeRouter } from '@store/api/router';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { Loader2 } from '@store/ui/icons';
import type { z } from 'zod';
import { storeSchema } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from '@store/auth/react';
import { api, catchError } from '@/utils';

type Inputs = z.infer<typeof storeSchema>;

export default function UpdateStorePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isUpdatePendingTransition, startUpdateTransition] = useTransition();
  const [isDeletePendingTransition, startDeleteTransition] = useTransition();
  const { data: session } = useSession();

  console.log({props})

  const {
    data: store,
    isLoading,
    isError,
  } = api.store.byId.useQuery({
    id: props.id,
  });

  const utils = api.useUtils();

  const { mutateAsync: deleteStoreMutation, isLoading: isDeletePending } =
    api.store.delete.useMutation({
      async onSuccess() {
        await utils.store.list.invalidate();
        router.push('/dashboard/stores');
      },
    });

  const { mutateAsync: updateStoreMutation, isLoading: isUpdatePending } =
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
        toast({
          title: t('form_update_store_update_success'),
        });
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
        toast({
          title: t('form_update_store_delete_success'),
        });
      } catch (err) {
        catchError(err);
      }
    });
  }, []);

  useEffect(() => {
    form.reset({ name: store?.name, description: store?.description ?? '' });
  }, [store]);

  return (
    <DashboardLayout title={t('store')} description={t('manage_your_store')}>
      <StoreLayout storeId={props.id}>
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
                    <Button disabled={isUpdatePending} type="submit">
                      {isUpdatePending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      )}
                      {t('update_store')}
                      <span className="sr-only">{t('update_store')}</span>
                    </Button>
                    <Button
                      disabled={isDeletePending}
                      onClick={deleteStore}
                      variant="destructive"
                      type="button"
                    >
                      {isDeletePending && (
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
  const id = context.params?.id || null;
  id && await helpers.byId.prefetch({ id });

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
