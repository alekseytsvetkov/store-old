'use client';

import type { ReactNode } from 'react';

import { dashboardConfig } from '@/config/dashboard';

import { ScrollArea } from '@store/ui';
import { SidebarNav } from './sidebar-nav';
import { DashboardHeader } from './header';

interface IDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  button?: ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  description,
  button,
}: IDashboardLayoutProps) {
  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <ScrollArea className="py-6 pr-6 lg:py-8">
          <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
        </ScrollArea>
      </aside>
      <div className="grid items-center gap-8 pb-8 pt-6 md:py-8">
        <DashboardHeader title={title} description={description} button={button} />
        {children}
      </div>
    </div>
  );
}
