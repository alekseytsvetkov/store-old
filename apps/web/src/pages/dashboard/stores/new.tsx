import Head from 'next/head';
import { AddStoreForm, DashboardLayout } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@store/ui';
import { useTranslation } from 'react-i18next';
import { useSession } from '@store/auth/react';

export default function CreateNewStore() {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>{t('new_store_title')}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout title={t('new_store_title')} description={t('new_store_description')}>
        <Card id="new-store-page-form-container" aria-labelledby="new-store-page-form-heading">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('card_add_store_title')}</CardTitle>
            <CardDescription>{t('card_add_store_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO: fix later */}
            {/* @ts-ignore */}
            <AddStoreForm userId={session?.user.id} />
          </CardContent>
        </Card>
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
