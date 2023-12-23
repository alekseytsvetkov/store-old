import type { ReactNode } from 'react';

interface IDashboardHeaderProps {
  title: string;
  description?: string;
  button?: ReactNode;
}

export function DashboardHeader({ title, description, button }: IDashboardHeaderProps) {
  return (
    <section className="grid gap-1">
      <div className="flex space-x-4">
        <h1
          className="flex-1 text-2xl font-bold tracking-tighter md:text-3xl"
          suppressHydrationWarning
        >
          {title}
        </h1>
        {button}
      </div>
      <p
        className="text-muted-foreground max-w-[750px] text-sm sm:text-base"
        suppressHydrationWarning
      >
        {description}
      </p>
    </section>
  );
}
