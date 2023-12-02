import { env } from '@/env.mjs'
import { AuthInput } from '@/lib/schemas/auth'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import fs from 'fs'
import path from 'path'

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(async ({ ctx }) => {
    return ctx.session
  }),
  signUp: publicProcedure.input(AuthInput).mutation(async ({ input }) => {
    if (env.NEXT_PASSWORD) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Password has already been set',
      })
    }
    const str = `\nNEXT_PASSWORD=${input.password}`

    const envPath = path.resolve(__dirname, '../../../../../../.env.local')
    fs.appendFileSync(envPath, str)
    return
  }),
})
