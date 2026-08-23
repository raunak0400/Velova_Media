import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional(),
  service: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little more about what you need."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
