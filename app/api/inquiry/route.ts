import { normalizeInquiry, validateInquiry, type ProjectInquiry } from "@/lib/inquiry";
import { NextResponse } from "next/server";

/**
 * Project inquiry endpoint.
 *
 * Future integration:
 * Set INQUIRY_WEBHOOK_URL to a secure server-side webhook
 * (Formspree, Resend, custom API, etc.) — never expose secrets in the client.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { status: "error", message: "Invalid request body." },
      { status: 400 },
    );
  }

  const raw = body as ProjectInquiry;
  const normalized = normalizeInquiry({
    name: String(raw?.name ?? ""),
    email: String(raw?.email ?? ""),
    projectType: String(raw?.projectType ?? ""),
    budget: raw?.budget ? String(raw.budget) : undefined,
    details: String(raw?.details ?? ""),
    projectLink: raw?.projectLink ? String(raw.projectLink) : undefined,
    website: raw?.website ? String(raw.website) : "",
  });

  // Honeypot trip — pretend success to bots
  if (normalized.website) {
    return NextResponse.json({ status: "ok" });
  }

  const validation = validateInquiry(normalized);
  if (!validation.ok) {
    return NextResponse.json(
      { status: "invalid", errors: validation.errors },
      { status: 400 },
    );
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL?.trim();

  if (!webhook) {
    return NextResponse.json(
      {
        status: "not_configured",
        message:
          "Inquiry delivery is not connected yet. Set INQUIRY_WEBHOOK_URL on the server.",
      },
      { status: 501 },
    );
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...normalized,
        source: "portfolio-inquiry",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Delivery failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Delivery failed." },
      { status: 502 },
    );
  }
}
