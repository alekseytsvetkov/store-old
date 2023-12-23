import {
  authRouter,
  userRouter,
  categoryRouter,
  subcategoryRouter,
  productRouter,
  storeRouter,
  orderRouter,
} from './router';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  category: categoryRouter,
  subcategory: subcategoryRouter,
  product: productRouter,
  store: storeRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
