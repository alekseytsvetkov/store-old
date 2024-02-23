import { AddProductForm, DashboardLayout, StoreLayout } from '@/components';
import { storeRouter } from '@store/api/router';
import { useSession } from '@store/auth/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@store/ui';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';

export default function NewProductPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { data: session } = useSession();

  return (
    <DashboardLayout title={t('store')} description={t('manage_your_store')}>
      <StoreLayout storeId={props.id}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Add product</CardTitle>
            <CardDescription>Add a new product to your store</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: fix later */}
            {/* @ts-ignore */}
            <AddProductForm userId={session?.user.id} />
          </CardContent>
        </Card>
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
