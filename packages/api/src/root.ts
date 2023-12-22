import { authRouter, userRouter, sectionRouter, categoryRouter, productRouter, storeRouter } from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  section: sectionRouter,
  category: categoryRouter,
  product: productRouter,
  store: storeRouter,
});

export type AppRouter = typeof appRouter;
