import { authRouter, userRouter, sectionRouter } from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  section: sectionRouter,
});

export type AppRouter = typeof appRouter;
