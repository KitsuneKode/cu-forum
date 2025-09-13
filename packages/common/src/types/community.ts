import { z } from 'zod'

export const communityNameSchema = z
  .string()
  .min(3, { message: 'Community name must be at least 3 characters long' })
  .max(21, { message: 'Community name must be at most 21 characters long' })
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9_]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/, {
    message:
      'Community name must start and end with a letter or number, and can only contain letters, numbers and underscores',
  })
  .regex(/^(?!.*__)/, {
    message: 'Community name cannot contain consecutive underscores',
  })

export const createCommunityInputSchema = z.object({
  name: communityNameSchema,
  description: z.string().min(3),
})

export type CreateCommunityInput = z.infer<typeof createCommunityInputSchema>
