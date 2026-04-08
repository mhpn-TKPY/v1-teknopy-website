-- Add email verification columns to contacts table
-- Run this after 001_create_contacts.sql

-- Add verification_token column
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS verification_token TEXT;

-- Add email_verified column
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

-- Add verified_at column
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMPTZ;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_contacts_verification_token 
ON public.contacts(verification_token);

-- Create index for verified emails
CREATE INDEX IF NOT EXISTS idx_contacts_email_verified 
ON public.contacts(email_verified);

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow service role to update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow service role to select contacts" ON public.contacts;

-- Allow authenticated/service role to update contacts for verification
CREATE POLICY "Allow service role to update contacts" ON public.contacts
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Allow authenticated/service role to select contacts for verification
CREATE POLICY "Allow service role to select contacts" ON public.contacts
  FOR SELECT 
  USING (true);
