# 🏴‍☠️ Grand Line Vault — One Piece TCG Virtual Binder & Tracker

<div align="center">

[![Versión](https://img.shields.io/badge/version-v0.5.1--patch-emerald?style=for-the-badge&logo=git)](CHANGELOG.md)
[![Web en Vivo](https://img.shields.io/badge/Live_Demo-grand--line--vault--tcg.vercel.app-000000?style=for-the-badge&logo=vercel)](https://grand-line-vault-tcg.vercel.app)
[![Portfolio](https://img.shields.io/badge/Creator-Killian_Torrell-000000?style=for-the-badge&logo=vercel)](https://killiantr.vercel.app)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

### 🌐 Selecciona tu Idioma / Select Language:
**[🇪🇸 Ir a la versión en Español](#-versión-en-español)** &nbsp;•&nbsp; **[🇬🇧 Jump to English Version](#-english-version)**

---

</div>

<br>

<a name="-versión-en-español"></a>
## 🇪🇸 Versión en Español

> **Grand Line Vault** es una aplicación web interactiva diseñada para coleccionistas y jugadores del **One Piece Card Game (OPTCG)**. Permite gestionar tu colección, hacer seguimiento de cartas faltantes y disfrutar de tu archivador virtual inspirado en los álbumes físicos **Vault X** (con hojas de 9 y 12 bolsillos, modo oscuro y claro, multi-idioma, persistencia en la nube con Supabase y conexión directa con CardTrader).

🔗 **Enlace Oficial de Producción:** [https://grand-line-vault-tcg.vercel.app](https://grand-line-vault-tcg.vercel.app)  
👨‍💻 **Creado por:** [Killian Torrell — Portfolio Web (killiantr.vercel.app)](https://killiantr.vercel.app)

---

### 🌟 Funcionalidades Principales

#### 📖 1. Álbum Virtual Interactivo (Estilo Vault X) & Carpetas Personalizadas
* **Doble Modo de Visualización:**
  * **Catálogo Oficial (Sets):** Visualiza los sets oficiales (`OP-01`, `OP-05`, `OP-09`, `ST-01`) o el catálogo completo (**TODAS las expansiones**) pasando páginas de 9 o 12 bolsillos con etiquetas de conseguidas vs faltantes.
  * **Mis Carpetas (Álbum Libre Personalizado):** Crea tantas carpetas personalizadas como desees (ej. *Mi Álbum Vault X*, *Yonkos*, *Marines*, *Cartas DON!!*), añade páginas ilimitadas y coloca cualquier carta en el bolsillo exacto que quieras (como 4 Luffys en la fila superior o 4 Zoros en la siguiente).
* **Organización y Drag & Drop:** Arrastra y suelta cartas entre bolsillos para reordenarlas a tu gusto.
* **Efectos de Sonido Hápticos (Web Audio API):** Síntesis de sonido de paso de hoja al navegar y chasquido satisfactorio al enfundar cartas en bolsillos, con botón de silenciar/activar (🔊 / 🔇).
* **Sincronización en la Nube:** Las carpetas y su distribución personalizada se sincronizan en Supabase al iniciar sesión.
* **Formatos de bolsillo:** Conmuta entre **9 bolsillos (3x3)** y **12 bolsillos (4x3)**.
* **Estética de archivador de alta gama:** Textura símil piel negra (*Black Edition*) o marfil (*White Edition*), pespunte cosido con hilo dorado y lomo central.
* **Visualización inteligente:**
  * **Cartas en posesión:** Se muestran a todo color con badge de copias (ej. `x1`, `x4`) y brillo holográfico al pasar el cursor (`holo-shine`) en cartas raras (SR, SEC, Alternate Art).
  * **Cartas faltantes:** Se muestran en silueta translúcida en escala de grises con etiqueta de `"FALTA"` y botones rápidos de hover para marcar como obtenidas, añadir a Wishlist o buscar en CardTrader.
* **Barra de progreso de expansión:** Indicador dinámico de completitud del set con confeti de celebración.

#### 🌓 2. Modo Oscuro y Modo Claro
* Alterna con un solo clic entre navegación nocturna (*Dark Mode*) y diurna (*Light Mode*), con adaptación estética de la piel del archivador y el fondo. Tu preferencia se recuerda automáticamente.

#### 🌐 3. Multi-Idioma (Español & Inglés)
* Cambia el idioma de toda la web en cualquier momento mediante el selector `ES / EN` de la barra superior.

#### 🔍 4. Catálogo & Base de Datos Oficial
* Buscador en tiempo real por nombre, código oficial (ej. `OP05-060`) o texto de habilidad.
* Filtros combinados por:
  * **Categoría / Tipo:** Leader, Character, Event, Stage, DON!!.
  * **Coste:** 0 a 10+.
  * **Expansión:** OP-01, OP-05, OP-09, ST-01, etc.
  * **Color:** Rojo, Verde, Azul, Púrpura, Negro, Amarillo o multicolor.
  * **Rareza:** Leader (`L`), Common (`C`), Uncommon (`UC`), Rare (`R`), Super Rare (`SR`), Secret Rare (`SEC`), Special/Manga (`SP`).
  * **Inventario:** *Todas*, *En Colección*, *Faltantes* y *Wishlist*.
* **Ordenación Multicriterio:** Por Código de Carta, Coste (menor a mayor / mayor a menor), Poder, Rareza, Precio en € y Nombre A-Z.

#### 📊 5. Estadísticas del Coleccionista & Valoración Financiera (€)
* **Valor Estimado de Colección:** Cálculo en tiempo real del valor en euros (€) de tu archivador según cotizaciones de mercado de CardTrader.
* **Coste de Completar Wishlist:** Importe total necesario para adquirir las cartas deseadas.
* **Desglose por Rarezas:** Conteo exacto de cartas poseídas por rareza (Líderes, Raras, Super Raras, Secretas, Mangas).
* **Progreso por Expansión:** Barras porcentuales de avance para cada colección oficial.
* **Joyas de la Corona:** Ranking de las cartas de mayor valor económico en tu poder con enlace directo a CardTrader.

#### 💾 6. Copias de Seguridad & Exportación (JSON & OPTCG Sim)
* **Backup Completo en JSON:** Descarga y restauración de un archivo con tu colección, wishlist y carpetas personalizadas.
* **Exportación para OPTCG Sim:** Generación de lista estándar compatible con el simulador competitivo (ej. `4 OP01-001`) para copiar al portapapeles o descargar en `.txt`.
* **Importación Rápida:** Pega texto plano o sube listas para agregar masivamente cartas a tu colección.

#### ⚡ 7. Ficha de Carta y Enlace a CardTrader
* Al pulsar en cualquier carta se abre una ventana modal con stats (Coste, Vidas, Poder, Counter, Atributo), efecto de habilidad, precio orientativo y botón directo de búsqueda a **CardTrader**.

#### ☁️ 8. Cuentas de Usuario y Nube (Supabase)
* Inicia sesión con correo/contraseña o mediante OAuth (**Google**).
* Tus cartas y carpetas se guardan en una base de datos PostgreSQL protegida por políticas **RLS (Row Level Security)**.
* Si navegas como invitado y decides registrarte, tus cartas y carpetas locales se migran a la nube automáticamente.

#### 👤 9. Perfil de Usuario y Menú Desplegable
* **Menú Desplegable en el Avatar:** Descongestiona el header agrupando perfil, estadísticas, copias de seguridad, conmutador de tema e idioma y cierre de sesión en una tarjeta flotante elegante al hacer clic en tu avatar.
* **Nombre de Usuario (@username):** Nombres únicos con soporte de mayúsculas (ej. `@Killian_TR`), verificados contra la base de datos y con política de cambio restringido a una vez cada 30 días (con bypass ilimitado para cuentas de desarrollador).
* **Foto de Perfil (300x300 px):** Subida y compresión en cliente a WebP/JPEG (~25-35 KB) con aro de coleccionista pirata y advertencia de moderación comunitaria.
* **Identidad Pirata:** Nombre y apellidos opcionales, rangos de coleccionista (*Novato del East Blue*, *Peor Generación*, *Shichibukai*, *Rey de los Piratas*) y biografía personalizada.
* **Seguridad y Boletín:** Vinculación con Google OAuth, cambio de contraseña y suscripción opcional a novedades de cartas y plataforma.

---

### 🚀 Instalación y Puesta en Marcha Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/KillianTR/one-piece-tcg.git

# 2. Entrar en la carpeta
cd one-piece-tcg

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno (crear .env a partir de .env.example)
cp .env.example .env

# 5. Iniciar servidor de desarrollo
npm run dev
```

---

<br>
<hr>
<br>

<a name="-english-version"></a>
## 🇬🇧 English Version

> **Grand Line Vault** is an interactive web application crafted for collectors and competitive players of the **One Piece Card Game (OPTCG)**. It lets you manage your personal collection, track missing cards, and experience your cards through a digital binder inspired by physical **Vault X** portfolios (featuring 9 and 12-pocket pages, Dark & Light modes, bilingual support, cloud persistence with Supabase, and direct CardTrader integration).

🔗 **Official Production URL:** [https://grand-line-vault-tcg.vercel.app](https://grand-line-vault-tcg.vercel.app)  
👨‍💻 **Created by:** [Killian Torrell — Portfolio (killiantr.vercel.app)](https://killiantr.vercel.app)

---

### 🌟 Key Features

#### 📖 1. Virtual Binder (Vault X Style) & Custom Folders
* **Dual Viewing Mode:** Official catalog sets (checklist with missing card silhouettes) or **My Folders** (free-form custom binder with unlimited pages).
* **Drag & Drop Organization:** Move and swap cards effortlessly between pockets.
* **Tactile Web Audio Effects:** Synthesized paper page flip whooshes and satisfying pocket card sleeve snaps with mute toggle (🔊 / 🔇).
* **Cloud Sync:** Custom binder arrangements sync to Supabase upon signing in.
* **Flexible pocket configurations:** Toggle smoothly between **9-pocket (3x3)** and **12-pocket (4x3)**.
* **Smart card rendering:** Owned cards in full color with quantity badges and holographic sheen (`holo-shine`); missing cards in translucent grayscale with quick actions.
* **Set completion progress bar:** Real-time tracking per expansion with celebratory confetti animation.

#### 🌓 2. Dark Mode & Light Mode
* Switch effortlessly between Dark Mode and Light Mode with the header toggle. Your preference is automatically persisted.

#### 🌐 3. Bilingual Support (English & Spanish)
* Switch the entire application interface between English and Spanish instantly using the `ES / EN` button in the navigation bar.

#### 🔍 4. Official Card Catalog & Database
* Real-time search across card names, official IDs (e.g. `OP05-060`), or skill effects.
* Multi-faceted filtering:
  * **Category / Type:** Leader, Character, Event, Stage, DON!!.
  * **Cost:** 0 to 10+.
  * **Set / Expansion:** OP-01, OP-05, OP-09, ST-01, etc.
  * **Color:** Red, Green, Blue, Purple, Black, Yellow, or Multicolor.
  * **Rarity:** Leader (`L`), Common (`C`), Uncommon (`UC`), Rare (`R`), Super Rare (`SR`), Secret Rare (`SEC`), Special/Manga (`SP`).
  * **Ownership:** *All*, *In Collection*, *Missing*, and *Wishlist*.
* **Multi-Criteria Sorting:** By Card ID, Cost (asc/desc), Power, Rarity, Price in €, and Name A-Z.

#### 📊 5. Collector Statistics & Financial Valuation (€)
* **Estimated Collection Value:** Live valuation of your binder in euros (€) powered by CardTrader market data.
* **Wishlist Completion Cost:** Total sum required to purchase all desired cards.
* **Rarity Breakdown:** Owned count for Leaders, Rares, Super Rares, Secret Rares, and Manga cards.
* **Set Progress:** Individual completion progress bars per expansion.
* **Crown Jewels:** Top valuable owned cards ranked by price with direct CardTrader links.

#### 💾 6. Backup & Export (JSON & OPTCG Sim)
* **Complete JSON Backup:** Export and restore your full collection, wishlist, and custom binders in one click.
* **OPTCG Sim Deck Export:** Export your inventory in standard simulator text format (e.g. `4 OP01-001`) or download as `.txt`.
* **Fast Batch Import:** Paste deck lists or card codes to quickly bulk-add cards to your collection.

#### ⚡ 7. Card Details & CardTrader Live Market Link
* Click any card to inspect full combat stats (Cost, Life, Power, Counter, Attribute), skill text, estimated market value, and a direct button to search and buy on **CardTrader**.

#### ☁️ 8. User Accounts & Cloud Database (Supabase)
* Sign in using email/password or OAuth (**Google**).
* Your cards and custom binders are securely stored in a cloud PostgreSQL database guarded by **Row Level Security (RLS)**.
* Guest collections in local storage are automatically migrated upon sign-up.

#### 👤 9. User Profile & Dropdown Menu
* **User Avatar Dropdown Menu:** Decongests the header by combining profile settings, stats modal, backups, theme & language switches, and secure sign-out into a floating glassmorphic card upon clicking the avatar.
* **Username (@username):** Unique database-verified usernames with uppercase support (e.g., `@Killian_TR`) and a 30-day cooldown policy (with dev bypass for testing).
* **Profile Picture (300x300 px):** Client-side Canvas crop and compression to WebP/JPEG (~25-35 KB) with community moderation safeguards.
* **Pirate Identity:** Optional full name, custom pirate ranks (*East Blue Rookie*, *Worst Generation*, *Warlord of the Sea*, *Pirate King*), and bio.
* **Security & Newsletter:** Google OAuth status badge, password updates, and optional email notifications for new card releases and app features.

---

### 🚀 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/KillianTR/one-piece-tcg.git

# 2. Navigate to project folder
cd one-piece-tcg

# 3. Install npm dependencies
npm install

# 4. Setup environment variables (copy .env.example to .env)
cp .env.example .env

# 5. Start development server
npm run dev
```

---

## 👨‍💻 Autor & Portfolio / Author & Portfolio

* **Killian Torrell** — Full-Stack Developer & Collector
* 🌐 **Portfolio Oficial:** [https://killiantr.vercel.app](https://killiantr.vercel.app)
* 🐙 **GitHub:** [@KillianTR](https://github.com/KillianTR)
* 🏴‍☠️ **Proyecto:** [Grand Line Vault (OPTCG Tracker)](https://grand-line-vault-tcg.vercel.app)

---

## 📄 License & Legal Notice

Open source project released under the MIT License.  
*One Piece Card Game* and all associated characters, artwork, and trademarks are property of Eiichiro Oda / Shueisha, Toei Animation, and Bandai Namco. This is a non-profit fan tool built for collectors.
