import { authRouter, userRouter, serviceRouter } from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  service: serviceRouter,
});

export type AppRouter = typeof appRouter;
