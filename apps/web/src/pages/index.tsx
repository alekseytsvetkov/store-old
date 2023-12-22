import Head from 'next/head';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@store/ui';
import { ProductPreview } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');

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
              <TabsTrigger value="news-and-trending">{t('news_trending')}</TabsTrigger>
              <TabsTrigger value="top-sellers">{t('top_sellsers')}</TabsTrigger>
              <TabsTrigger value="popular-upcoming">{t('popular_upcoming')}</TabsTrigger>
              <TabsTrigger value="specials">{t('specials')}</TabsTrigger>
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
