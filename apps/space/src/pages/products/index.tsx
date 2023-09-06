import { DataTable, EmptyPlaceholder } from "@/components";
import { Button, Separator } from "@store/ui";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { api } from "@/utils/api";
import { productsColumns } from "@/components/columns";
import { Loader2 } from "@store/ui/icons";
import Link from "next/link";

export default function Sections() {
  const { t } = useTranslation('common')

  const { data, isLoading, status } = api.product.list.useQuery({
    limit: 10,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('products-capitalized')}
          </h2>
        </div>
        <Link href="/products/new">
          <Button size="sm" className="relative">
            {t('add')} {t('product')}
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      {status === 'loading' || isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : data?.items ? (
        <DataTable data={data.items} columns={productsColumns} />
      ) : (
        <EmptyPlaceholder name={t('product')} title={t('empty_list_title')} description={`${t('add_your_first')} ${t('product')}`} link="/products/new" />
      )}
    </>
  )
}

export async function getStaticProps({ locale } : { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}
