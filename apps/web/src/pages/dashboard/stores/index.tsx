import Head from 'next/head';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DashboardLayout, StoreCard, StoreCardSkeleton } from '@/components';

import { Button } from '@store/ui';
import type { Store } from '@store/db/types';

import { api } from '@/utils';
import _ from 'lodash';
import { useMemo } from 'react';

export default function Stores() {
  const { t } = useTranslation();

  const { isFetching, isError, data } = api.store.list.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  );

  const stores = useMemo(() => data?.pages.flat()[0], [data?.pages]);

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
          {(isFetching || isError) &&
            Array.from({ length: 3 }).map((_, i) => <StoreCardSkeleton key={i} />)}
          {!isFetching &&
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
