-- ==============================================================================
-- GRAND LINE VAULT — TABLA DE PERFILES DE USUARIO (PROFILES)
-- Versión: v0.4.0 (User Profile Customization & 30-day username cooldown)
-- ==============================================================================

-- 1. Crear tabla de perfiles vinculada a auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(30) UNIQUE,
    full_name VARCHAR(100),
    avatar_url TEXT,
    pirate_title VARCHAR(50) DEFAULT 'Novato del East Blue',
    bio VARCHAR(160),
    newsletter_opt_in BOOLEAN DEFAULT FALSE,
    username_changed_at TIMESTAMP WITH TIME ZONE,
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Índice único e insensible a mayúsculas para evitar nombres de usuario duplicados
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_lower 
ON public.profiles(LOWER(username));

-- 3. Habilitar Seguridad por Filas (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de Seguridad (RLS)
-- Cualquier usuario puede ver perfiles públicos (para Trade Board y comunidad)
DROP POLICY IF EXISTS "Perfiles visibles públicamente" ON public.profiles;
CREATE POLICY "Perfiles visibles públicamente" 
ON public.profiles FOR SELECT 
USING (true);

-- Cada usuario puede insertar su propio perfil
DROP POLICY IF EXISTS "Usuarios insertan su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios insertan su propio perfil" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Cada usuario puede actualizar su propio perfil
DROP POLICY IF EXISTS "Usuarios actualizan su propio perfil" ON public.profiles;
CREATE POLICY "Usuarios actualizan su propio perfil" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 5. Función y Trigger automático al registrar un nuevo usuario en auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
BEGIN
  -- Generar username base a partir del email o nombre
  base_username := LOWER(REGEXP_REPLACE(SPLIT_PART(NEW.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g'));
  IF base_username IS NULL OR LENGTH(base_username) < 3 THEN
    base_username := 'pirata_' || SUBSTRING(NEW.id::text, 1, 6);
  END IF;

  INSERT INTO public.profiles (
    id, 
    username, 
    full_name, 
    avatar_url, 
    pirate_title,
    newsletter_opt_in
  )
  VALUES (
    NEW.id,
    base_username,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', ''),
    'Novato del East Blue',
    FALSE
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Insertar perfiles para usuarios existentes que ya estén en auth.users
INSERT INTO public.profiles (id, username, full_name, avatar_url, pirate_title, newsletter_opt_in)
SELECT 
  u.id,
  LOWER(REGEXP_REPLACE(SPLIT_PART(u.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g')),
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  COALESCE(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture', ''),
  'Novato del East Blue',
  FALSE
FROM auth.users u
ON CONFLICT (id) DO NOTHING;
