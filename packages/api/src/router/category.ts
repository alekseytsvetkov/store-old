import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../trpc";
import { prisma } from "@store/db"
import { TRPCError } from "@trpc/server";

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
          section: true
        }
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
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          section: true
        }
      });
      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No category with id '${id}'`,
        });
      }
      return category;
    }),
  bySectionId: publicProcedure
    .input(
      z.object({
        sectionId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { sectionId } = input;
      const categories = await prisma.category.findMany({
        where: { sectionId },
      });
      if (!categories) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No one category with sectionId '${sectionId}'`,
        });
      }
      return categories;
    }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        name: z.string().min(1).max(32),
        sectionId: z.string().uuid()
      }),
    )
    .mutation(async ({ input }) => {
      const { name, sectionId } = input;
      const category = await prisma.category.create({
        data: {
          name,
          section: {
            connect: {
              id: sectionId
            }
          }
        },
        include: {
          section: true
        }
      });
      return category;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        sectionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, name, sectionId } = input;
      const category = await prisma.category.update({
        where: { id },
        data: {
          name,
          section: {
            connect: {
              id: sectionId
            }
          }
        },
        include: {
          section: true
        }
      })
      return category;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const category = await prisma.category.delete({
        where: { id }
      })
      return category;
    }),
});
