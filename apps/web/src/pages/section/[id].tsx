import Head from 'next/head';

import { api } from '@/utils/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPaths } from 'next';

export default function Section() {
  return (
    <>
      <Head>
        <title>Section</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>Section</div>
      </main>
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
