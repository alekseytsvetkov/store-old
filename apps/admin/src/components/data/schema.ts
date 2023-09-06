import { z } from "zod"

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Section = z.infer<typeof sectionSchema>

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  section: sectionSchema,
})

export type Category = z.infer<typeof categorySchema>

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type User = z.infer<typeof userSchema>
