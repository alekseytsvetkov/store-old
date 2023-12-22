import Link from 'next/link';
import { type ICuratedStore } from '@/types';

import { Card, AspectRatio, CardHeader, CardTitle, CardDescription } from '@store/ui';

interface StoreCardProps {
  store: ICuratedStore;
  href: string;
}

export function StoreCard({ store, href }: StoreCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{store.name}</span>
      <Card className="hover:bg-muted/50 h-full overflow-hidden transition-colors">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          <div className="h-full rounded-t-md border-b" />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{store.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {store.description?.length ? store.description : `Explore ${store.name} products`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
