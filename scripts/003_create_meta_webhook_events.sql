-- Table for storing Meta (Facebook/Instagram/WhatsApp) webhook events
-- Used by /api/webhooks/meta endpoint

CREATE TABLE IF NOT EXISTS meta_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  sender_id VARCHAR(100),
  recipient_id VARCHAR(100),
  lead_id VARCHAR(100),
  form_id VARCHAR(100),
  page_id VARCHAR(100),
  content TEXT,
  event_timestamp TIMESTAMPTZ NOT NULL,
  raw_data JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_meta_events_type ON meta_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_meta_events_timestamp ON meta_webhook_events(event_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_meta_events_processed ON meta_webhook_events(processed);
CREATE INDEX IF NOT EXISTS idx_meta_events_lead_id ON meta_webhook_events(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_meta_events_page_id ON meta_webhook_events(page_id) WHERE page_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE meta_webhook_events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to insert (webhooks)
CREATE POLICY "Allow service role insert" ON meta_webhook_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Allow authenticated users to read events
CREATE POLICY "Allow authenticated read" ON meta_webhook_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_meta_events_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS trigger_meta_events_updated_at ON meta_webhook_events;
CREATE TRIGGER trigger_meta_events_updated_at
  BEFORE UPDATE ON meta_webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION update_meta_events_updated_at();

-- Comment on table
COMMENT ON TABLE meta_webhook_events IS 'Stores webhook events from Meta platforms (Facebook, Instagram, WhatsApp)';
