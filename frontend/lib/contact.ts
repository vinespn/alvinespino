export const limits = { name: 100, email: 254, message: 5000 };

export type ContactInput = { name: string; email: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

type Result =
  { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: unknown): Result {
  const raw = (
    typeof input === "object" && input !== null ? input : {}
  ) as Record<string, unknown>;

  // Collapse whitespace in the name so it can't contain line breaks.
  const name =
    typeof raw.name === "string" ? raw.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  const errors: FieldErrors = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = "That name is too long.";

  if (!email || !emailPattern.test(email) || email.length > limits.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.length < 10)
    errors.message = "Please write at least a few words.";
  else if (message.length > limits.message)
    errors.message = "That message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
