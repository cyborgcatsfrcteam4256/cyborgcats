import { z } from 'zod';

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

export type MessageFormData = z.infer<typeof messageSchema>;
