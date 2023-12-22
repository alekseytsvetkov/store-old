import {
  DashboardLayout,
  DataTableSkeleton,
  DateRangePicker,
  OrdersTableShell,
  StoreLayout,
} from '@/components';
import type { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface IStoreOrdersPageProps {
  params: {
    storeId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function StoreOrdersPage({ params, searchParams }: IStoreOrdersPageProps) {
  const { t } = useTranslation();

  // const storeId = Number(params.storeId)

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
        <div className="space-y-6">
          <div className="xs:flex-row xs:items-center xs:justify-between flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <DateRangePicker align="end" />
          </div>
          <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
            <OrdersTableShell
            // transaction={transaction} limit={limit} storeId={storeId}
            />
          </React.Suspense>
        </div>
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
