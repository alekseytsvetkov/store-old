import { EmptyPlaceholder } from "@/components";
import { Separator } from "@store/ui";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Products() {
  const { t } = useTranslation('common')

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('products-capitalized')}
          </h2>
          <p className="text-sm text-muted-foreground">
            Что вы продаете?
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <EmptyPlaceholder name="товар" title="В списке ваших товаров пусто" description="Добавьте свой первый товар" link="/products/new" />
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
    },
  }
}
