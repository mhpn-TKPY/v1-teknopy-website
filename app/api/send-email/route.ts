import { NextResponse } from "next/server"
import { headers } from "next/headers"

const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "dd2f81b5-56ac-4e05-8320-ae65fddec383"

/**
 * Proxy route: receives email payloads from the client and forwards them to
 * Web3Forms. In the v0 preview sandbox (vusercontent.net) outbound HTTP to
 * external domains is blocked by Cloudflare — we detect this and return a
 * simulated success so the rest of the flow (Supabase token, verify page)
 * can be tested end-to-end. In production on Vercel the real call is made.
 */
export async function POST(request: Request) {
  try {
    const hdrs = await headers()
    const host = hdrs.get("host") ?? ""
    const referer = hdrs.get("referer") ?? ""

    // Detect the v0 preview sandbox.
    // V0_CODE_SERVER_CALLBACK_URL is injected only inside the v0 sandbox environment.
    // In that environment, outbound HTTP to external domains is blocked by Cloudflare.
    // We return a simulated success so the full Supabase flow can be tested end-to-end.
    const isSandbox =
      !!process.env.V0_CODE_SERVER_CALLBACK_URL ||
      process.env.SKIP_EXTERNAL_EMAIL === "true" ||
      host.includes("vusercontent.net") ||
      host.includes("localhost") ||
      referer.includes("vusercontent.net")

    const body = await request.json()

    if (isSandbox) {
      console.log("[send-email] sandbox — skipping Web3Forms for:", body.subject ?? "(no subject)")
      return NextResponse.json({ success: true, sandboxSkipped: true })
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...body }),
    })

    const text = await response.text()

    let data: { success?: boolean; message?: string } = {}
    try {
      data = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { error: `Web3Forms returned non-JSON (HTTP ${response.status})` },
        { status: 502 }
      )
    }

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || "Web3Forms rejected the submission" },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Proxy error" },
      { status: 500 }
    )
  }
}
