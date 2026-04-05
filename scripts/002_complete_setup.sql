-- Complete database setup for Teknopy website
-- This script creates all necessary tables with proper RLS policies

-- ===========================================
-- CONTACTS TABLE - For contact form submissions
-- ===========================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service_interest TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on contacts
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists and recreate
DROP POLICY IF EXISTS "Allow public to insert contacts" ON public.contacts;
CREATE POLICY "Allow public to insert contacts" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Policy for authenticated users (admin) to read contacts
DROP POLICY IF EXISTS "Allow authenticated users to read contacts" ON public.contacts;
CREATE POLICY "Allow authenticated users to read contacts" ON public.contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- ===========================================
-- PROJECTS TABLE - For portfolio projects
-- ===========================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  client_name TEXT,
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can read projects (for portfolio display)
DROP POLICY IF EXISTS "Allow public to read projects" ON public.projects;
CREATE POLICY "Allow public to read projects" ON public.projects
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete projects
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON public.projects;
CREATE POLICY "Allow authenticated users to manage projects" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================
-- SERVICES TABLE - For services offered
-- ===========================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[] DEFAULT '{}',
  price_range TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
DROP POLICY IF EXISTS "Allow public to read active services" ON public.services;
CREATE POLICY "Allow public to read active services" ON public.services
  FOR SELECT USING (is_active = true);

-- Authenticated users can manage services
DROP POLICY IF EXISTS "Allow authenticated users to manage services" ON public.services;
CREATE POLICY "Allow authenticated users to manage services" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================
-- TESTIMONIALS TABLE - For client testimonials
-- ===========================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_position TEXT,
  client_image_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can read active testimonials
DROP POLICY IF EXISTS "Allow public to read active testimonials" ON public.testimonials;
CREATE POLICY "Allow public to read active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);

-- Authenticated users can manage testimonials
DROP POLICY IF EXISTS "Allow authenticated users to manage testimonials" ON public.testimonials;
CREATE POLICY "Allow authenticated users to manage testimonials" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================
-- BLOG POSTS TABLE - For blog/news articles
-- ===========================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
DROP POLICY IF EXISTS "Allow public to read published posts" ON public.blog_posts;
CREATE POLICY "Allow public to read published posts" ON public.blog_posts
  FOR SELECT USING (is_published = true);

-- Authenticated users can manage posts
DROP POLICY IF EXISTS "Allow authenticated users to manage posts" ON public.blog_posts;
CREATE POLICY "Allow authenticated users to manage posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ===========================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can subscribe (insert)
DROP POLICY IF EXISTS "Allow public to subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Allow public to subscribe" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Authenticated users can manage subscribers
DROP POLICY IF EXISTS "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow authenticated users to manage subscribers" ON public.newsletter_subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- ===========================================
-- INDEXES for better query performance
-- ===========================================
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);
