import { z } from 'zod';

// Allowed file MIME types for resource uploads
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/csv',
];

const ALLOWED_FILE_EXTENSIONS = ['pdf', 'zip', 'xls', 'xlsx', 'doc', 'docx', 'txt', 'csv'];

// Maximum file size: 25MB
const MAX_FILE_SIZE = 25 * 1024 * 1024;

export const resourceSubmissionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must be less than 5000 characters'),
  category: z
    .string()
    .min(1, 'Please select a category'),
  resourceType: z
    .enum(['link', 'file'], {
      errorMap: () => ({ message: 'Please select a resource type' }),
    }),
  externalUrl: z
    .string()
    .trim()
    .max(2048, 'URL must be less than 2048 characters')
    .optional()
    .refine(
      (url) => {
        if (!url) return true;
        try {
          const parsedUrl = new URL(url);
          // Block dangerous URL schemes
          const dangerousSchemes = ['javascript', 'data', 'file', 'vbscript'];
          return !dangerousSchemes.includes(parsedUrl.protocol.replace(':', '').toLowerCase());
        } catch {
          return false;
        }
      },
      'Invalid URL or unsafe URL scheme detected'
    )
    .refine(
      (url) => {
        if (!url) return true;
        // Must be a valid URL
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      'Please enter a valid URL (e.g., https://example.com)'
    ),
  tags: z
    .string()
    .trim()
    .max(500, 'Tags must be less than 500 characters')
    .optional()
    .or(z.literal('')),
  file: z
    .any()
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      'File must be smaller than 25MB'
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ALLOWED_FILE_TYPES.includes(file.type);
      },
      `Invalid file type. Allowed types: ${ALLOWED_FILE_EXTENSIONS.join(', ').toUpperCase()}`
    ),
}).refine(
  (data) => {
    // If type is link, externalUrl is required
    if (data.resourceType === 'link') {
      return !!data.externalUrl && data.externalUrl.length > 0;
    }
    return true;
  },
  {
    message: 'Please provide a link to the resource',
    path: ['externalUrl'],
  }
).refine(
  (data) => {
    // If type is file, file is required
    if (data.resourceType === 'file') {
      return !!data.file;
    }
    return true;
  },
  {
    message: 'Please select a file to upload',
    path: ['file'],
  }
);

export type ResourceSubmissionFormData = z.infer<typeof resourceSubmissionSchema>;
