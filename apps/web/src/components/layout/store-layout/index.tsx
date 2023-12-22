import { StoreTabs } from '@/components';

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
