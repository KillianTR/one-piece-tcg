# 🏴‍☠️ Grand Line Vault — One Piece TCG Virtual Binder & Tracker

<div align="center">

[![Versión](https://img.shields.io/badge/version-v0.3.0--minor-amber?style=for-the-badge&logo=git)](CHANGELOG.md)
[![Web en Vivo](https://img.shields.io/badge/Live_Demo-grand--line--vault--tcg.vercel.app-000000?style=for-the-badge&logo=vercel)](https://grand-line-vault-tcg.vercel.app)
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

---

### 🌟 Funcionalidades Principales

#### 📖 1. Álbum Virtual Interactivo (Estilo Vault X)
* **Estética de archivador de alta gama:** Textura símil piel negra (*Black Edition*) o marfil (*White Edition*), pespunte cosido con hilo dorado y lomo central.
* **Formatos de bolsillo:** Conmuta entre **9 bolsillos (3x3)** (estándar tipo Vault X Zip Binder) y **12 bolsillos (4x3)**.
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
  * **Expansión:** OP-01, OP-05, OP-09, ST-01, etc.
  * **Color:** Rojo, Verde, Azul, Púrpura, Negro, Amarillo o multicolor.
  * **Rareza:** Leader (`L`), Common (`C`), Uncommon (`UC`), Rare (`R`), Super Rare (`SR`), Secret Rare (`SEC`), Special/Manga (`SP`).
  * **Inventario:** *Todas*, *En Colección*, *Faltantes* y *Wishlist*.

#### ⚡ 5. Ficha de Carta y Enlace a CardTrader
* Al pulsar en cualquier carta se abre una ventana modal con stats (Coste, Vidas, Poder, Counter, Atributo), efecto de habilidad, precio orientativo y botón directo de búsqueda a **CardTrader**.

#### ☁️ 6. Cuentas de Usuario y Nube (Supabase)
* Inicia sesión con correo/contraseña o mediante OAuth (**Google**).
* Tus cartas se guardan en una base de datos PostgreSQL protegida por políticas **RLS (Row Level Security)**.
* Si navegas como invitado y decides registrarte, tus cartas locales se migran a la nube automáticamente.

---

### 🏷️ Sistema de Versionado SemVer (Estilo Blizzard / WoW)

El proyecto sigue una nomenclatura estricta basada en tres cifras: **`MAJOR . MINOR . PATCH`** (ejemplo: `0.3.0`):

```
       ┌─────────── MAJOR : Gran actualización / Expansión (como en World of Warcraft)
       │ ┌───────── MINOR : Nueva funcionalidad o módulo sin romper compatibilidad
       │ │ ┌─────── PATCH : Hotfix, reparación de bugs o parche rápido
       ▼ ▼ ▼
       0 . 3 . 0
```

1. **MAJOR (`1.0.0` / `2.0.0`):** Expansiones de contenido, salto a versión oficial o cambios estructurales mayores.
2. **MINOR (`0.3.0`):** Nuevas funcionalidades (ej. Multi-idioma, Modo Oscuro/Claro, Auth con Supabase).
3. **PATCH (`0.0.1`):** Hotfixes, correcciones rápidas de bugs y pequeños parches.

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

---

### 🌟 Key Features

#### 📖 1. Virtual Binder (Vault X Style)
* **Archival binder aesthetic:** Premium textured leather finish (*Black Edition* or ivory *White Edition*), gold dashed stitching, and spine shadow.
* **Flexible pocket configurations:** Toggle smoothly between **9-pocket (3x3)** (standard Vault X zip binder) and **12-pocket (4x3)**.
* **Smart card rendering:**
  * **Owned cards:** Displayed in full vibrant color with quantity badges (e.g., `x1`, `x4`) and a holographic foil sheen on hover (`holo-shine`) for high-rarity cards (SR, SEC, Alt-Art).
  * **Missing cards:** Rendered as translucent grayscale silhouettes with a distinct `"MISSING"` tag and fast hover actions to add copies, wishlist, or search on CardTrader.
* **Set completion progress bar:** Real-time tracking per expansion with celebratory confetti animation.

#### 🌓 2. Dark Mode & Light Mode
* Switch effortlessly between Dark Mode and Light Mode with the header toggle. Your preference is automatically persisted.

#### 🌐 3. Bilingual Support (English & Spanish)
* Switch the entire application interface between English and Spanish instantly using the `ES / EN` button in the navigation bar.

#### 🔍 4. Official Card Catalog & Database
* Real-time search across card names, official IDs (e.g. `OP05-060`), or skill effects.
* Multi-faceted filtering:
  * **Set / Expansion:** OP-01, OP-05, OP-09, ST-01, etc.
  * **Color:** Red, Green, Blue, Purple, Black, Yellow, or Multicolor.
  * **Rarity:** Leader (`L`), Common (`C`), Uncommon (`UC`), Rare (`R`), Super Rare (`SR`), Secret Rare (`SEC`), Special/Manga (`SP`).
  * **Ownership:** *All*, *In Collection*, *Missing*, and *Wishlist*.

#### ⚡ 5. Card Details & CardTrader Live Market Link
* Click any card to inspect full combat stats (Cost, Life, Power, Counter, Attribute), skill text, estimated market value, and a direct button to search and buy on **CardTrader**.

#### ☁️ 6. User Accounts & Cloud Database (Supabase)
* Sign in using email/password or OAuth (**Google**).
* Your cards are securely stored in a cloud PostgreSQL database guarded by **Row Level Security (RLS)**.
* Guest collections in local storage are automatically migrated upon sign-up.

---

### 🏷️ Semantic Versioning (Blizzard / WoW Style)

The project adheres to strict Semantic Versioning: **`MAJOR . MINOR . PATCH`** (e.g., `0.3.0`):

* **MAJOR (`1.0.0` / `2.0.0`):** Expansions, public launch milestones, and database schema migrations.
* **MINOR (`0.3.0`):** Substantial feature additions (Bilingual i18n, Theme System, Supabase Auth).
* **PATCH (`0.0.1`):** Hotfixes, style adjustments, and quick code patches.

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

## 📄 License & Legal Notice

Open source project released under the MIT License.  
*One Piece Card Game* and all associated characters, artwork, and trademarks are property of Eiichiro Oda / Shueisha, Toei Animation, and Bandai Namco. This is a non-profit fan tool built for collectors.
