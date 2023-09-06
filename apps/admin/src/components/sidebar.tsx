import { cn } from "@/utils/cn";
import { Button } from "@store/ui";
import Link from "next/link";
import { useRouter } from "next/router";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();

  const PATHS = [
    {
      url: "/",
      name: "Аналитика"
    },
    {
      url: "/users",
      name: "Пользователи"
    },
    {
      url: "/sections",
      name: "Секции"
    },
    {
      url: "/categories",
      name: "Категории"
    },
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2> */}
          <div className="space-y-1">
            {PATHS.map(item => <Link href={item.url} key={item.url}>
              <Button variant={router.pathname.split("/")[1] == item.url.split("/")[1] ? "secondary" : "ghost"} className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                {item.name}
              </Button>
            </Link>)}
          </div>
        </div>
      </div>
    </div>
  )
}
