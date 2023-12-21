import Head from 'next/head';
import { AddStoreForm, DashboardLayout } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@store/ui';
import { useTranslation } from 'react-i18next';

export default function CreateNewStore() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('new_store_title')}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>
        <section className="grid gap-1">
          <div className="flex space-x-4">
            <h1 className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl">
              {t('new_store_title')}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-[750px] text-sm sm:text-base">
            {t('new_store_description')}
          </p>
        </section>
        <Card id="new-store-page-form-container" aria-labelledby="new-store-page-form-heading">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('card_add_store_title')}</CardTitle>
            <CardDescription>{t('card_add_store_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <AddStoreForm
            // userId={user.id}
            />
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
