import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Service = z.infer<typeof serviceSchema>
