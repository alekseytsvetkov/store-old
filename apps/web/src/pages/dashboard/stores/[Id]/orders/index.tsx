import {
  DashboardLayout,
  DataTableSkeleton,
  DateRangePicker,
  OrdersTableShell,
  StoreLayout,
} from '@/components';
import { api } from '@/utils';
import { storeRouter } from '@store/api/router';
import { createServerSideHelpers } from '@trpc/react-query/server';
import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import superjson from 'superjson';

export default function StoreOrdersPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = api.order.listByStoreId.useQuery({
    storeId: props.id,
    limit: 10,
  });

  // const { page, per_page, sort, customer, status, from, to } =
  //   ordersSearchParamsSchema.parse(searchParams)

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
  // const [column, order] = (sort.split(".") as [
  //   keyof Order | undefined,
  //   "asc" | "desc" | undefined,
  // ]) ?? ["createdAt", "desc"]

  // const statuses = status ? status.split(".") : []

  // const fromDay = from ? new Date(from) : undefined
  // const toDay = to ? new Date(to) : undefined

  // // Transaction is used to ensure both queries are executed in a single transaction
  // const transaction = db.transaction(async (tx) => {
  //   const items = await tx
  //     .select({
  //       id: orders.id,
  //       storeId: orders.storeId,
  //       quantity: orders.quantity,
  //       amount: orders.amount,
  //       paymentIntentId: orders.stripePaymentIntentId,
  //       status: orders.stripePaymentIntentStatus,
  //       customer: orders.email,
  //       createdAt: orders.createdAt,
  //     })
  //     .from(orders)
  //     .limit(limit)
  //     .offset(offset)
  //     .where(
  //       and(
  //         eq(orders.storeId, storeId),
  //         // Filter by email
  //         customer ? like(orders.email, `%${customer}%`) : undefined,
  //         // Filter by status
  //         statuses.length > 0
  //           ? inArray(orders.stripePaymentIntentStatus, statuses)
  //           : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //           : undefined
  //       )
  //     )
  //     .orderBy(
  //       column && column in orders
  //         ? order === "asc"
  //           ? asc(orders[column])
  //           : desc(orders[column])
  //         : desc(orders.createdAt)
  //     )

  //   const count = await tx
  //     .select({
  //       count: sql<number>`count(*)`,
  //     })
  //     .from(orders)
  //     .where(
  //       and(
  //         eq(orders.storeId, storeId),
  //         // Filter by email
  //         customer ? like(orders.email, `%${customer}%`) : undefined,
  //         // Filter by status
  //         statuses.length > 0
  //           ? inArray(orders.stripePaymentIntentStatus, statuses)
  //           : undefined,
  //         // Filter by createdAt
  //         fromDay && toDay
  //           ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //           : undefined
  //       )
  //     )
  //     .execute()
  //     .then((res) => res[0]?.count ?? 0)

  //   return {
  //     items,
  //     count,
  //   }
  // })

  return (
    <DashboardLayout title={t('store')} description={t('manage_your_store')}>
      <StoreLayout storeId={props.id}>
        <div className="space-y-6">
          <div className="flex flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <DateRangePicker align="end" />
          </div>
          <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
            {!!orders?.items && <OrdersTableShell orders={orders?.items} storeId={props.id} />}
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
  const id = context.params?.id || null;
  id && await helpers.byId.prefetch({ id });

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
