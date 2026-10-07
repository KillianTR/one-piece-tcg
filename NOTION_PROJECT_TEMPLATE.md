# 🏴‍☠️ NOTION PROJECT TEMPLATE: GRAND LINE VAULT (One Piece TCG)

> *Copia y pega este contenido en una nueva página de tu Notion para tener la gestión del proyecto, tareas, arquitectura y versiones completamente organizada.*

---

## 📌 FICHA DEL PROYECTO

* **Nombre del Proyecto:** Grand Line Vault — One Piece TCG Tracker & Binder
* **Estado:** 🟢 En Desarrollo Activo (Minor v0.4.0)
* **Despliegue Oficial:** Vercel (`https://grand-line-vault-tcg.vercel.app`)
* **Stack Principal:** React 19 + Vite + Tailwind CSS v4 + Supabase + Vercel
* **Versión Actual:** `v0.4.0` (Minor Update: User Profile Customization & Light Mode Polish)

---

## 🧭 VISIÓN Y OBJETIVO DEL PRODUCTO

Crear una plataforma web atractiva y ultra-rápida donde los coleccionistas y jugadores competitivos de **One Piece TCG** puedan:
1. **Ver su colección en un archivador virtual interactivo estilo Vault X**, pasando páginas de 9 o 12 bolsillos, identificando de un vistazo qué cartas tienen (con brillos holográficos) y cuáles les faltan (en silueta con etiqueta de "Falta").
2. **Consultar un catálogo completo de cartas oficiales** con estadísticas de juego (Coste, Vida, Poder, Habilidad) y filtros por expansión, color y rareza.
3. **Comparar precios y comprar en CardTrader** con un solo clic mediante enlaces directos a cada carta.
4. **Intercambiar cartas repetidas** mediante un tablón comunitario P2P sin comisiones.

---

## 🏷️ SISTEMA DE VERSIONES: SEMVER (ESTILO BLIZZARD / WOW)

Cada versión se define por tres cifras numéricas: **`MAJOR . MINOR . PATCH`** (Ej: `2.0.1`):

| Cifra | Tipo | Equivalencia WoW / Gaming | Cuándo se incrementa |
|---|---|---|---|
| **2** | **MAJOR** | **Expansión** (*The War Within, Dragonflight*) | Gran actualización estructural. Rediseño completo, migración de base de datos o salto a v1.0 / v2.0. |
| **0** | **MINOR** | **Feature / Parche de Contenido** (*Parche x.1*) | Nueva funcionalidad o módulo completo (ej. Álbum Virtual, Sistema de Login con Supabase, Filtros avanzados). No rompe compatibilidad. |
| **1** | **PATCH** | **Hotfix / Corrección rápida** | Reparación de errores en el código, pequeños bugs visuales o mejoras menores de rendimiento. |

---

## 🌿 WORKFLOW DE GIT: TRABAJO POR RAMAS (BRANCHES)

Para mantener el repositorio de GitHub limpio y profesional:

* 🛡️ **`main`**: Rama de producción que se conecta automáticamente a Vercel. Solo contiene versiones estables etiquetadas con tags (ej. `v0.1.0`).
* 🚀 **`feature/<nombre>`**: Ramas de desarrollo para nuevas características:
  * `feature/virtual-binder-v0.1.0`: Maquetación y lógica del archivador Vault X.
  * `feature/supabase-auth-v0.2.0`: Integración con base de datos y autenticación de usuarios.
  * `feature/cardtrader-api`: Integraciones avanzadas con enlaces de mercado.
* 🩹 **`hotfix/<nombre>`**: Ramas urgentes para arreglar fallos rápidos en producción (ej. `hotfix/mobile-layout-bug`).

---

## 🗄️ ESQUEMA DE BASE DE DATOS (SUPABASE / POSTGRESQL)

### Tabla 1: `cards` (Catálogo Oficial)
* `id` (VARCHAR - Primary Key, ej: `'OP01-001'`)
* `set_id` (VARCHAR, ej: `'OP-01'`)
* `name` (VARCHAR)
* `title` (VARCHAR)
* `category` (VARCHAR - Leader, Character, Event, Stage)
* `color` (VARCHAR - Red, Green, Blue, Purple, Black, Yellow)
* `cost` (INT - Nullable)
* `life` (INT - Nullable)
* `power` (INT - Nullable)
* `counter` (INT - Nullable)
* `rarity` (VARCHAR - L, C, UC, R, SR, SEC, SP)
* `effect` (TEXT)
* `attribute` (VARCHAR)
* `image_url` (TEXT)
* `is_alt_art` (BOOLEAN)
* `cardtrader_search` (VARCHAR)
* `estimated_price` (DECIMAL)

### Tabla 2: `user_collections` (Colección de cada Usuario)
* `id` (UUID - Primary Key)
* `user_id` (UUID - Clave foránea a `auth.users`)
* `card_id` (VARCHAR - Clave foránea a `cards.id`)
* `quantity` (INT - Por defecto 1)
* `is_wishlist` (BOOLEAN - Por defecto false)
* `condition` (VARCHAR - Mint, Near Mint, etc.)
* `updated_at` (TIMESTAMP)

### Tabla 3: `trade_posts` (Tablón de Intercambios)
* `id` (UUID - Primary Key)
* `user_id` (UUID - Clave foránea a `auth.users`)
* `location` (VARCHAR)
* `notes` (TEXT)
* `status` (VARCHAR - 'active', 'completed', 'cancelled')
* `created_at` (TIMESTAMP)

---

## 🗺️ ROADMAP Y ENTREGAS POR VERSIONES

### 🏁 v0.1.0 — Alpha (Completada hoy)
- [x] Configuración inicial con React 19, Vite y Tailwind CSS v4.
- [x] Diseño del Álbum Virtual Vault X (piel negra, pespuntes, hojas 3x3 y 4x3).
- [x] Lógica de cartas conseguidas vs cartas faltantes (siluetas y etiquetas).
- [x] Catálogo con filtros por set, color, rareza e inventario.
- [x] Modal de carta con stats oficiales y botón a CardTrader.
- [x] Persistencia en `localStorage`.
- [x] Modal explicativo del sistema de versiones SemVer WoW.

### 🏁 v0.2.0 — Conexión con Supabase (Completada hoy)
- [x] Crear proyecto en Supabase y aplicar el script SQL de tablas.
- [x] Autenticación de usuarios (Registro / Login con Email y OAuth Google/Apple).
- [x] Sincronizar el estado de la colección con PostgreSQL en tiempo real y RLS.
- [x] Migración automática de colección de invitado a cuenta de usuario.

### 🏁 v0.3.0 — Multi-Idioma & Modo Oscuro / Claro (Completada hoy)
- [x] Sistema bilingüe completo (Español / Inglés) con selector en la cabecera.
- [x] Modo Oscuro (Vault X Black) y Modo Claro (Vault X White) con persistencia.
- [x] README bilingüe con selector de idioma y enlace oficial corregido.

### 🟢 v1.0.0 — Official Launch en Vercel (Major Release)
- [ ] Despliegue en subdominio de Vercel y vinculación con GitHub CI/CD.
- [ ] Modo álbumes personalizados (los usuarios pueden crear carpetas a su gusto).
- [ ] Exportación e importación de listas en formatos compatibles con OPTCG Sim y Cardmarket/CardTrader.
- [ ] Optimización SEO y Open Graph para compartir colecciones en redes sociales.

### 🟣 v2.0.0 — Expansión Social y Mercado (Major Update)
- [ ] Chat en tiempo real entre usuarios para negociar intercambios del tablón.
- [ ] Notificaciones push cuando otro usuario publique una carta que tienes en tu Wishlist.
- [ ] Calculadora del valor monetario total estimado de tu archivador según precios de CardTrader.

---

## ✅ BACKLOG DE TAREAS (CHECKLIST DIARIO DE TRABAJO)

### Frontend & UI
- [x] Crear componente `VirtualBinder.jsx` con efectos Vault X
- [x] Crear componente `CardCatalog.jsx` con buscador y filtros
- [x] Crear componente `CardModal.jsx` con stats y enlace a CardTrader
- [x] Crear componente `TradeBoard.jsx` con anuncios comunitarios
- [x] Añadir efecto de brillo holográfico (`holo-shine`)
- [ ] Añadir sonido sutil de paso de página al cambiar de hoja en el álbum

### Backend & Datos
- [x] Crear dataset inicial con cartas reales de OP-01, OP-05, OP-09 y ST-01
- [x] Redactar script SQL de tablas y RLS para Supabase (`supabase/schema.sql`)
- [ ] Importar dataset masivo de todas las cartas de Bandai mediante script Node.js

### DevOps & Publicación
- [x] Iniciar repositorio Git y configurar ramas (`main`, `feature/*`)
- [x] Documentar `README.md` y `CHANGELOG.md`
- [ ] Conectar repositorio con cuenta de Vercel
- [ ] Configurar variables de entorno (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) en Vercel
