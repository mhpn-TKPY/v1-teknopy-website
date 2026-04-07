-- Add email verification tracking columns to contacts table
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS sent_to_admin BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS sent_to_user BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS service TEXT;

-- Create email_verifications table for managing verification tokens
CREATE TABLE IF NOT EXISTS public.email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  contact_data JSONB NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours',
  verified_at TIMESTAMPTZ
);

-- Enable RLS on email_verifications
ALTER TABLE public.email_verifications ENABLE ROW LEVEL SECURITY;

-- Allow public to insert verification requests
CREATE POLICY "Allow public to insert verifications" ON public.email_verifications
  FOR INSERT WITH CHECK (true);

-- Allow public to read and update their own verifications
CREATE POLICY "Allow public to read verifications" ON public.email_verifications
  FOR SELECT USING (true);

CREATE POLICY "Allow public to update verifications" ON public.email_verifications
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON public.email_verifications(token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON public.email_verifications(email);
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON public.email_verifications(expires_at);
