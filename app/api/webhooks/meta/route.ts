import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

// Meta Webhook Verify Token - should match what you set in Meta Developer Console
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN
const META_APP_SECRET = process.env.META_APP_SECRET

/**
 * Validate Meta webhook signature (X-Hub-Signature-256)
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
 */
function validateSignature(payload: string, signature: string | null): boolean {
  if (!signature || !META_APP_SECRET) {
    console.log('[Meta Webhook] Missing signature or app secret')
    return false
  }

  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', META_APP_SECRET)
    .update(payload)
    .digest('hex')

  const isValid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )

  if (!isValid) {
    console.log('[Meta Webhook] Invalid signature')
  }

  return isValid
}

/**
 * GET - Webhook Verification (required by Meta)
 * Meta sends a GET request to verify the webhook endpoint
 * https://developers.facebook.com/docs/graph-api/webhooks/getting-started
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  // Log verification attempt
  console.log('[Meta Webhook] Verification request:', { mode, token: token ? '***' : null, challenge })

  // Check if mode and token are correct
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Meta Webhook] Verification successful')
    // Return the challenge to complete verification
    return new NextResponse(challenge, { status: 200 })
  }

  console.log('[Meta Webhook] Verification failed - invalid token or mode')
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

/**
 * POST - Receive Webhook Events from Meta
 * Handles incoming webhook notifications for leads, messages, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature validation
    const rawBody = await request.text()
    const signature = request.headers.get('x-hub-signature-256')

    // Validate signature in production
    if (process.env.NODE_ENV === 'production' && META_APP_SECRET) {
      if (!validateSignature(rawBody, signature)) {
        console.log('[Meta Webhook] Signature validation failed')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    
    console.log('[Meta Webhook] Received event:', JSON.stringify(body, null, 2))

    // Validate the webhook payload structure
    if (!body.object || !body.entry) {
      console.log('[Meta Webhook] Invalid payload structure')
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Process different webhook objects
    switch (body.object) {
      case 'page':
        await handlePageEvents(body.entry)
        break
      case 'instagram':
        await handleInstagramEvents(body.entry)
        break
      case 'whatsapp_business_account':
        await handleWhatsAppEvents(body.entry)
        break
      default:
        console.log('[Meta Webhook] Unknown object type:', body.object)
    }

    // Always return 200 OK to acknowledge receipt
    // Meta expects a 200 response within 20 seconds
    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 })
    
  } catch (error) {
    console.error('[Meta Webhook] Error processing webhook:', error)
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 })
  }
}

/**
 * Handle Facebook Page events (leads, messages, etc.)
 */
async function handlePageEvents(entries: any[]) {
  for (const entry of entries) {
    const pageId = entry.id
    const time = entry.time

    console.log('[Meta Webhook] Processing page event for page:', pageId)

    // Process messaging events
    if (entry.messaging) {
      for (const messagingEvent of entry.messaging) {
        await processMessagingEvent(messagingEvent)
      }
    }

    // Process lead gen events
    if (entry.changes) {
      for (const change of entry.changes) {
        if (change.field === 'leadgen') {
          await processLeadGenEvent(change.value, pageId)
        }
        if (change.field === 'messages') {
          await processMessageEvent(change.value, pageId)
        }
      }
    }
  }
}

/**
 * Handle Instagram events
 */
async function handleInstagramEvents(entries: any[]) {
  for (const entry of entries) {
    console.log('[Meta Webhook] Processing Instagram event:', entry.id)
    
    if (entry.changes) {
      for (const change of entry.changes) {
        if (change.field === 'messages') {
          await processInstagramMessage(change.value)
        }
        if (change.field === 'comments') {
          await processInstagramComment(change.value)
        }
      }
    }
  }
}

/**
 * Handle WhatsApp Business events
 */
async function handleWhatsAppEvents(entries: any[]) {
  for (const entry of entries) {
    console.log('[Meta Webhook] Processing WhatsApp event:', entry.id)
    
    if (entry.changes) {
      for (const change of entry.changes) {
        if (change.field === 'messages') {
          await processWhatsAppMessage(change.value)
        }
      }
    }
  }
}

/**
 * Process Facebook Messenger messaging event
 */
async function processMessagingEvent(event: any) {
  const senderId = event.sender?.id
  const recipientId = event.recipient?.id
  const timestamp = event.timestamp

  if (event.message) {
    console.log('[Meta Webhook] New message from:', senderId, 'Text:', event.message.text?.substring(0, 50))
    
    // Store in Supabase
    await storeMetaEvent({
      type: 'facebook_message',
      sender_id: senderId,
      recipient_id: recipientId,
      content: event.message.text || '',
      timestamp: new Date(timestamp).toISOString(),
      raw_data: event
    })
  }

  if (event.postback) {
    console.log('[Meta Webhook] Postback from:', senderId, 'Payload:', event.postback.payload)
  }
}

/**
 * Process Lead Generation event from Facebook Lead Ads
 */
async function processLeadGenEvent(value: any, pageId: string) {
  const leadgenId = value.leadgen_id
  const formId = value.form_id
  const createdTime = value.created_time

  console.log('[Meta Webhook] New lead:', leadgenId, 'from form:', formId)

  // Store lead in Supabase
  await storeMetaEvent({
    type: 'facebook_lead',
    lead_id: leadgenId,
    form_id: formId,
    page_id: pageId,
    timestamp: new Date(createdTime * 1000).toISOString(),
    raw_data: value
  })
}

/**
 * Process message event from changes
 */
async function processMessageEvent(value: any, pageId: string) {
  console.log('[Meta Webhook] Message change event for page:', pageId)
  
  await storeMetaEvent({
    type: 'facebook_message_change',
    page_id: pageId,
    timestamp: new Date().toISOString(),
    raw_data: value
  })
}

/**
 * Process Instagram direct message
 */
async function processInstagramMessage(value: any) {
  console.log('[Meta Webhook] Instagram message:', value)
  
  await storeMetaEvent({
    type: 'instagram_message',
    timestamp: new Date().toISOString(),
    raw_data: value
  })
}

/**
 * Process Instagram comment
 */
async function processInstagramComment(value: any) {
  console.log('[Meta Webhook] Instagram comment:', value)
  
  await storeMetaEvent({
    type: 'instagram_comment',
    timestamp: new Date().toISOString(),
    raw_data: value
  })
}

/**
 * Process WhatsApp message
 */
async function processWhatsAppMessage(value: any) {
  console.log('[Meta Webhook] WhatsApp message:', value)
  
  await storeMetaEvent({
    type: 'whatsapp_message',
    timestamp: new Date().toISOString(),
    raw_data: value
  })
}

/**
 * Store Meta webhook event in Supabase
 */
async function storeMetaEvent(eventData: {
  type: string
  sender_id?: string
  recipient_id?: string
  lead_id?: string
  form_id?: string
  page_id?: string
  content?: string
  timestamp: string
  raw_data: any
}) {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('meta_webhook_events')
      .insert({
        event_type: eventData.type,
        sender_id: eventData.sender_id || null,
        recipient_id: eventData.recipient_id || null,
        lead_id: eventData.lead_id || null,
        form_id: eventData.form_id || null,
        page_id: eventData.page_id || null,
        content: eventData.content || null,
        event_timestamp: eventData.timestamp,
        raw_data: eventData.raw_data,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('[Meta Webhook] Error storing event in Supabase:', error)
    } else {
      console.log('[Meta Webhook] Event stored successfully:', eventData.type)
    }
  } catch (error) {
    console.error('[Meta Webhook] Database error:', error)
  }
}
