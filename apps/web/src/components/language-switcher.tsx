import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@store/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LANGUAGES = [
  {
    name: 'Русский',
    code: 'ru',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/ru.svg',
  },
  {
    name: 'English',
    code: 'en',
    image: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/1x1/us.svg',
  },
];

export function LanguageSwitcher() {
  const router = useRouter();

  const onValueChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <Select defaultValue={router.locale} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger id="area" className="w-[160px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex flex-row items-center">
              <Image
                src={language.image}
                alt={language.name}
                width={18}
                height={18}
                className="mr-2 rounded"
              />
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
