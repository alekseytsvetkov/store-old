import Head from 'next/head';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DashboardLayout, StoreCard, StoreCardSkeleton } from '@/components';

import { Button } from '@store/ui';
import type { Store } from '@store/db/types';

import { api } from '@/utils';

export default function Stores() {
  const { t } = useTranslation();

  const {
    data: stores,
    isLoading: isStoresPending,
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
      <DashboardLayout
        title={t('stores')}
        description={t('manage_your_stores')}
        button={
          <Link aria-label="Create store" href="/dashboard/stores/new">
            <Button size="sm" suppressHydrationWarning>
              {t('create_store')}
            </Button>
          </Link>
        }
      >
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(isStoresPending || isStoresError) &&
            Array.from({ length: 3 }).map((_, i) => <StoreCardSkeleton key={i} />)}
          {!isStoresPending &&
            stores?.items.map((store: Store) => (
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
