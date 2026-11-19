"use client";

import { useRef, useState, type FormEvent } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { limits, validateContact, type FieldErrors } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);

    const result = validateContact({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});

    if (!token) {
      setStatus("error");
      setMessage("Please complete the verification first.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          website: fd.get("website") ?? "",
          turnstileToken: token,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
      setMessage("Thanks! Your message was sent. I'll reply soon.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    } finally {
      // A Turnstile token can only be used once, so get a fresh one.
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={limits.name}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={limits.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={limits.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {siteKey ? (
        <Turnstile
          ref={turnstileRef}
          siteKey={siteKey}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400">
          Turnstile site key is missing.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-accent text-accent-foreground focus-visible:outline-accent inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {/* Announced to screen readers when the result changes */}
      <p
        role="status"
        className={
          status === "error"
            ? "text-sm text-red-600 dark:text-red-400"
            : "text-accent text-sm"
        }
      >
        {status === "success" || status === "error" ? message : ""}
      </p>
    </form>
  );
}
