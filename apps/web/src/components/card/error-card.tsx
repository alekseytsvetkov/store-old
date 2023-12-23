import * as React from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@store/ui';
import { cn } from '@store/ui/cn';

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  retryLink?: string;
  retryLinkText?: string;
  reset?: () => void;
}

export function ErrorCard({
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  retryLink,
  retryLinkText = 'Go back',
  reset,
  className,
  ...props
}: ErrorCardProps) {
  return (
    <Card
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn('grid w-full place-items-center', className)}
      {...props}
    >
      <CardHeader>
        <div className="bg-muted grid h-20 w-20 place-items-center rounded-full">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[176px] flex-col items-center justify-center space-y-2.5 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">{description}</CardDescription>
      </CardContent>
      {retryLink ? (
        <CardFooter>
          <Link href={retryLink}>
            <Button variant="ghost">
              {retryLinkText}
              <span className="sr-only">{retryLinkText}</span>
            </Button>
          </Link>
        </CardFooter>
      ) : null}
      {reset ? (
        <CardFooter>
          <Button aria-label="Retry" variant="ghost" onClick={reset}>
            Retry
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
}
