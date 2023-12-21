import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@store/ui';
import { useState } from 'react';
import { signIn, signOut, useSession } from '@store/auth/react';
import { RoleTypes } from '@store/db/types';
import { CogIcon, Loader2, LogIn, LogOutIcon, StoreIcon, UserCircleIcon } from '@store/ui/icons';
import { cn } from '@store/ui/cn';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function UserNav() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role?.includes(RoleTypes.ADMIN);
  const isMod = session?.user?.role?.includes(RoleTypes.MODERATOR);
  const isAdminOrMod = isAdmin || isMod;

  // NOTE: 1. loading == true -> 2. signIn() -> 3. session status == 'loading' (loading == false)
  const handleSignIn = async () => {
    try {
      setLoading(true);
      // page reloads after sign in, so no need to setLoading(false), othersiwe ugly visual glitch
      await signIn('discord', { redirect: false });
    } catch (error) {
      // only set loading to false if there was an error and page didn't reload after sign in
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    // whatever
    window.location.reload();
  };

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image ?? 'https://cal.com/base-rskish/avatar.png'}
              alt={session.user.name ?? 'user'}
              height={8}
              width={8}
            />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/dashboard/profile">
              <UserCircleIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('profile')}
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/dashboard/stores">
              <StoreIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('stores')}
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:cursor-pointer">
            <Link href="/dashboard/settings">
              <CogIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('settings')}
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="hover:cursor-pointer" onClick={handleSignOut}>
            <Link href="/">
              <LogOutIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('logout')}
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className={cn(
        'focus:bg-accent w-20 rounded-lg bg-transparent p-2 text-black duration-300 hover:bg-gray-200 focus:outline-none dark:text-white hover:dark:bg-gray-800',
        loading || (status === 'loading' && 'w-10'),
      )}
      disabled={loading || status === 'loading'}
      onClick={handleSignIn}
    >
      {loading || status === 'loading' ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <div className="flex items-center space-x-2">
          <LogIn className="h-5 w-5" />
          <span className="dark:text-white">Login</span>
        </div>
      )}
    </Button>
  );
}
