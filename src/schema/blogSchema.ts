import * as z from "zod";

export const blogPostSchema = z.object({
  authorId: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  services: z.string().min(1, "Service is required"),
  title: z
    .string()
    .min(1, "Blog title is required")
    .max(100, "Blog title must be 100 characters or less"),
  content: z.string().nonempty("Content is required."),
  banner: z
    .instanceof(FileList)
    .optional()
    .refine((files) => {
      return (
        files?.length === 0 || (files?.length === 1 && files[0] instanceof File)
      );
    }, "Please upload a single file"),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
