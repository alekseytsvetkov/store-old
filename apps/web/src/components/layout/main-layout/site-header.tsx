import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@store/ui';
import { CatalogMenu, LanguageSwitcher, ModeToggle, UserNav, Search } from '@/components';
import { useTranslation } from 'react-i18next';

export function SiteHeader() {
  const { t } = useTranslation();

  return (
    <header className="relative w-full border-b">
      <nav className="container flex h-16 items-center px-4 text-sm font-medium text-slate-800 dark:text-slate-300">
        <div className="grid w-full md:grid-cols-3">
          <div className="flex items-center justify-start gap-2">
            <Link href="/">
              <span className="text-primary font-bold">Store</span>
            </Link>
            <Suspense>
              <CatalogMenu />
            </Suspense>
          </div>
          <div className="flex items-center justify-center">
            <Suspense>
              <Search />
            </Suspense>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Link href="/">
              <Button variant="link" suppressHydrationWarning>
                {t('work_with_us')}
              </Button>
            </Link>
            <LanguageSwitcher />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </nav>
    </header>
  );
}
