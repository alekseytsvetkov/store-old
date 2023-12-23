import { DashboardLayout, DateRangePicker, StoreLayout } from '@/components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@store/ui';
import type { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

interface IAnalyticsPageProps {
  params: {
    storeId: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function AnalyticsPage({ params, searchParams }: IAnalyticsPageProps) {
  const { t } = useTranslation();
  // const storeId = Number(params.storeId);

  // const { from, to } = searchParamsSchema.pick({ from: true, to: true }).parse(searchParams);

  // const fromDay = from ? new Date(from) : undefined;
  // const toDay = to ? new Date(to) : undefined;
  // const dayCount =
  //   fromDay && toDay
  //     ? Math.round((toDay.getTime() - fromDay.getTime()) / (1000 * 60 * 60 * 24))
  //     : undefined;

  // const store = await db.query.stores.findFirst({
  //   where: eq(stores.id, storeId),
  //   columns: {
  //     id: true,
  //     name: true,
  //     description: true,
  //   },
  // });

  // if (!store) {
  //   notFound();
  // }

  // const storeOrders = await db
  //   .select({
  //     amount: orders.amount,
  //     createdAt: orders.createdAt,
  //   })
  //   .from(orders)
  //   .where(
  //     and(
  //       eq(orders.storeId, store.id),
  //       // Filter by createdAt
  //       fromDay && toDay
  //         ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //         : undefined,
  //     ),
  //   );

  // const sales = storeOrders.reduce((acc, order) => acc + Number(order.amount), 0);

  // const customers = await db
  //   .select({
  //     name: orders.name,
  //     email: orders.email,
  //     totalSpent: sql<number>`sum(${orders.amount})`,
  //     createdAt: sql<string>`min(${orders.createdAt})`,
  //   })
  //   .from(orders)
  //   .where(
  //     and(
  //       eq(orders.storeId, store.id),
  //       // Filter by createdAt
  //       fromDay && toDay
  //         ? and(gte(orders.createdAt, fromDay), lte(orders.createdAt, toDay))
  //         : undefined,
  //     ),
  //   )
  //   .groupBy(orders.email, orders.name)
  //   .orderBy(desc(sql<number>`sum(${orders.amount})`));

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
        <div className="space-y-6 p-1">
          <div className="xs:flex-row xs:items-center xs:justify-between flex flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
            <DateRangePicker align="end" dayCount={360} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-muted-foreground h-4 w-4"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {formatPrice(sales, {
                notation: 'standard',
              })} */}
                </div>
                <p className="text-muted-foreground text-xs">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-muted-foreground h-4 w-4"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {formatPrice(sales, {
                notation: 'standard',
              })} */}
                </div>
                <p className="text-muted-foreground text-xs">+19% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="text-muted-foreground h-4 w-4"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                {/* <div className="text-2xl font-bold">{customers.length}</div> */}
                <p className="text-muted-foreground text-xs">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                {/* {customers.length} customers {dayCount && `in the last ${dayCount} days`} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* {customers.map((customer) => (
              <div key={customer.email} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{customer.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{customer.name}</p>
                  <p className="text-muted-foreground text-sm">{customer.email}</p>
                </div>
                <div className="ml-auto font-medium">+${formatNumber(customer.totalSpent)}</div>
              </div>
            ))} */}
              </div>
            </CardContent>
          </Card>
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
