-- Create client_projects table for tracking client projects in their dashboard
CREATE TABLE IF NOT EXISTS public.client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'review', 'completed', 'cancelled')),
  service_type TEXT NOT NULL,
  start_date DATE,
  estimated_end_date DATE,
  actual_end_date DATE,
  budget DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on client_projects
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;

-- RLS policies for client_projects - clients can only see their own projects
CREATE POLICY "client_projects_select_own" ON public.client_projects 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "client_projects_insert_own" ON public.client_projects 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "client_projects_update_own" ON public.client_projects 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "client_projects_delete_own" ON public.client_projects 
  FOR DELETE USING (auth.uid() = user_id);

-- Apply updated_at trigger to client_projects
DROP TRIGGER IF EXISTS update_client_projects_updated_at ON public.client_projects;
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON public.client_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
