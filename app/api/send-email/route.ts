import { NextResponse } from "next/server"

const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "dd2f81b5-56ac-4e05-8320-ae65fddec383"

/**
 * Proxy route: receives email payloads from the client and forwards them to
 * Web3Forms server-to-server. This avoids the vusercontent sandbox blocking
 * outbound fetch calls from the browser, while working correctly in production
 * on Vercel (which has no Cloudflare block on standard IPs).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

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
