import type { LucideIcon } from "@store/ui/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: LucideIcon
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}
export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

// export interface CuratedStore {
//   id: Store["id"]
//   name: Store["name"]
//   description?: Store["description"]
//   productCount?: number
// }

export interface CuratedStore {
  id: string;
  name: string;
  description?:string;
  productCount?: number
}