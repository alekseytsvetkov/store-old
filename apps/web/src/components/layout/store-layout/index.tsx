import { StoreTabs } from '@/components/pager/store-tabs';

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="space-y-8 overflow-auto">
      <StoreTabs
        //storeId={storeId}
        storeId={1}
      />
      {children}
    </div>
  );
}
