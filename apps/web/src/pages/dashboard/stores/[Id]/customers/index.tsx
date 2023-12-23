import * as React from 'react';

import {
  CustomersTableShell,
  DashboardLayout,
  DataTableSkeleton,
  DateRangePicker,
  StoreLayout,
} from '@/components';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';
import { createServerSideHelpers } from '@trpc/react-query/server';
import { storeRouter } from '@store/api/router';

export default function StoreCustomersPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  // const storeId = Number(params.storeId)

  // const { page, per_page, sort, email, from, to } =
  //   customersSearchParamsSchema.parse(searchParams)

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

  // // Transaction is used to ensure both queries are executed in a single transaction
  // const pageAsNumber = Number(page)
  // const fallbackPage =
  //   isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // const perPageAsNumber = Number(per_page)
  // // Number of items per page
  // const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // // Number of items to skip
  // const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  // const fromDay = from ? new Date(from) : undefined
  // const toDay = to ? new Date(to) : undefined

  // const transaction = db.transaction(async (tx) => {
  //   const items = await db
  //     .select({
  //       name: orders.name,
  //       email: orders.email,
  //       orderPlaced: sql<number>`count(*)`,
  //       totalSpent: sql<number>`sum(${orders.amount})`,
  //       createdAt: sql<string>`min(${orders.createdAt})`,
  //     })
  //     .from(orders)
  //     .limit(limit)
  //     .offset(offset)
  //     .where(
  //       and(
  //         eq(orders.storeId, storeId),
  //         // Filter by email
  //         email ? like(orders.email, `%${email}%`) : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //           : undefined
  //       )
  //     )
  //     .groupBy(orders.email, orders.name)
  //     .orderBy(
  //       sort === "name.asc"
  //         ? asc(orders.name)
  //         : sort === "name.desc"
  //           ? desc(orders.name)
  //           : sort === "email.asc"
  //             ? asc(orders.email)
  //             : sort === "email.desc"
  //               ? desc(orders.email)
  //               : sort === "totalSpent.asc"
  //                 ? asc(sql<number>`sum(${orders.amount})`)
  //                 : sort === "totalSpent.desc"
  //                   ? desc(sql<number>`sum(${orders.amount})`)
  //                   : sort === "orderPlaced.asc"
  //                     ? asc(sql<number>`count(*)`)
  //                     : sort === "orderPlaced.desc"
  //                       ? desc(sql<number>`count(*)`)
  //                       : sort === "createdAt.asc"
  //                         ? asc(sql<string>`min(${orders.createdAt})`)
  //                         : sort === "createdAt.desc"
  //                           ? desc(sql<string>`min(${orders.createdAt})`)
  //                           : sql<string>`min(${orders.createdAt})`
  //     )

  //   const altCount = await db
  //     .select({
  //       count: sql<number>`count(*)`,
  //     })
  //     .from(orders)
  //     .where(eq(orders.storeId, storeId))
  //     .execute()
  //     .then((res) => res[0]?.count ?? 0)

  //   const count = await tx
  //     .select({
  //       count: sql<number>`count(*)`,
  //     })
  //     .from(orders)
  //     .where(
  //       and(
  //         eq(orders.storeId, storeId),
  //         // Filter by email
  //         email ? like(orders.email, `%${email}%`) : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //           : undefined
  //       )
  //     )
  //     .groupBy(orders.email, orders.name)
  //     .execute()
  //     .then((res) => res[0]?.count ?? 0)

  //   return {
  //     items,
  //     count: altCount - count,
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
            <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
            <DateRangePicker align="end" />
          </div>
          <React.Suspense fallback={<DataTableSkeleton columnCount={5} filterableFieldCount={0} />}>
            {/* TODO: add props later */}
            {/* @ts-ignore */}
            <CustomersTableShell
            // transaction={transaction} limit={limit} storeId={store.id}
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
