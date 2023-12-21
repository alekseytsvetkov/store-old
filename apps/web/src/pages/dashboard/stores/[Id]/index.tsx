import { DashboardLayout } from '@/components';
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
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface UpdateStorePageProps {
  params: {
    storeId: string;
  };
}

export default function UpdateStorePage({ params }: UpdateStorePageProps) {
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
      <div className="space-y-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('update_your_store_title')}</CardTitle>
            <CardDescription>{t('update_your_store_description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              // action={updateStore.bind(null, storeId)}
              className="grid w-full max-w-xl gap-5"
            >
              <div className="grid gap-2.5">
                <Label htmlFor="update-store-name">{t('name')}</Label>
                <Input
                  id="update-store-name"
                  aria-describedby="update-store-name-description"
                  name="name"
                  required
                  minLength={3}
                  maxLength={50}
                  placeholder={t('input_store_name')}
                  // defaultValue={store.name}
                  defaultValue="Store name"
                />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="update-store-description">{t('description')}</Label>
                <Textarea
                  id="update-store-description"
                  aria-describedby="update-store-description-description"
                  name="description"
                  minLength={3}
                  maxLength={255}
                  placeholder={t('input_store_description')}
                  // defaultValue={store.description ?? ""}
                  defaultValue="Store desciption"
                />
              </div>
              <div className="xs:flex-row flex flex-row gap-2">
                <Button>
                  {t('update_store')}
                  <span className="sr-only">{t('update_store')}</span>
                </Button>
                <Button
                  // formAction={deleteStore.bind(null, storeId)}
                  variant="destructive"
                >
                  {t('delete_store')}
                  <span className="sr-only">{t('delete_store')}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
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
