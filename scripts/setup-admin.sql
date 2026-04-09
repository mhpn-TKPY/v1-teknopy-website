-- Script to configure admin user for TEKNOPY
-- Admin email: manuel.harpon@teknopy.com

-- First, check if user exists with this email
-- If user exists, update their profile to be admin
-- If user doesn't exist, they need to register first via /auth/inscription

-- Update existing user to admin if they exist
UPDATE profiles
SET is_admin = true
WHERE email = 'manuel.harpon@teknopy.com';

-- If no rows were updated, it means the user doesn't exist yet
-- They need to register first at /auth/inscription with email: manuel.harpon@teknopy.com

-- Also ensure any other admins (like contact@plistech.com) remain admin if they exist
-- This doesn't change email sending configurations

-- Verify the update
SELECT id, email, first_name, last_name, is_admin 
FROM profiles 
WHERE email = 'manuel.harpon@teknopy.com' OR is_admin = true;
