'use client';

import { SearchProvider } from './search-provider';
import { SearchContent } from './search-content';
import { Button, Dialog, DialogContent, DialogTrigger } from '@store/ui';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@store/ui/icons';
import { useTranslation } from 'next-i18next';

export function Search() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SearchBar setOpen={setOpen} />
      </DialogTrigger>
      <SearchProvider>
        <DialogContent className="max-h-[80vh] max-w-full gap-0 overflow-hidden rounded-sm p-0 sm:rounded-sm md:max-w-[75vw] lg:max-w-[60vw] xl:max-h-[60vh]">
          <SearchContent onClick={() => setOpen(false)} />
        </DialogContent>
      </SearchProvider>
    </Dialog>
  );
}

function SearchBar({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { t } = useTranslation('common');

  return (
    <>
      {/* Mobile Bar */}
      <button
        aria-label="mobile search icon"
        className="rounded-lg p-2 focus:outline-none focus-visible:ring-2 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {/* Desktop Bar */}
      <Button
        variant="outline"
        className="text-muted-foreground hidden w-64 justify-between gap-3 text-sm lg:inline-flex"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <span className="sm:hidden">Search</span>
        <span className="hidden w-20 truncate text-left sm:inline-block md:w-full">
          {t('search_input')}
        </span>
        <span className="text-xs">⌘K</span>
      </Button>
    </>
  );
}
