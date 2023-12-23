import { DataTable, EmptyPlaceholder } from '@/components';
import { Separator } from '@store/ui';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { api } from '@/utils/api';
import { usersColumns } from '@/components/columns';
import { Loader2 } from '@store/ui/icons';

export default function Users() {
  const { t } = useTranslation('common');

  const { data, isLoading, status } = api.user.list.useQuery({
    limit: 10,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{t('users-capitalized')}</h2>
        </div>
      </div>
      <Separator className="my-4" />
      {status === 'loading' || isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : data?.items ? (
        <DataTable data={data.items} columns={usersColumns} />
      ) : (
        <EmptyPlaceholder
          name={t('user')}
          title={t('empty_list_title')}
          description={`${t('add_your_first')} ${t('user')}`}
          link="/user/new"
        />
      )}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
