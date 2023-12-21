import { type SidebarNavItem } from "@/types"
import { CogIcon, StoreIcon, UserCircleIcon } from "@store/ui/icons"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserCircleIcon,
      items: [],
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: StoreIcon,
      items: [],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: CogIcon,
      items: [],
    },
  ],
}
