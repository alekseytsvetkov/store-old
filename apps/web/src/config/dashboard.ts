import { type SidebarNavItem } from "@/types"
import { CogIcon, StoreIcon, UserCircleIcon } from "@store/ui/icons"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "profile",
      href: "/dashboard/profile",
      icon: UserCircleIcon,
      items: [],
    },
    {
      title: "stores",
      href: "/dashboard/stores",
      icon: StoreIcon,
      items: [],
    },
    {
      title: "settings",
      href: "/dashboard/settings",
      icon: CogIcon,
      items: [],
    },
  ],
}
