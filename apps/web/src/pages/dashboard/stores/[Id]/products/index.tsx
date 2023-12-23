import {
  DashboardLayout,
  DataTableSkeleton,
  DateRangePicker,
  ProductsTableShell,
  SeedProducts,
  StoreLayout,
} from '@/components';
import { storeRouter } from '@store/api/router';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';

export default function StoreProductsPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  // const storeId = Number(params.storeId)

  // // Parse search params using zod schema
  // const { page, per_page, sort, name, category, from, to } =
  //   dashboardProductsSearchParamsSchema.parse(searchParams)

  // const store = await db.query.stores.findFirst({
  //   where: eq(stores.id, storeId),
  //   columns: {
  //     id: true,
  //     name: true,
  //   },
  // })

  // if (!store) {
  //   notFound()
  // }

  // // Fallback page for invalid page numbers
  // const pageAsNumber = Number(page)
  // const fallbackPage =
  //   isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // // Number of items per page
  // const perPageAsNumber = Number(per_page)
  // const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // // Number of items to skip
  // const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  // // Column and order to sort by
  // const [column, order] = (sort?.split(".") as [
  //   keyof Product | undefined,
  //   "asc" | "desc" | undefined,
  // ]) ?? ["createdAt", "desc"]

  // const categories = (category?.split(".") as Product["category"][]) ?? []

  // const fromDay = from ? new Date(from) : undefined
  // const toDay = to ? new Date(to) : undefined

  // // Transaction is used to ensure both queries are executed in a single transaction
  // noStore()

  // const transaction = db.transaction(async (tx) => {
  //   const items = await tx
  //     .select({
  //       id: products.id,
  //       name: products.name,
  //       category: products.category,
  //       price: products.price,
  //       inventory: products.inventory,
  //       rating: products.rating,
  //       createdAt: products.createdAt,
  //     })
  //     .from(products)
  //     .limit(limit)
  //     .offset(offset)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         // Filter by name
  //         name ? like(products.name, `%${name}%`) : undefined,
  //         // Filter by category
  //         categories.length > 0
  //           ? inArray(products.category, categories)
  //           : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(
  //               gte(products.createdAt, fromDay),
  //               lte(products.createdAt, toDay)
  //             )
  //           : undefined
  //       )
  //     )
  //     .orderBy(
  //       column && column in products
  //         ? order === "asc"
  //           ? asc(products[column])
  //           : desc(products[column])
  //         : desc(products.createdAt)
  //     )

  //   const count = await tx
  //     .select({
  //       count: sql<number>`count(${products.id})`,
  //     })
  //     .from(products)
  //     .where(
  //       and(
  //         eq(products.storeId, storeId),
  //         // Filter by name
  //         name ? like(products.name, `%${name}%`) : undefined,
  //         // Filter by category
  //         categories.length > 0
  //           ? inArray(products.category, categories)
  //           : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(
  //               gte(products.createdAt, fromDay),
  //               lte(products.createdAt, toDay)
  //             )
  //           : undefined
  //       )
  //     )
  //     .then((res) => res[0]?.count ?? 0)

  //   return {
  //     items,
  //     count,
  //   }
  // })

  return (
    <DashboardLayout title={t('store')} description={t('manage_your_store')}>
      <section className="grid gap-1">
        <div className="flex space-x-4">
          <h1 className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl">{t('store')}</h1>
        </div>
        <p className="text-muted-foreground max-w-[750px] text-sm sm:text-base">
          {t('manage_your_store')}
        </p>
      </section>
      <StoreLayout storeId={props.id}>
        <div className="space-y-6">
          <div className="xs:flex-row xs:items-center xs:justify-between flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Products</h2>
            <DateRangePicker align="end" />
          </div>
          <SeedProducts storeId={props.id} count={4} />
          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={6} isNewRowCreatable={true} isRowsDeletable={true} />
            }
          >
            {/* TODO: add props later */}
            {/* @ts-ignore */}
            <ProductsTableShell
              // transaction={transaction} limit={limit}
              storeId={props.id}
            />
          </React.Suspense>
        </div>
      </StoreLayout>
    </DashboardLayout>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<{
    id: string;
    locale: string;
  }>,
) {
  const helpers = createServerSideHelpers({
    router: storeRouter,
    // @ts-ignore
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = context.params?.id as string;
  // prefetch `post.byId`
  await helpers.byId.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      // @ts-ignore
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
