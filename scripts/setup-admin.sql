-- =====================================================
-- TEKNOPY Admin Setup Script
-- Admin: manuel.harpon@teknopy.com
-- =====================================================

-- 1. Create function to auto-set admin for specific email
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- If the new user has the admin email, set is_admin to true
  IF NEW.email = 'manuel.harpon@teknopy.com' THEN
    UPDATE public.profiles 
    SET is_admin = true 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

-- 3. Create trigger to run after user creation
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin();

-- 4. If admin already exists, ensure they have admin privileges
-- Note: email is in auth.users, not profiles
UPDATE public.profiles 
SET is_admin = true 
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'manuel.harpon@teknopy.com'
);

-- =====================================================
-- NOTE: To initialize the admin account via API:
-- 
-- 1. Set environment variable: ADMIN_SETUP_KEY=your-secret-key
-- 
-- 2. Call POST /api/admin/init with:
--    {
--      "setupKey": "your-secret-key",
--      "password": "your-admin-password"
--    }
-- =====================================================
