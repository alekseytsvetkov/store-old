import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@store/db';
import { TRPCError } from '@trpc/server';

export const categoryRouter = createTRPCRouter({
  list: publicProcedure
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

      const items = await prisma.category.findMany({
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
        include: {
          subcategories: true,
        },
      });
      let nextCursor: typeof cursor | undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          subcategories: true,
        },
      });
      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No category with id '${id}'`,
        });
      }
      return category;
    }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        shortName: z.string().min(1).max(32),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, shortName } = input;
      const category = await prisma.category.create({
        data: {
          name,
          shortName,
        },
      });

      return category;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        shortName: z.string().min(1).max(32),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, name, shortName } = input;
      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          shortName,
        },
      });
      return category;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const category = await prisma.category.delete({
        where: { id },
      });
      return category;
    }),
});
