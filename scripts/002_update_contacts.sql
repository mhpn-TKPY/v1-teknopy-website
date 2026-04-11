-- Add missing columns to contacts table for full form data
ALTER TABLE public.contacts 
ADD COLUMN IF NOT EXISTS services TEXT,
ADD COLUMN IF NOT EXISTS estimated_total TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new',
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);

-- Allow admins to read all contacts (for dashboard)
CREATE POLICY IF NOT EXISTS "Allow authenticated users to read contacts" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update contact status
CREATE POLICY IF NOT EXISTS "Allow authenticated users to update contacts" ON public.contacts
  FOR UPDATE USING (auth.role() = 'authenticated');
