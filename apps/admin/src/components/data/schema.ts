import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export const subcategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: categorySchema,
});

export type Subcategory = z.infer<typeof subcategorySchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;
