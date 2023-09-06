import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession, type DefaultSession, type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import type { Role, RoleTypes } from '@store/db/types';

import { prisma } from '@store/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string;
      // ...other properties
      role: RoleTypes[];
    };
  }

  interface User {
    createdAt: Date;
    roles: Role[];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    redirect: ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    session: async ({ session, user }) => {
      // 1. State
      let userRoles: RoleTypes[] = [];

      // 2. If user already has roles, reduce them to a RoleTypes array.
      if (user.roles) {
        userRoles = user.roles.reduce((acc: RoleTypes[], role) => {
          acc.push(role.role);
          return acc;
        }, []);
      }

      // 3. If the current user doesn't have a USER role. Assign one.
      if (!userRoles.includes('USER')) {
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            roles: {
              connectOrCreate: {
                where: {
                  role: 'USER',
                },
                create: {
                  role: 'USER',
                },
              },
            },
          },
          include: {
            roles: true,
          },
        });

        userRoles = updatedUser.roles.reduce((acc: RoleTypes[], role) => {
          acc.push(role.role);
          return acc;
        }, []);
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: userRoles,
          createAt: user.createdAt,
        },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
