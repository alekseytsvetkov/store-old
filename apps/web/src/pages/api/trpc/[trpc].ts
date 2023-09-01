import { createTRPCContext } from '@store/api/src/trpc';
import { appRouter } from '@store/api/src/root';
import { createNextApiHandler } from "@trpc/server/adapters/next";


// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
