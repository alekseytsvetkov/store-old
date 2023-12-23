import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '@store/db';

export const orderRouter = createTRPCRouter({
  listByStoreId: protectedProcedure
    .input(
      z.object({
        storeId: z.string().uuid(),
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
      const { cursor, storeId } = input;

      const items = await prisma.order.findMany({
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {
          storeId,
        },
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
});
