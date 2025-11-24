import { z } from 'zod';

export const photoSubmissionSchema = z.object({
  caption: z
    .string()
    .max(500, 'Caption must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  category: z
    .string()
    .min(1, 'Please select a category'),
  file: z
    .any()
    .refine((file) => file !== null, 'Please select a photo to upload')
    .refine(
      (file) => file && file.type?.startsWith('image/'),
      'Please select an image file (JPG, PNG, etc.)'
    )
    .refine(
      (file) => file && file.size <= 20 * 1024 * 1024,
      'Image must be smaller than 20MB'
    ),
});

export type PhotoSubmissionFormData = z.infer<typeof photoSubmissionSchema>;
