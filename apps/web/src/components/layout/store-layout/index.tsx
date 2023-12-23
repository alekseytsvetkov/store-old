import type { PropsWithChildren } from 'react';

import { StoreTabs } from '@/components';

interface IStoreLayoutProps extends PropsWithChildren {
  storeId: string;
}

export default function StoreLayout({ children, storeId }: IStoreLayoutProps) {
  return (
    <div className="space-y-8 overflow-auto">
      <StoreTabs storeId={storeId} />
      {children}
    </div>
  );
}
