'use client';

import { Button, toast, type ButtonProps } from '@store/ui';
import { cn } from '@store/ui/cn';
import { Loader2 } from '@store/ui/icons';
import React, { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

interface ISeedProductsProps extends ButtonProps {
  storeId: string;
  count?: number;
}

export function SeedProducts({ storeId, count, className, ...props }: ISeedProductsProps) {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();

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
          toast({
            title: t('products_seeded_successfully.'),
          });
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
