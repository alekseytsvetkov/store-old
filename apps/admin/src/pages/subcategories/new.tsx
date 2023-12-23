import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  useToast,
} from '@store/ui';
import { ArrowLeft, Loader2 } from '@store/ui/icons';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '@/utils/api';
import { useRouter } from 'next/router';

const subcategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Subcategory name must be at least 1 characters.',
    })
    .max(32, {
      message: 'Subcategory name must not be longer than 32 characters.',
    }),
  categoryId: z.string().uuid(),
});

type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;

export default function NewSubcategory() {
  const { t } = useTranslation('common');
  const { toast } = useToast();
  const router = useRouter();

  const utils = api.useUtils();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = api.category.list.useQuery({
    limit: 10,
  });

  const { mutateAsync, isError, isLoading } = api.subcategory.create.useMutation({
    async onSuccess() {
      await utils.subcategory.list.invalidate();
    },
    onError() {
      toast({
        title: 'К сожалению не удалось создать подкатегорию',
      });
    },
  });

  const defaultValues: Partial<SubcategoryFormValues> = {
    name: '',
    categoryId: categories?.items[0]?.id,
  };

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: SubcategoryFormValues) {
    try {
      await mutateAsync({
        name: data.name,
        categoryId: data.categoryId,
      });

      if (!isLoading && !isError) {
        router.push('/subcategories');

        return toast({
          title: 'Поздравляем!',
          description: `Вы успешно добавили подкатегорию: ${data.name}`,
        });
      }
    } catch (cause) {
      console.error({ cause }, 'Failed to add subcategory');
    }
  }

  return isCategoriesLoading ? (
    <Loader2 className="h-5 w-5 animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 col-start-2 flex flex-col justify-between">
            <div className="mb-6 flex flex-row items-center space-y-1">
              <Link href="/categories">
                <div className="hover:bg-accent mr-2 mt-1 rounded-md p-1">
                  <ArrowLeft className="h-5 w-5" />
                </div>
              </Link>
              <h2 className="text-lg font-semibold tracking-tight">
                {t('add')} {t('category_2')}
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <Card className="col-span-4">
                <CardContent className="grid gap-6 p-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('category-capitalized')}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={categories?.items[0]?.id ?? field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.items.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Название</FormLabel>
                          <FormControl>
                            <Input placeholder="Аккаунты" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="col-span-4 flex justify-end">
                <Button variant="outline" type="submit">
                  {!isLoading ? t('add') : <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
