-- Add missing columns to contacts table for better synchronization
-- This ensures contacts from web3forms have all required fields

-- Add service column if not exists (used by contact form)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contacts' 
    AND column_name = 'service'
  ) THEN
    ALTER TABLE public.contacts ADD COLUMN service TEXT;
  END IF;
END $$;

-- Add status column to track contact progress
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contacts' 
    AND column_name = 'status'
  ) THEN
    ALTER TABLE public.contacts ADD COLUMN status TEXT DEFAULT 'new';
  END IF;
END $$;

-- Add source column to identify where contact came from
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'contacts' 
    AND column_name = 'source'
  ) THEN
    ALTER TABLE public.contacts ADD COLUMN source TEXT DEFAULT 'web3forms';
  END IF;
END $$;

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts(email);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public.contacts(status);
