import type { Product, Subcategory } from '@store/db/types';
import type { LucideIcon } from '@store/ui/icons';
import type { FileWithPath } from '@uploadthing/react';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface ICuratedStore {
  id: string;
  name: string;
  description?: string | null;
  productCount?: number;
  isActive: boolean;
  userId: string;
  slug?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export interface Category {
  title: Product['category'];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: Subcategory[];
}
