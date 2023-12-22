import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';
import { prisma } from '@store/db';
import { TRPCError } from '@trpc/server';

export const storeRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const stores = await prisma.store.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined;
      if (stores.length > limit) {
        // Remove the last item and use it as next cursor
        const nextItem = stores.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: stores.reverse(),
        nextCursor,
      };
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const store = await prisma.store.findUnique({
        where: { id },
      });
      if (!store) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No store with id '${id}'`,
        });
      }
      return store;
    }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        description: z.string().min(1).max(32),
        userId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, description, userId } = input;
      const store = await prisma.store.create({
        data: {
          name,
          description,
          userId,
        },
      });
      return store;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(32),
        description: z.string().min(1).max(32),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, name, description } = input;
      const store = await prisma.store.update({
        where: { id },
        data: {
          name,
          description,
        },
      });
      return store;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const store = await prisma.store.delete({
        where: { id },
      });
      return store;
    }),
});
