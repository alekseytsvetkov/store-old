import Head from 'next/head';

import { api } from '@/utils/api';
import { signIn, signOut, useSession } from '@store/auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@store/ui';
import { ProductPreview } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');
  const hello = api.auth.hello.useQuery({ text: 'from tRPC' });

  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center py-6">
        <Tabs defaultValue="recommended" className="h-full w-full">
          <div className="flex items-center justify-center">
            <TabsList>
              <TabsTrigger value="recommended" className="relative">
                {t('recommended')}
              </TabsTrigger>
              <TabsTrigger value="news-and-trending">News & Trending</TabsTrigger>
              <TabsTrigger value="top-sellers">Top sellsers</TabsTrigger>
              <TabsTrigger value="popular-upcoming">Popular Upcoming</TabsTrigger>
              <TabsTrigger value="specials">Specials</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="recommended" className="border-none p-0 outline-none">
            <div className="grid gap-6 pt-6 md:grid-cols-6">
              {new Array(24).fill('').map((_, index) => (
                <ProductPreview
                  key={index}
                  id={String(index)}
                  name="Product name"
                  price={1200}
                  reviewsCount={64}
                  image="https://placehold.co/180x180.png"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="news-and-trending"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid gap-6 pt-6 md:grid-cols-6">
              {new Array(24).fill('').map((_, index) => (
                <ProductPreview
                  key={index}
                  id={String(index)}
                  name="Product name"
                  price={1200}
                  reviewsCount={64}
                  image="https://placehold.co/180x180.png"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="top-sellers"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid gap-6 pt-6 md:grid-cols-6">
              {new Array(24).fill('').map((_, index) => (
                <ProductPreview
                  key={index}
                  id={String(index)}
                  name="Product name"
                  price={1200}
                  reviewsCount={64}
                  image="https://placehold.co/180x180.png"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="popular-upcoming"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid gap-6 pt-6 md:grid-cols-6">
              {new Array(24).fill('').map((_, index) => (
                <ProductPreview
                  key={index}
                  id={String(index)}
                  name="Product name"
                  price={1200}
                  reviewsCount={64}
                  image="https://placehold.co/180x180.png"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent
            value="specials"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="grid gap-6 pt-6 md:grid-cols-6">
              {new Array(24).fill('').map((_, index) => (
                <ProductPreview
                  key={index}
                  id={String(index)}
                  name="Product name"
                  price={1200}
                  reviewsCount={64}
                  image="https://placehold.co/180x180.png"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}!</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
