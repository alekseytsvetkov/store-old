import { Card, CardHeader, Skeleton, CardContent, CardFooter } from '@store/ui';

export function ProductsTableLoading() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-2/4" />
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-xl gap-4">
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6" />
          </div>
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-20" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
}
