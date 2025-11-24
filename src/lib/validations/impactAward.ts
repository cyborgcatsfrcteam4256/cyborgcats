import { z } from 'zod';

export const impactAwardDocumentationSchema = z.object({
  documentation_id: z
    .string()
    .min(1, 'Documentation ID is required')
    .regex(/^ID-\d{3}$/, 'Documentation ID must be in format ID-XXX'),
  team_number: z
    .string()
    .max(100, 'Team number must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  activity_description: z
    .string()
    .min(10, 'Activity description must be at least 10 characters')
    .max(5000, 'Activity description must be less than 5000 characters'),
  activity_date: z
    .string()
    .min(1, 'Activity date is required'),
  activity_location: z
    .string()
    .max(200, 'Location must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  impact_category: z
    .string()
    .min(1, 'Please select an impact category'),
  documentation_type: z
    .string()
    .min(1, 'Please select a documentation type'),
  documentation_url: z
    .string()
    .max(2048, 'URL must be less than 2048 characters')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .max(2000, 'Notes must be less than 2000 characters')
    .optional()
    .or(z.literal('')),
  file: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 20 * 1024 * 1024;
      },
      'Image must be smaller than 20MB'
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.type?.startsWith('image/');
      },
      'Please select an image file (JPG, PNG, etc.)'
    ),
});

export type ImpactAwardDocumentationFormData = z.infer<typeof impactAwardDocumentationSchema>;
