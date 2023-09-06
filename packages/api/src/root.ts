import { authRouter, userRouter, sectionRouter, categoryRouter, productRouter } from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  section: sectionRouter,
  category: categoryRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
