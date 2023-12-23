import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@store/db';
import { TRPCError } from '@trpc/server';

export const productRouter = createTRPCRouter({
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

      const items = await prisma.product.findMany({
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
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with id '${id}'`,
        });
      }
      return product;
    }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        price: z.number(),
        categoryId: z.string().uuid(),
        subcategoryId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, price, categoryId, subcategoryId } = input;
      const product = await prisma.product.create({
        data: {
          name,
          price,
          category: {
            connect: {
              id: categoryId,
            },
          },
          subcategory: {
            connect: {
              id: subcategoryId,
            },
          },
        },
        include: {
          category: true,
          subcategory: true,
        },
      });
      return product;
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
      const product = await prisma.product.update({
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
      return product;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const product = await prisma.product.delete({
        where: { id },
      });
      return product;
    }),
});
