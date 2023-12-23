'use client';

import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { cn } from '@store/ui/cn';
import { processStorePath } from '@/utils';
import { useRouter } from 'next/router';
import { Separator } from '@store/ui';
import { useTranslation } from 'react-i18next';

interface IStoreTabsProps {
  storeId: string;
}

export function StoreTabs({ storeId }: IStoreTabsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const segment = processStorePath(router.asPath);

  const tabs = [
    {
      title: 'store',
      href: `/dashboard/stores/${storeId}`,
      isActive: segment === null,
    },
    {
      title: 'products',
      href: `/dashboard/stores/${storeId}/products`,
      isActive: segment === 'products',
    },
    {
      title: 'orders',
      href: `/dashboard/stores/${storeId}/orders`,
      isActive: segment === 'orders',
    },
    {
      title: 'customers',
      href: `/dashboard/stores/${storeId}/customers`,
      isActive: segment === 'customers',
    },
    {
      title: 'analytics',
      href: `/dashboard/stores/${storeId}/analytics`,
      isActive: segment === 'analytics',
    },
  ];

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="bg-background sticky top-0 z-30 w-full overflow-auto px-1"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="text-muted-foreground inline-flex items-center justify-center space-x-1.5">
        {tabs.map((tab) => (
          <div
            role="none"
            key={tab.href}
            className={cn(
              'border-b-2 border-transparent py-1.5',
              tab.isActive && 'border-foreground',
            )}
          >
            <TabsTrigger
              value={tab.href}
              className={cn(
                'text-muted-foreground ring-offset-background hover:bg-muted hover:text-primary focus-visible:ring-ring inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                tab.isActive && 'text-foreground',
              )}
            >
              {t(tab.title)}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  );
}
