import * as z from 'zod'

export const Search = z.object({
  query: z.string().optional(),
})

export type SearchType = z.infer<typeof Search>
