'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Textarea,
  Button,
  Input,
  toast,
} from '@store/ui';
import { storeSchema } from '@/lib/validations';
import { catchError } from '@/utils';
import { Loader2 } from '@store/ui/icons';
import { useTranslation } from 'react-i18next';
import { api } from '@/utils/api';
interface AddStoreFormProps {
  userId: string;
}

type Inputs = z.infer<typeof storeSchema>;

export function AddStoreForm({ userId }: AddStoreFormProps) {
  const { t } = useTranslation();

  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const utils = api.useUtils();

  const { mutateAsync: createStore, isLoading: isCreatePending } = api.store.create.useMutation({
    async onSuccess() {
      await utils.store.list.invalidate();
      router.push('/dashboard/stores');
    },
  });

  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await createStore({ ...data, userId });

        form.reset();
        toast({
          title: t('form_create_store_success'),
        });
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Form {...form}>
      <form className="grid w-full max-w-xl gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('input_store_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('description')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('input_store_description')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isCreatePending}>
          {isCreatePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          {t('add_store')}
          <span className="sr-only">{t('add_store')}</span>
        </Button>
      </form>
    </Form>
  );
}
