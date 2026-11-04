import { sendEmail } from "@/src/lib/email";
import { emailApiKey } from "@/src/lib/env";

const SUBJECTS = ["general", "project", "job", "other"] as const;
const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// Only the four form fields are forwarded to StaticForms. Anything else in the
// request body is ignored, so the endpoint cannot be used to set arbitrary
// StaticForms fields (reply-to, redirects, etc.).
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ status: 400, message: "Invalid JSON" }, 400);
  }

  // Honeypot: real visitors never see this field. Pretend success so bots
  // do not learn they were caught.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json({ status: 200 }, 200);
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const subject = data.subject;
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (
    name.length > LIMITS.name ||
    !email ||
    email.length > LIMITS.email ||
    !EMAIL_RE.test(email) ||
    !SUBJECTS.includes(subject as (typeof SUBJECTS)[number]) ||
    !message ||
    message.length > LIMITS.message
  ) {
    return json({ status: 400, message: "Invalid form data" }, 400);
  }

  const formData = new FormData();
  formData.append("apiKey", emailApiKey!);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", `SUBJECT: ${subject}\n\n${message}`);

  const res = await sendEmail(formData);
  return json(res, res.status);
}
