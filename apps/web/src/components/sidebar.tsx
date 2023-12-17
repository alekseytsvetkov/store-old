import { cn } from "@/utils/cn";
import { Button } from "@store/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from "next/image";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  const { data, isLoading, isError } = api.section.list.useQuery({
    limit: 10,
  });

  const PATHS = data?.items.map(section => {
    return {
      url: `/sections/${section.id}`,
      name: section.name,
      icon: section.icon
    }
  }) ?? []

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {!isLoading && !isError && data?.items && PATHS.map(item => item.icon && <Link href={item.url} key={item.url}>
              <div className="w-full justify-start flex flex-row items-center my-2 rounded p-2 bg-secondary">
                <div className="p-1 rounded mr-2 bg-black">
                  <Image alt="dota2-logo" width="24" height="24" src={item.icon} />
                </div>
                {item.name}
              </div>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}
