import { DashboardLayout, StoreLayout } from '@/components';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Textarea,
  Input,
  Button,
} from '@store/ui';
import type { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

interface IStoreProductsPageProps {
  params: {
    storeId: string;
  };
}

export default function StoreProductsPage({ params }: IStoreProductsPageProps) {
  const { t } = useTranslation();
  // const storeId = Number(params.storeId)

  // const store = await db.query.stores.findFirst({
  //   where: eq(stores.id, storeId),
  //   columns: {
  //     id: true,
  //     name: true,
  //     description: true,
  //   },
  // })

  // if (!store) {
  //   notFound()
  // }

  return (
    <DashboardLayout>
      <section className="grid gap-1">
        <div className="flex space-x-4">
          <h1 className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl">{t('store')}</h1>
        </div>
        <p className="text-muted-foreground max-w-[750px] text-sm sm:text-base">
          {t('manage_your_store')}
        </p>
      </section>
      <StoreLayout>
        <div className="space-y-10">Products</div>
      </StoreLayout>
    </DashboardLayout>
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
