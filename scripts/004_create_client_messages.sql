-- Create client_messages table for unified messaging (syncs with contacts from vitrine)
-- This table stores messages from both authenticated clients (Resend) and vitrine contacts (Web3Forms)
CREATE TABLE IF NOT EXISTS public.client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- user_id is NULL for vitrine contacts (Web3Forms), set for authenticated clients
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  -- contact_id links to the original contact from vitrine form if applicable
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'client' CHECK (source IN ('vitrine', 'client')),
  -- Direction: inbound = client to TEKNOPY, outbound = TEKNOPY to client
  direction TEXT NOT NULL DEFAULT 'inbound' CHECK (direction IN ('inbound', 'outbound')),
  is_read BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  email_provider TEXT CHECK (email_provider IN ('web3forms', 'resend')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on client_messages
ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_messages
-- Authenticated users can see their own messages
CREATE POLICY "client_messages_select_own" ON public.client_messages 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "client_messages_insert_own" ON public.client_messages 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_client_messages_user_id ON public.client_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_client_messages_contact_id ON public.client_messages(contact_id);
CREATE INDEX IF NOT EXISTS idx_client_messages_created_at ON public.client_messages(created_at DESC);

-- Update contacts table to add user_id for linking authenticated users
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS is_converted BOOLEAN DEFAULT false;
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS converted_at TIMESTAMPTZ;

-- Index for contacts user_id
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON public.contacts(user_id);
