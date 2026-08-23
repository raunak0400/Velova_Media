"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils/cn";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full bg-transparent border-b border-border py-3 text-body text-text placeholder:text-text-2 focus:outline-none focus:border-accent-text transition-colors";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" loading={pending}>
      Send Message
    </Button>
  );
}

/**
 * Progressive enhancement: the underlying <form action={formAction}> works
 * with JS disabled via the Server Action itself — this Client wrapper only
 * adds inline field-level error feedback and the pending-button state.
 * See Design Architecture §8/§14.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="corner-card-lg border border-border bg-surface p-10 text-center" role="status">
        <p className="font-display text-h4 text-text mb-2">Message sent.</p>
        <p className="text-body text-text-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="text-caption text-text-2 block mb-2">
            Full name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} aria-invalid={!!state.fieldErrors?.name} />
          {state.fieldErrors?.name && <p className="text-small text-error mt-2">{state.fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-caption text-text-2 block mb-2">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} aria-invalid={!!state.fieldErrors?.email} />
          {state.fieldErrors?.email && <p className="text-small text-error mt-2">{state.fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className="text-caption text-text-2 block mb-2">
            Phone / WhatsApp (optional)
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="service" className="text-caption text-text-2 block mb-2">
            Service you&apos;re interested in
          </label>
          <select id="service" name="service" className={cn(inputClasses, "appearance-none")}>
            <option value="">Not sure yet</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.navLabel}>
                {s.navLabel}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-caption text-text-2 block mb-2">
          Tell us about your brand
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn(inputClasses, "resize-none")}
          aria-invalid={!!state.fieldErrors?.message}
        />
        {state.fieldErrors?.message && <p className="text-small text-error mt-2">{state.fieldErrors.message}</p>}
      </div>

      {state.status === "error" && state.message && !state.fieldErrors && (
        <p className="text-small text-error">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  );
}
