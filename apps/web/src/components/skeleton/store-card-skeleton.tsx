import { AspectRatio, Card, CardHeader, Skeleton } from '@store/ui';

export function StoreCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <AspectRatio ratio={21 / 9}>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
        <Skeleton className="absolute right-2 top-2 h-6 w-14 rounded-sm px-2 py-1" />
        <Skeleton className="h-full w-full rounded-b-none" />
      </AspectRatio>
      <CardHeader className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
    </Card>
  );
}
