"use server";

import { contactFormSchema, type ContactFormValues } from "@/lib/validation/contact";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
}

/**
 * Server Action so the form works with JS disabled — the Client layer
 * (ContactForm) only adds inline validation feedback and the loading-button
 * state on top of this. See Design Architecture §8/§14.
 *
 * TODO(client): this validates and logs the submission but doesn't yet
 * send it anywhere — no email/CRM provider credentials were supplied.
 * Wire in a real provider (e.g. Resend, SendGrid, or a CRM webhook) here
 * before launch; until then, submissions are not actually delivered.
 */
export async function submitContactForm(_prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues;
      if (key) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  // TODO(client): send parsed.data to a real email/CRM provider.
  console.log("[contact-form] submission received:", parsed.data);

  return { status: "success", message: "Thanks — we'll reply within one business day." };
}
