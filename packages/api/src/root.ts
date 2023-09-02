import { authRouter, serviceRouter } from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  service: serviceRouter,
});

export type AppRouter = typeof appRouter;
