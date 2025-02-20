import * as z from "zod";

// Define schema for the MembershipPlan based on the interface
export const membershipSchema = z.object({
  id: z.string().optional(),
  amount: z
    .string()
    .regex(/^\d*\.?\d*$/, "Amount must be a valid number")
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, "Amount must be greater than 0"),
  name: z.string().nonempty("Title is required"),
  features: z
    .array(z.object({ title: z.string().nonempty("Feature cannot be empty") }))
    .min(1, "At least one feature is required"), // List should contain at least one feature
  description: z.string().optional(), // Optional field
  currency: z.string().optional(), // Optional field
  billingInterval: z.enum(["month", "year", "lifetime"], {
    errorMap: () => ({
      message: "Billing interval must be 'monthly', 'yearly', or 'lifetime'",
    }),
  }), // Billing interval should be one of these values
  active: z.boolean().optional(), // Optional boolean
  intervalCount: z.number().int().optional(), // Optional interval count
  freeTrailDays: z.number().int().optional(), // Optional free trial days
  createdAt: z.string().optional(), // Optional timestamp
  updatedAt: z.string().optional(), // Optional timestamp
});

// Infer the TypeScript type from the schema
export type MembershipPlanType = z.infer<typeof membershipSchema>;
