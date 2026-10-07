-- ==============================================================================
-- GRAND LINE VAULT — ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Versión: v0.1.0
-- Compatible con: Supabase Auth & Row Level Security (RLS)
-- ==============================================================================

-- 1. TABLA: Catálogo Oficial de Cartas (cards)
CREATE TABLE IF NOT EXISTS public.cards (
    id VARCHAR(50) PRIMARY KEY, -- Ej: 'OP01-001', 'OP05-060'
    set_id VARCHAR(20) NOT NULL, -- Ej: 'OP-01', 'OP-05', 'ST-01'
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    category VARCHAR(50) NOT NULL, -- 'Leader', 'Character', 'Event', 'Stage'
    color VARCHAR(100) NOT NULL, -- 'Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow'
    card_type VARCHAR(255), -- 'Supernovas / Straw Hat Crew', etc.
    cost INTEGER,
    life INTEGER,
    power INTEGER,
    counter INTEGER,
    rarity VARCHAR(20) NOT NULL, -- 'L', 'C', 'UC', 'R', 'SR', 'SEC', 'SP'
    effect TEXT,
    attribute VARCHAR(50), -- 'Slash', 'Strike', 'Special', etc.
    image_url TEXT NOT NULL,
    is_alt_art BOOLEAN DEFAULT FALSE,
    cardtrader_search VARCHAR(255),
    estimated_price NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices de búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_cards_set ON public.cards(set_id);
CREATE INDEX IF NOT EXISTS idx_cards_color ON public.cards(color);
CREATE INDEX IF NOT EXISTS idx_cards_rarity ON public.cards(rarity);

-- 2. TABLA: Colección Personal de Cada Usuario (user_collections)
CREATE TABLE IF NOT EXISTS public.user_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id VARCHAR(50) REFERENCES public.cards(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER DEFAULT 1 CHECK (quantity >= 0),
    is_wishlist BOOLEAN DEFAULT FALSE,
    is_foil BOOLEAN DEFAULT FALSE,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, card_id)
);

CREATE INDEX IF NOT EXISTS idx_user_collections_user ON public.user_collections(user_id);

-- 3. TABLA: Tablón Comunitario de Intercambios (trade_posts)
CREATE TABLE IF NOT EXISTS public.trade_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    location VARCHAR(255) NOT NULL,
    has_cards JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de cartas que ofrece
    wants_cards JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array de cartas que busca
    notes TEXT,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_posts ENABLE ROW LEVEL SECURITY;

-- Reglas para 'cards': Cualquier usuario puede leer las cartas
CREATE POLICY "Cartas visibles públicamente" 
ON public.cards FOR SELECT 
USING (true);

-- Reglas para 'user_collections':
-- Cada usuario solo puede ver su propia colección
CREATE POLICY "Usuarios ven su propia colección" 
ON public.user_collections FOR SELECT 
USING (auth.uid() = user_id);

-- Cada usuario solo puede insertar o modificar su propia colección
CREATE POLICY "Usuarios modifican su propia colección" 
ON public.user_collections FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Reglas para 'trade_posts':
-- Cualquier usuario autenticado o visitante puede ver los anuncios activos
CREATE POLICY "Anuncios de intercambio visibles públicamente" 
ON public.trade_posts FOR SELECT 
USING (status = 'active');

-- Solo el autor puede crear o modificar su anuncio
CREATE POLICY "Usuarios gestionan sus propios anuncios" 
ON public.trade_posts FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
