-- Add email verification columns to contacts table
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS verification_token TEXT,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS service TEXT;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_contacts_verification_token ON public.contacts(verification_token);

-- Allow service role to update contacts for verification
CREATE POLICY "Allow service role to update contacts" ON public.contacts
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Allow service role to select contacts for verification
CREATE POLICY "Allow service role to select contacts" ON public.contacts
  FOR SELECT 
  USING (true);
