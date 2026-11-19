import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact } from "@/lib/contact";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !turnstileSecret || !to || !from) {
    console.error("Contact form is missing environment variables.");
    return NextResponse.json(
      { error: "Server is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const raw = (typeof body === "object" && body !== null ? body : {}) as Record<
    string,
    unknown
  >;

  // 1. Honeypot: bots fill it in. Pretend success and do nothing.
  if (typeof raw.website === "string" && raw.website !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. Validate on the server, regardless of what the browser did.
  const result = validateContact(raw);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Please check the form.", fields: result.errors },
      { status: 400 },
    );
  }

  // 3. Verify the Turnstile token with Cloudflare.
  const token =
    typeof raw.turnstileToken === "string" ? raw.turnstileToken : "";
  if (!token) {
    return NextResponse.json(
      { error: "Verification is required." },
      { status: 400 },
    );
  }

  try {
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret: turnstileSecret, response: token }),
      },
    );
    const outcome = (await verify.json()) as { success: boolean };
    if (!outcome.success) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 403 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not verify. Please try again." },
      { status: 502 },
    );
  }

  // 4. Send the email. The Resend SDK returns { data, error } instead of throwing.
  const { name, email, message } = result.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error.message);
    return NextResponse.json(
      { error: "Could not send your message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
