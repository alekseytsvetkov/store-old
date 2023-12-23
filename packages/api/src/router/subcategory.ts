import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@store/db';
import { TRPCError } from '@trpc/server';

export const subcategoryRouter = createTRPCRouter({
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

      const items = await prisma.subcategory.findMany({
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
          category: true,
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
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const subcategory = await prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      if (!subcategory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No subcategory with id '${id}'`,
        });
      }
      return subcategory;
    }),
  byCategoryId: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { categoryId } = input;
      const categories = await prisma.subcategory.findMany({
        where: { categoryId },
      });
      if (!categories) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No one subcategory with categoryId '${categoryId}'`,
        });
      }
      return categories;
    }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        categoryId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, categoryId } = input;
      const subcategory = await prisma.subcategory.create({
        data: {
          name,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
        include: {
          category: true,
        },
      });
      return subcategory;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        categoryId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, name, categoryId } = input;
      const subcategory = await prisma.subcategory.update({
        where: { id },
        data: {
          name,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
        include: {
          category: true,
        },
      });
      return subcategory;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const subcategory = await prisma.subcategory.delete({
        where: { id },
      });
      return subcategory;
    }),
});
