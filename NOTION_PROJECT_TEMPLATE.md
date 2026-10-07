# 🏴‍☠️ NOTION PROJECT TEMPLATE: GRAND LINE VAULT (One Piece TCG)

> *Copia y pega este contenido en una nueva página de tu Notion para tener la gestión del proyecto, tareas, arquitectura y versiones completamente organizada.*

---

## 📌 FICHA DEL PROYECTO

* **Nombre del Proyecto:** Grand Line Vault — One Piece TCG Tracker & Binder
* **Creador & Desarrollador:** Killian Torrell ([https://killiantr.vercel.app](https://killiantr.vercel.app))
* **Estado:** 🟢 En Producción & Desarrollo Activo (Patch v0.5.1)
* **Despliegue Oficial:** Vercel (`https://grand-line-vault-tcg.vercel.app`)
* **Repositorio GitHub:** `https://github.com/KillianTR/one-piece-tcg.git`
* **Stack Principal:** React 19 + Vite 8 + Tailwind CSS v4 + Supabase (PostgreSQL & Auth) + Vercel
* **Versión Actual:** `v0.5.1` (Patch Release: Cloud Binder Sync, Advanced Filters, Financial Valuation, Backup/Export & Web Audio)

---

## 🧭 VISIÓN Y OBJETIVO DEL PRODUCTO

Crear una plataforma web atractiva y ultra-rápida donde los coleccionistas y jugadores competitivos de **One Piece TCG** puedan:
1. **Ver su colección en un archivador virtual interactivo estilo Vault X**, pasando páginas de 9 o 12 bolsillos, identificando de un vistazo qué cartas tienen (con brillos holográficos) y cuáles les faltan (en silueta con etiqueta de "Falta").
2. **Consultar un catálogo completo de cartas oficiales** con estadísticas de juego (Coste, Vida, Poder, Habilidad) y filtros por expansión, color y rareza.
3. **Personalizar su perfil de usuario con identidad pirata**, avatar recortado a 300x300 px, nombre de usuario protegido con regla de cambio cada 30 días y suscripción a novedades oficiales.
4. **Comparar precios y comprar en CardTrader** con un solo clic mediante enlaces directos a cada carta.
5. **Intercambiar cartas repetidas** mediante un tablón comunitario P2P sin comisiones.

---

## 🏷️ SISTEMA DE VERSIONES: SEMVER (ESTILO BLIZZARD / WOW)

Cada versión se define por tres cifras numéricas: **`MAJOR . MINOR . PATCH`** (Ej: `0.4.0`):

| Cifra | Tipo | Equivalencia WoW / Gaming | Cuándo se incrementa |
|---|---|---|---|
| **0** | **MAJOR** | **Expansión** (*The War Within, Dragonflight*) | Gran actualización estructural. Rediseño completo, migración de base de datos o salto a v1.0 / v2.0. |
| **4** | **MINOR** | **Feature / Parche de Contenido** (*Parche x.1*) | Nueva funcionalidad o módulo completo (ej. Álbum Virtual, Login con Supabase, Multi-idioma, Perfil de Usuario). No rompe compatibilidad. |
| **0** | **PATCH** | **Hotfix / Corrección rápida** | Reparación de errores en el código, pequeños bugs visuales o mejoras menores de rendimiento. |

---

## 🌿 WORKFLOW DE GIT: TRABAJO POR RAMAS (BRANCHES)

Para mantener el repositorio de GitHub limpio y profesional:

* 🛡️ **`main`**: Rama de producción que se conecta automáticamente a Vercel. Solo contiene versiones estables etiquetadas con tags (ej. `v0.1.0`, `v0.4.0`).
* 🚀 **`feature/<nombre>`**: Ramas de desarrollo para nuevas características:
  * `feature/virtual-binder-v0.1.0`: Maquetación y lógica del archivador Vault X.
  * `feature/supabase-auth-v0.2.0`: Integración con base de datos y autenticación de usuarios.
  * `feature/i18n-theme-v0.3.0`: Soporte multi-idioma ES/EN y selector de temas claro/oscuro.
  * `feature/user-profiles-v0.4.0`: Sistema de perfiles, compresión de avatares y cooldown de 30 días.
* 🩹 **`hotfix/<nombre>`**: Ramas urgentes para arreglar fallos rápidos en producción.

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
* `is_foil` (BOOLEAN - Por defecto false)
* `notes` (TEXT)
* `updated_at` (TIMESTAMP)

### Tabla 3: `trade_posts` (Tablón de Intercambios)
* `id` (UUID - Primary Key)
* `user_id` (UUID - Clave foránea a `auth.users`)
* `location` (VARCHAR)
* `has_cards` (JSONB - Array de cartas que ofrece)
* `wants_cards` (JSONB - Array de cartas que busca)
* `notes` (TEXT)
* `status` (VARCHAR - 'active', 'completed', 'cancelled')
* `created_at` (TIMESTAMP)

### Tabla 4: `profiles` (Perfiles y Personalización de Usuario)
* `id` (UUID - Primary Key vinculada a `auth.users.id`)
* `username` (VARCHAR(30) UNIQUE - Índice case-insensitive)
* `full_name` (VARCHAR(100) - Nombre y Apellidos)
* `avatar_url` (TEXT - Imagen 300x300 px comprimida WebP/JPEG)
* `pirate_title` (VARCHAR(50) - Rango de Coleccionista)
* `bio` (VARCHAR(160) - Frase o estado pirata)
* `newsletter_opt_in` (BOOLEAN - Suscripción a novedades por email)
* `username_changed_at` (TIMESTAMP - Cooldown de 30 días para cambio de nick)
* `is_banned` (BOOLEAN - Sistema de moderación de comunidad)
* `updated_at` (TIMESTAMP)

---

## 🗺️ ROADMAP Y ENTREGAS POR VERSIONES

### 🏁 v0.1.0 — Alpha (Lanzamiento Core)
- [x] Configuración con React 19, Vite y Tailwind CSS v4.
- [x] Diseño del Álbum Virtual Vault X (piel negra, pespuntes, hojas 3x3 y 4x3).
- [x] Lógica de cartas conseguidas vs cartas faltantes (siluetas y etiquetas).
- [x] Catálogo con filtros por set, color, rareza e inventario.
- [x] Modal de carta con stats oficiales y botón a CardTrader.
- [x] Modal explicativo del sistema de versiones SemVer WoW.

### 🏁 v0.2.0 — Conexión con Supabase (Auth & Cloud Database)
- [x] Proyecto en Supabase configurado (`bhierrlgevzdqsadimzu`).
- [x] Autenticación de usuarios con Email/Contraseña y Google OAuth.
- [x] Sincronización de colección con PostgreSQL en tiempo real y RLS.
- [x] Migración automática de colección de invitado a cuenta de usuario.

### 🏁 v0.3.0 — Multi-Idioma & Modo Oscuro / Claro
- [x] Sistema bilingüe completo (Español / Inglés) con selector instantáneo en cabecera.
- [x] Modo Oscuro (Vault X Black Edition) y Modo Claro (Vault X White Edition).
- [x] Favicon y logo vectorial blanco transparente estilizado.
- [x] README bilingüe con selector de idioma y URL oficial de Vercel.

### 🏁 v0.5.1 — Sincronización en la Nube de Carpetas, Filtros Avanzados, Estadísticas Financieras, Backup/Export y Sonido Háptico (Versión Actual)
- [x] Sincronización completa de "Mis Carpetas" en Supabase (`custom_binders` JSONB en tabla `profiles`) con guardado diferido automático.
- [x] Migración transparente de carpetas creadas en modo invitado a la nube al iniciar sesión.
- [x] Filtros avanzados en el Catálogo: por Tipo de Carta (Leader, Character, Event, Stage, DON!!) y por Coste (0 a 10+).
- [x] Ordenación multicriterio en el Catálogo: por ID, Coste asc/desc, Poder, Rareza, Precio en € y Nombre A-Z.
- [x] Modal de Estadísticas del Coleccionista & Valoración Financiera (`CollectionStatsModal`): valor total de la colección en €, coste para completar Wishlist, desglose de rarezas, barras de progreso por expansión y top de cartas más valiosas con enlaces directos a CardTrader.
- [x] Insignia con valor aproximado en euros (`~XXX€`) en el pill de estadísticas del header.
- [x] Modal de Copias de Seguridad & Exportación (`BackupModal`): exportación/restauración de backups completos en JSON, exportación para OPTCG Sim (`4 OP01-001`) e importación de texto plano en lote.
- [x] Efectos de sonido hápticos con Web Audio API: sonido de paso de página al navegar y chasquido al enfundar/mover cartas en bolsillos, con botón de silenciar (🔊 / 🔇) y persistencia en `localStorage`.
- [x] Soporte de mayúsculas en nombres de usuario (`@username`), validando unicidad case-insensitive en PostgreSQL.

### 🏁 v0.5.0 — Carpetas Personalizadas, Ordenación Libre, Multicriterio & Limpieza de Cabecera Vault X
- [x] Dos modos en el archivador: `Catálogo Oficial (Sets)` y `Mis Carpetas (Álbum Libre)`.
- [x] Gestión de múltiples carpetas personalizadas (crear nuevas carpetas y eliminar con modal).
- [x] Páginas dinámicas por carpeta (`+ Añadir Página` y eliminación de páginas).
- [x] Asignación libre de cartas por bolsillo con `CardPickerModal` (buscador rápido, filtros por categoría y filtro "Solo en Colección").
- [x] Drag & Drop interactivo HTML5 para mover o intercambiar cartas entre bolsillos con arrastre visual.
- [x] Carpeta preconfigurada con ordenación realista de coleccionista (Fila 1 con 4 Luffys, Fila 2 con 4 Zoros, Sanji, Jinbe, páginas de Yonkos, Marines y sección de cartas DON!!).
- [x] Opción `TODAS` en el selector de expansiones para navegar el catálogo completo repartido entre múltiples páginas sucesivas.
- [x] Menú de ordenación multicriterio en el álbum: por Tipo de Carta (Líder, Personaje, Evento, Escenario, DON!!), Rareza, Color, Coste, Poder e ID.
- [x] Limpieza del Vault X Header: eliminación de "OFFICIAL PORTFOLIO" (dejando solo `VAULT X • ONE PIECE`) y supresión de la descripción promocional física ("Acid-free, side-loading...").
- [x] Reubicación del badge de versión del navbar a la sección de Ajustes del User Dropdown y pie de página.
- [x] Ampliación del catálogo con cartas icónicas (Sanji, Jinbe, Sakazuki, Borsalino) y cartas especiales de DON!!.

### 🏁 v0.4.1 — Rediseño del Header & Menú Desplegable de Usuario
- [x] Menú desplegable unificado en el avatar del usuario con tarjeta de perfil, nombre, correo y rango.
- [x] Reubicación integrada de ajustes de Idioma (ES/EN) y Tema (Modo Claro/Oscuro) dentro del desplegable.
- [x] Descongestión del header: distribución espaciosa en 3 zonas (Brand, Navegación central y Bloque de usuario).
- [x] Cierre inteligente con detección de clic exterior y tecla Escape.
- [x] Sincronización reactiva inmediata de foto de perfil y nombre en la barra de navegación mediante eventos personalizados.
- [x] Ajuste visual de la barra de controles del Álbum (`VirtualBinder`): eliminación del salto a dos líneas en español mediante optimización de espaciados, paddings y `whitespace-nowrap`.

### 🏁 v0.4.0 — Perfil de Usuario, Personalización, Admin Accounts & Header Fix
- [x] Modal de Personalización de Perfil (`ProfileModal`).
- [x] Subida de foto de perfil con Canvas 300x300 px y compresión WebP/JPEG (~25-35 KB).
- [x] Advertencia obligatoria de Normas de la Comunidad y moderación.
- [x] Nombres de usuario únicos con restricción de cambio cada 30 días para usuarios estándar.
- [x] **Whitelist de Cuentas de Desarrollador / Admin:** `r3habhdyt@gmail.com`, `killian.carfox@gmail.com` y `killiantorrell@gmail.com` con bypass total del cooldown de 30 días para pruebas ilimitadas de cambio de nombre y avatar.
- [x] Selector de Rango Pirata estilizado con icono de insignia/condecoración (`Award`), sin emojis ni estética de IA.
- [x] Feedback visual de guardado de perfil: confeti celebratorio + casilla verde destacada con check + botón dinámico en verde esmeralda (`¡Guardado con éxito!`) para confirmar que los cambios se guardaron antes de cerrar la ventana.
- [x] Seguridad: Visualización de correo vinculado a Google OAuth y cambio de contraseña.
- [x] Casilla para recibir novedades y salidas de cartas por correo (`newsletter_opt_in`).
- [x] Corrección visual de contraste del Header en modo claro (fondo blanco nítido).
- [x] Enlace directo en el footer hacia el Portfolio de Killian Torrell (`killiantr.vercel.app`).
- [x] Limpieza del `README.md` eliminando el bloque teórico de SemVer para mayor claridad.

---

## 🛡️ CUENTAS DE DESARROLLADOR & TEST (ADMIN BYPASS)

Cuentas con privilegios de pruebas para Killian:
* 👑 **`r3habhdyt@gmail.com`** (Cuenta principal de pruebas)
* 🧪 **`killian.carfox@gmail.com`** (Cuenta secundaria de testing)
* 🧪 **`killiantorrell@gmail.com`** (Cuenta terciaria de testing)

**Privilegios activos:**
- Cambio de nombre de usuario en cualquier momento sin esperar 30 días.
- Cambio y subida de fotos de avatar ilimitada.
- Badge visual exclusivo de desarrollador en el modal de perfil.

### 📦 v0.6.0 — Ingestión Masiva de Cartas Oficiales (Próximo Sprint)
- [ ] Script de importación para cargar sets completos OP-01 hasta OP-09 y barajas ST-01 a ST-15.
- [ ] Imágenes en alta definición con respaldo en CDN.
- [ ] Filtro avanzado por tipo de carta (Leader, Character, Event, Stage) y atributos.

### 🟢 v1.0.0 — Official Launch en Vercel (Major Release)
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
- [x] Sistema de temas Claro / Oscuro con texturas Vault X Black & White
- [x] Soporte multi-idioma ES / EN en el 100% de componentes
- [x] Modal de personalización de perfil de usuario (`ProfileModal.jsx`)
- [x] Enlace al portfolio personal (`killiantr.vercel.app`) en el pie de página
- [x] Añadir efectos de sonido táctiles (paso de página y enfundado de cartas) con Web Audio API sintetizado
- [x] Modal de Estadísticas del Coleccionista y Valoración Financiera en € (`CollectionStatsModal.jsx`)
- [x] Modal de Backup completo en JSON y exportación para OPTCG Sim (`BackupModal.jsx`)
- [x] Filtros por Categoría (Líder, Personaje...) y Coste (0-10+) con ordenación multicriterio en `CardCatalog.jsx`

### Backend & Datos
- [x] Crear dataset inicial con cartas reales de OP-01, OP-05, OP-09 y ST-01
- [x] Redactar script SQL de tablas y RLS para Supabase (`supabase/schema.sql`)
- [x] Configurar autenticación con Google OAuth en Supabase y Google Cloud Console
- [x] Crear esquema y RLS para tabla de perfiles (`supabase/profiles_schema.sql`)
- [x] Migración SQL v0.5.1 en Supabase para almacenamiento de `custom_binders` JSONB en `public.profiles`
- [ ] Importar dataset masivo de todas las cartas oficiales de Bandai

### DevOps & Publicación
- [x] Iniciar repositorio Git y configurar ramas (`main`, `feature/*`)
- [x] Conectar repositorio con cuenta de Vercel y despliegue continuo automático
- [x] Configurar variables de entorno (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) en Vercel
- [x] Configurar URLs de redirección de OAuth en Supabase y Vercel
- [x] Documentar `README.md`, `CHANGELOG.md` y `NOTION_PROJECT_TEMPLATE.md`
