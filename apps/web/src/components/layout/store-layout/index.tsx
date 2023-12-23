import { StoreTabs } from '@/components';

interface IStoreLayoutProps extends React.PropsWithChildren {
  storeId?: string;
}

export default function StoreLayout({ children, storeId }: IStoreLayoutProps) {
  return (
    <div className="space-y-8 overflow-auto">
      {storeId && <StoreTabs storeId={storeId} />}
      {children}
    </div>
  );
}
