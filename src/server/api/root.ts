import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { schemaRouter } from "./routers/schema";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  schema: schemaRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
