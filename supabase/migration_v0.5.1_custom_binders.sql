-- ==============================================================================
-- GRAND LINE VAULT — MIGRACIÓN: SINCRONIZACIÓN DE CARPETAS PERSONALIZADAS EN LA NUBE
-- Versión: v0.5.1
-- ==============================================================================

-- 1. Añadir columna custom_binders a la tabla profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS custom_binders JSONB DEFAULT '[]'::jsonb;

-- Comentario informativo en la columna
COMMENT ON COLUMN public.profiles.custom_binders IS 'Estructura JSONB de las carpetas y páginas del álbum virtual personalizado (Vault X) con ranuras y cartas asignadas libremente';
