import Head from 'next/head';
import { DashboardLayout, StoreCard, StoreCardSkeleton } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { Button } from '@store/ui';
import { useTranslation } from 'react-i18next';
import { api } from '@/utils/api';

export default function Stores() {
  const { t } = useTranslation();

  const {
    data: stores,
    isLoading: isStoresLoading,
    isError: isStoresError,
  } = api.store.list.useQuery({
    limit: 10,
  });

  return (
    <>
      <Head>
        <title>Stores</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <section className="grid gap-1">
          <div className="flex space-x-4">
            <h1
              className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl"
              suppressHydrationWarning
            >
              {t('stores')}
            </h1>
            <Link aria-label="Create store" href="/dashboard/stores/new">
              <Button size="sm" suppressHydrationWarning>
                {t('create_store')}
              </Button>
            </Link>
          </div>
          <p
            className="text-muted-foreground max-w-[750px] text-sm sm:text-base"
            suppressHydrationWarning
          >
            {t('manage_your_stores')}
          </p>
        </section>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(isStoresLoading || isStoresError) &&
            Array.from({ length: 3 }).map((_, i) => <StoreCardSkeleton key={i} />)}
          {!isStoresLoading &&
            stores?.items.map((store) => (
              <StoreCard key={store.id} store={store} href={`/dashboard/stores/${store.id}`} />
            ))}
        </section>
      </DashboardLayout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
