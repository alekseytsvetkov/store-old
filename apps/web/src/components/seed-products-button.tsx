'use client';

import { Button, type ButtonProps } from '@store/ui';
import { cn } from '@store/ui/cn';
import { Loader2 } from '@store/ui/icons';
import * as React from 'react';
import { toast } from 'sonner';

interface ISeedProductsProps extends ButtonProps {
  storeId: number;
  count?: number;
}

export function SeedProducts({ storeId, count, className, ...props }: ISeedProductsProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      className={cn(className)}
      size="sm"
      onClick={() => {
        startTransition(async () => {
          // await seedProducts({
          //   storeId,
          //   count,
          // })
          toast.success('Products seeded successfully.');
        });
      }}
      {...props}
      disabled={isPending}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Seed products
    </Button>
  );
}
