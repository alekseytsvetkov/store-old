import { Input } from "@store/ui";
import { useTranslation } from "react-i18next";

export function Search() {
  const { t } = useTranslation('common')

  return (
    <div>
      <Input
        type="search"
        placeholder={t('search_input')}
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}
