import Head from 'next/head';
import { DashboardLayout } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardLayout>Profile page</DashboardLayout>
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
