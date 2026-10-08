# 🏴‍☠️ Changelog — Grand Line Vault

<div align="center">

[![Versión](https://img.shields.io/badge/version-v0.6.4--minor-blue?style=for-the-badge&logo=git)](CHANGELOG.md)
[![Web en Vivo](https://img.shields.io/badge/Live_Demo-grand--line--vault--tcg.vercel.app-000000?style=for-the-badge&logo=vercel)](https://grand-line-vault-tcg.vercel.app)
[![Portfolio](https://img.shields.io/badge/Creator-Killian_Torrell-000000?style=for-the-badge&logo=vercel)](https://killiantr.vercel.app)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-grandlinevault-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/grandlinevault)

---

### 🌐 Selecciona tu Idioma / Select Language:
**[🇪🇸 Ir a la versión en Español](#-versión-en-español)** &nbsp;•&nbsp; **[🇬🇧 Jump to English Version](#-english-version)**

---

</div>

<br>

<a name="-versión-en-español"></a>
## 🇪🇸 Versión en Español

Todas las versiones notables de este proyecto están documentadas en este archivo según el estándar **SemVer (Semantic Versioning)** adaptado con la filosofía de ciclo de vida de **Blizzard / World of Warcraft**.

---

### 📌 Guía de Estructura de Versiones: `[MAJOR] . [MINOR] . [PATCH]`

* **MAJOR (ej. `2.0.0`):** Expansión mayor (*Major Update*). Rediseño estructural, nueva arquitectura de base de datos, salto de versión o cambio que rompe compatibilidad (equivalente a las expansiones del WoW como *The War Within* o *Dragonflight*).
* **MINOR (ej. `0.1.0`):** Nueva característica o módulo (*Minor Update*). Se añade funcionalidad sustancial (nuevo álbum virtual, tablón de intercambio, filtros avanzados) de forma compatible.
* **PATCH (ej. `0.0.1`):** Corrección o parche (*Hotfix*). Arreglo de bugs, optimización de estilos visuales, hotfixes de rendimiento o pequeñas mejoras en el código existente.

---

## [0.6.4] - 2026-10-08
### 🐛 Minor Update — Botón Flotante de Reporte de Errores (Estilo OPlayTCG), Envío por Email a Soporte y Changelog Bilingüe en GitHub

#### ✨ Nuevas Características & Experiencia de Usuario (Features & UX)
* **Botón Flotante de Reporte de Errores ("Report a Bug"):**
  * Diseñado e integrado un botón flotante fijado en la esquina inferior derecha (`fixed bottom-4 right-4 z-40`) con el icono de `Bug` en dorado ámbar y etiqueta responsiva, exactamente en el mismo formato de **[oplaytcg.com/es](https://oplaytcg.com/es)**.
  * En dispositivos móviles se muestra como una píldora compacta circular no invasiva, y en pantallas de ordenador y tablet despliega el texto *"Reportar un error"* / *"Report a bug"*.
  * Enlace directo adicional integrado en la barra de navegación del pie de página (`Footer.jsx`).
* **Modal Completo de Envío de Incidencias (`BugReportModal.jsx`):**
  * **Categorización Inteligente:** Selector con píldoras visuales por tipo de error:
    * 🃏 *Carta o scan incorrecto*
    * 🖼️ *Fallo visual / Interfaz*
    * 📖 *Álbum o carpetas*
    * 🔐 *Cuenta o perfil*
    * 💡 *Sugerencia / Otro*
  * **Telemetría y Diagnóstico Técnico Automático:** Recopilación automática no intrusiva de los datos clave del sistema para que el desarrollador pueda reproducir el fallo al instante: versión de la web (`v0.6.4`), navegador y sistema operativo (`navigator.userAgent`), dimensiones de pantalla, URL/pestaña activa e idioma.
  * **Despacho Directo por Correo a `killiantorrell@gmail.com`:**
    * Botón principal **"Enviar por correo"**: Abre el cliente de correo del usuario (`mailto:`) con asunto y cuerpo preformateados.
    * Botón alternativo **"Abrir en Gmail Web"**: Redirige directamente a la ventana de redacción de Gmail en el navegador web con todos los campos precompletados (ideal para usuarios sin cliente local).
    * Botón **"Copiar reporte"**: Copia el informe completo estructurado al portapapeles con confirmación visual en verde.
  * **Pantalla de Confirmación y Agradecimiento:** Feedback tranquilizador con resumen de la incidencia y confirmación de recepción.
* **Base de Datos & Script de Migración SQL (`supabase/migration_v0.6.4_bug_reports.sql`):**
  * Creación de la tabla `public.bug_reports` con políticas RLS para registro opcional de reportes en PostgreSQL.
* **Changelog de GitHub 100% Bilingüe (Español e Inglés):**
  * Documentación completa de todas las versiones del proyecto traducida al inglés para coleccionistas y visitantes internacionales.

## [0.6.3] - 2026-10-08
### 📜 Minor Update — Subpágina Dedicada de Novedades (Estilo OPlayTCG), 19 Ilustraciones Oficiales de Cartas DON!! y Nuevos Logos One Piece

#### ✨ Nuevas Características & Experiencia de Usuario (Features & UX)
* **Subpágina Dedicada de Novedades e Historial de Versiones (`ChangelogView.jsx`):**
  * Creación de una subpágina completa dentro de la aplicación inspirada en la arquitectura y diseño de `https://oplaytcg.com/es/changelog`.
  * Visualización interactiva con timeline vertical cronológico, nodos de estado con pulso lumínico y tarjetas expandidas por categorías (Novedades, Correcciones, Base de Datos e Identidad).
  * Selector dinámico de filtros: *Todas las Versiones*, *Actualizaciones / Features* y *Parches / Hotfixes*.
  * Navegación instantánea mediante pestaña en el Navbar, enlace en el pie de página (`#changelog`) y botón de retorno rápido al archivador virtual con preservación del estado.
  * Soporte bilingüe completo (Español e Inglés) y adaptación automática a temas claro y oscuro.
  * Botón integrado para inspeccionar el archivo `CHANGELOG.md` en el repositorio de GitHub.

#### 🃏 Catálogo Oficial & Auditoría de Cartas DON!!
* **Corrección de Metadatos e Imagen de `DON-005`:**
  * Subsanado el desfase entre nombre e imagen: `DON-005` queda correctamente clasificado como la carta base oficial clásica estándar de Bandai en lugar del nombre provisional erróneo.
* **Integración de 19 Cartas DON!! Ilustradas Auténticas:**
  * Ampliada la base de datos de DONs para incorporar las 19 cartas ilustradas oficiales con arte del manga de Eiichiro Oda:
    * `DON-004`: Monkey.D.Luffy (*"I'm gonna be King of the Pirates!!"*)
    * `DON-007`: Shanks en Marineford (*"I've come to put an end to this war!!"*)
    * `DON-008`: Nefertari Vivi en Alabasta (*"Will you still call me your friend?!"*)
    * `DON-009`: Sir Crocodile (*"There's no justice here, only sand"*)
    * `DON-010`: Donquixote Rosinante (Corazon *"I LOVE YOU!!"*)
    * `DON-011`: Luffy Red Roc vs Kaido en Onigashima
    * `DON-012`: Roronoa Zoro & Sanji en Wano Kuni
    * `DON-013`: Los Siete Señores de la Guerra del Mar (Shichibukai)
    * `DON-014`: Los Tres Capitanes en Sabaody (Luffy, Law y Kid)
    * `DON-015`: Edward Newgate (Barbablanca en Marineford)
    * `DON-016`: Charlotte Katakuri (*"I will not let you pass"*)
    * `DON-017`: Donquixote Doflamingo (*"Pirates are evil? The Marines are righteous?"*)
    * `DON-018`: Monkey.D.Luffy Sombrero de Paja Promocional (2Y)
    * `DON-019`: Monkey.D.Luffy Tatuaje 3D2Y
    * `DON-020`: Trafalgar Law (*"Room - Shambles"*)
    * `DON-021`: Eustass "Captain" Kid (*"Punk Gibson"*)
    * `DON-022`: Marshall.D.Teach (Barbanegra *"A man's dream will never die!"*)
    * `DON-023`: Portgas.D.Ace (*"Fire Fist"*)
    * `DON-024`: Sabo (*"Dragon Claw"*)
* **Verificación al 100% de los Scans del Catálogo (105 Cartas Oficiales):**
  * Auditoría automatizada ejecutada con Node.js validando una a una las URLs del proxy CDN de TCGPlayer: 105/105 respuestas HTTP 200 OK con 0 errores de carga y 0 bloqueos por políticas CORS/CORP.

#### 🏴‍☠️ Identidad Gráfica & Logos Oficiales One Piece
* **Rediseño Tipográfico y Simbólico de Logotipos:**
  * Nuevas variantes de identidad visual que sustituyen el estilo metálico por una estética auténtica del mundo de One Piece (madera tallada de navío pirata, pergaminos de recompensas WANTED y emblema de ancla con el sombrero de paja).
  * Distribución compositiva ajustada a las directrices: *"GRAND LINE VAULT"* en la parte superior y el logo oficial *"ONE PIECE CARD GAME"* en la parte inferior.
* **Eliminación Definitiva de `og-preview.jpg`:**
  * Retirada la imagen de vista previa previa y limpiadas las referencias en `index.html` para asegurar coherencia gráfica en redes sociales.

## [0.6.2] - 2026-10-08
### 🎨 Patch — Scans CDN de TCGPlayer en Alta Definición, Fix Solapamiento Modal y Logos Oficiales Grand Line Vault

#### 🐛 Corrección de Errores (Bug Fixes)
* **Solución Definitiva a Imágenes de Cartas Rotas (CORP Policy):**
  * Diagnóstico del fallo de carga: los servidores oficiales de Bandai (`en.onepiece-cardgame.com`) aplican cabeceras estrictas `Cross-Origin-Resource-Policy: same-site` que bloqueaban las imágenes en dominios externos (`grand-line-vault-tcg.vercel.app` y `localhost`), mostrando iconos de archivo roto.
  * Migración de todo el catálogo al CDN proxy optimizado de Cloudflare R2 sincronizado con TCGPlayer (`https://optcg-api.arjunbansal-ai.workers.dev/images/{id}`), devolviendo scans en alta definición con cabecera `Access-Control-Allow-Origin: *`.
  * Cobertura del 100% de cartas probada con éxito: cartas regulares, cartas especiales DON!! (`DON-001` a `DON-005`) y cartas Manga Rare (`_p2`).
  * Añadido `referrerPolicy="no-referrer"` y manejador automático `onError` en `VirtualBinder.jsx`, `CardCatalog.jsx` y `CardModal.jsx`.
  * Regenerados `src/data/mockCards.js` y el script de migración SQL `supabase/migration_v0.6.0_cards_mass_import.sql`.
* **Fix Solapamiento del Botón de Cierre en `CardModal.jsx`:**
  * Corregido el problema visual donde el botón `(X)` de cierre se superponía con la etiqueta del set (ej. `Set: OP-02`).
  * Se aumentó el ancho máximo de la ventana modal a `max-w-5xl`.
  * Reposicionado el botón `(X)` a `top-4 right-4 z-30` e incorporado un padding de seguridad (`pr-12 sm:pr-14`) en el contenedor de cabecera para evitar cualquier colisión espacial en cualquier tamaño de pantalla.

#### ✨ Nuevas Características & Identidad Visual (Features & Assets)
* **Rediseño del Modal de Versiones a 'Registro de Cambios & Novedades' (Changelog):**
  * Eliminada la explicación teórica de desarrollo (SemVer y flujo de ramas de Git) que no aportaba valor a los usuarios o coleccionistas.
  * Transformado en un modal interactivo con notas de parches reales (v0.6.2 hasta v0.4.0), badges de versión y botón directo a `CHANGELOG.md` en GitHub.
  * Limpieza del footer: eliminado el texto técnico *"SemVer WoW Standard"*, dejando una visualización limpia de la versión `v0.6.2` y el enlace `Changelog`.
* **Logotipos Oficiales de Grand Line Vault:**
  * **Versión Cuadrada (1:1):** Log Pose (brújula náutica), letras oficiales de "ONE PIECE CARD GAME" y relieve en madera noble pirata "GRAND LINE VAULT". Integrado en el Navbar (`Navbar.jsx`) y pie de página (`Footer.jsx`).
* **Integración del Enlace Oficial de Buy Me a Coffee:**
  * Conectado el enlace oficial definitivo `https://buymeacoffee.com/grandlinevault` en el pie de página.

## [0.6.1] - 2026-10-07
### ☕ Patch — Buy Me a Coffee (Donaciones), Layout Simétrico ES/EN en Controles del Álbum y Ajuste Legal del Disclaimer

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Botón 'Buy Me a Coffee' en el Footer:**
  * Reemplazado el icono duplicado de portfolio web en la barra inferior por el icono oficial de la taza de café con corazón (*Buy Me a Coffee*), enlazado a la página oficial de aportaciones y donaciones comunitarias (`https://buymeacoffee.com/grandlinevault`).
  * Efecto de hover dinámico con el color dorado oficial `#FFDD00` de la marca Buy Me a Coffee y tooltip bilingüe (*"Invítame a un café (Donaciones)"* / *"Buy Me a Coffee (Donations)"*).
* **Ajuste Legal y Comunitario en el Disclaimer:**
  * Actualizado el texto legal a: *"One Piece Card Game es propiedad de Eiichiro Oda / Shueisha, Toei Animation y Bandai. Proyecto fan-made independiente sin fines comerciales, mantenido con apoyo voluntario de la comunidad."*
* **Solución al Descuadre Vertical de Controles del Álbum (Español vs. Inglés):**
  * Corrección del salto de línea que provocaba que en español el toolbar ocupara dos líneas verticales por diferencias de longitud tipográfica (*"Bolsillos"* vs *"Pockets"* y acento en *"Pág."*).
  * Aplicado `flex-nowrap`, `whitespace-nowrap`, `shrink-0` y ancho mínimo consistente (`min-w-[72px]`) en el contador de páginas para garantizar una visualización simétrica, compacta y alineada en una sola fila en cualquier idioma y resolución.

## [0.6.0] - 2026-10-07
### 📦 Minor Update — Ingestión Masiva de Cartas Oficiales, Cobertura Completa OP-01 a OP-09 y ST-01/ST-02/ST-10, Accesibilidad Total de Estadísticas y Backups

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Ingestión Masiva de Cartas Oficiales de One Piece TCG:**
  * Ampliación del catálogo con cerca de 100 cartas auténticas con ilustraciones oficiales en alta resolución.
  * Cobertura de sets ampliada: OP-01 (Romance Dawn), OP-02 (Paramount War), OP-03 (Pillars of Strength), OP-04 (Kingdoms of Intrigue), OP-05 (Awakening of the New Era), OP-06 (Wings of the Captain), OP-07 (500 Years in the Future), OP-08 (Two Legends), OP-09 (The Four Emperors), ST-01, ST-02, ST-10 y cartas DON!!.
* **Script de Migración SQL para Supabase (`supabase/migration_v0.6.0_cards_mass_import.sql`):**
  * Script generado con todas las cartas estructuradas para inserción/actualización directa en la tabla `public.cards` de PostgreSQL.
* **Integración Completa de Sonido Táctil Háptico:**
  * Sonido de chasquido de funda (`playCardSnapSound`) conectado al añadir/quitar copias de cartas y al alternar la Wishlist en la ficha modal (`CardModal`) y en las acciones rápidas del catálogo (`CardCatalog`).
* **Accesibilidad Universal para Estadísticas y Backups:**
  * Añadidos botones directos de **Estadísticas & Valoración (€)** y **Copia de Seguridad & Exportar (JSON / OPTCG Sim)** en la barra de control para usuarios invitados y en la barra de navegación móvil para acceso instantáneo con un solo toque.

## [0.5.1] - 2026-10-07
### 💎 Patch — Sincronización en la Nube de Carpetas, Filtros Avanzados, Estadísticas Financieras, Backup/Export y Efectos de Sonido Hápticos

* **Sincronización en la Nube de "Mis Carpetas":** Columna `custom_binders` (JSONB) en Supabase con políticas RLS y sincronización diferida en segundo plano.
* **Filtros Avanzados y Ordenación Multicriterio:** Por categoría (Líder, Personaje, Evento, Escenario, DON!!), por coste (0 a 10+) y por 6 criterios de ordenación.
* **Estadísticas del Coleccionista & Valoración Financiera (€):** Valor de mercado total de la colección según cotizaciones de CardTrader, coste de wishlist, desglose por rarezas y ranking "Joyas de la Corona".
* **Copias de Seguridad (Backup & Export):** Exportación completa a JSON y exportación para OPTCG Sim (`4 OP01-001`).
* **Efectos de Sonido Táctiles (Web Audio API):** Sonidos de paso de página y de enfundado de cartas sin librerías externas.
* **Soporte de Mayúsculas en Nombres de Usuario:** Soporte para `@username` con mayúsculas y minúsculas manteniendo unicidad insensible a mayúsculas.

## [0.5.0] - 2026-10-07
### 📂 Minor Update — Carpetas Personalizadas, Ordenación Libre, Multicriterio & Limpieza de Cabecera Vault X

* **Sistema de Carpetas Personalizadas ("Mis Carpetas"):** Alternancia entre Catálogo Oficial y Álbum Libre con páginas ilimitadas y Drag & Drop nativo entre bolsillos.
* **Navegación Oficial con "TODAS" las Expansiones:** Exploración de todo el catálogo unificado en páginas de 9 o 12 bolsillos.

## [0.4.1] - 2026-10-07
### ⚓ Patch — Rediseño del Header, Menú Desplegable de Usuario y Descongestión Visual

* Menú flotante al hacer clic en el avatar agrupando perfil, estadísticas, copias de seguridad, selector de tema e idioma y cierre de sesión.
* Corrección del salto de línea en la barra de controles de paginación del álbum.

## [0.4.0] - 2026-10-07
### 👤 Minor Update — Perfil de Usuario, Personalización, Subida de Avatar 300x300 & Header Modo Claro

* Modal de perfil con validación de nombre único, regla de cambio cada 30 días, recorte y compresión de avatar a 300x300 px WebP/JPEG, rangos de coleccionista pirata y biografía.
* Integración de tabla `public.profiles` en Supabase con RLS.

## [0.3.0] - 2026-10-07
### 🌐 Minor Update — Sistema Multi-Idioma (Español / Inglés) & Modo Claro / Oscuro

* Soporte bilingüe completo (ES / EN) en toda la interfaz con persistencia local.
* Modos visuales Vault X: Dark Edition (piel negra) y Light Edition (piel marfil).

## [0.2.0] - 2026-10-07
### ⚡ Minor Update — Integración de Supabase (Auth & Base de Datos en la Nube)

* Autenticación con email/contraseña y Google OAuth.
* Sincronización de colección con PostgreSQL y migración automática desde el modo invitado.

## [0.1.0] - 2026-10-07
### 🚀 Alpha Release — Álbum Virtual Vault X & Catálogo Inicial

* Álbum interactivo con vistas de 9 y 12 bolsillos, cartas conseguidas vs faltantes y confeti.
* Ficha modal de carta con enlace de compra a CardTrader y catálogo filtrable.

---

<br>
<hr>
<br>

<a name="-english-version"></a>
## 🇬🇧 English Version

All notable versions and milestones for **Grand Line Vault** are documented here following the **SemVer (Semantic Versioning)** standard adapted with the release philosophy of **Blizzard / World of Warcraft**.

---

### 📌 Version Structure Guide: `[MAJOR] . [MINOR] . [PATCH]`

* **MAJOR (e.g. `2.0.0`):** Major Expansion (*Major Update*). Structural redesign, database schema overhaul, breaking changes, or major architectural jumps (analogous to WoW expansions like *The War Within* or *Dragonflight*).
* **MINOR (e.g. `0.1.0`):** Feature or Content Patch (*Minor Update*). Substantial new features added in a backward-compatible manner (such as custom binders, trading boards, advanced filters).
* **PATCH (e.g. `0.0.1`):** Hotfix / Bug Fix (*Patch*). Fast code repairs, visual styling adjustments, performance tweaks, or minor text polish.

---

## [0.6.4] - 2026-10-08
### 🐛 Minor Update — Floating Bug Report Button (OPlayTCG Style), Direct Email Support Dispatch & Bilingual GitHub Changelog

#### ✨ New Features & User Experience (Features & UX)
* **Floating Bug Report Button ("Report a Bug"):**
  * Designed and integrated a floating button fixed to the bottom right corner (`fixed bottom-4 right-4 z-40`) featuring an amber-gold `Bug` icon and responsive pill styling, matching the exact format from **[oplaytcg.com/es](https://oplaytcg.com/es)**.
  * Displays as an unobtrusive round icon on mobile viewports, and expands to show the full label *"Report a bug"* / *"Reportar un error"* on tablets and desktop screens.
  * Direct access link also added to the bottom footer navigation (`Footer.jsx`).
* **Interactive Bug Reporting Modal (`BugReportModal.jsx`):**
  * **Categorized Issue Selector:** Quick visual pills for issue categorization:
    * 🃏 *Card or scan issue*
    * 🖼️ *Visual / UI glitch*
    * 📖 *Binder or custom folders*
    * 🔐 *Account or profile*
    * 💡 *Suggestion / Other*
  * **Automated System Telemetry & Diagnostics:** Non-invasive automatic capture of system parameters so the developer can diagnose and reproduce issues instantly: app version (`v0.6.4`), browser & OS (`navigator.userAgent`), screen resolution, current URL / active tab, and language.
  * **Direct Email Dispatch to `killiantorrell@gmail.com`:**
    * Primary button **"Send via Email"**: Launches the user's default email client (`mailto:`) with pre-filled subject and structured diagnostic body.
    * Secondary button **"Open in Gmail Web"**: Directly opens Gmail's web compose window in a new tab with all fields pre-populated (ideal for webmail users without local mail clients).
    * Secondary button **"Copy Report"**: Copies the full formatted report to the clipboard with emerald green visual feedback.
  * **Confirmation & Thank You Screen:** Clear user reassurance modal showing recipient confirmation and support pledge.
* **Database & SQL Migration Script (`supabase/migration_v0.6.4_bug_reports.sql`):**
  * Schema creation for `public.bug_reports` table with secure RLS policies for optional cloud issue tracking in PostgreSQL.
* **Fully Bilingual GitHub Changelog (English & Spanish):**
  * Full translation of all project releases and technical notes into English for global collectors and international GitHub visitors.

## [0.6.3] - 2026-10-08
### 📜 Minor Update — Dedicated OPlayTCG-Style Changelog Subpage, 19 Genuine Illustrated DON!! Cards & Authentic One Piece Logos

#### ✨ New Features & UX Improvements
* **Dedicated In-App Changelog Subpage (`ChangelogView.jsx`):**
  * Subpage modeled after `https://oplaytcg.com/es/changelog` with chronological vertical timeline, pulsing glow status nodes, and categorized cards (Features, Bug Fixes, Catalog & Visual Branding).
  * Filter pills: *All Versions*, *Updates / Features*, and *Patches / Hotfixes*.
  * Accessible via navbar tab, footer link (`#changelog`), or one-click back button returning to the virtual binder.
  * Bilingual support (ES / EN) and adaptive dark/light themes with direct link to GitHub's `CHANGELOG.md`.
* **DON!! Cards Resolution & 19 Authentic Illustrated Cards:**
  * Resolved `DON-005`: reclassified to authentic Bandai base standard DON!! illustration.
  * Integrated 19 official illustrated DON!! cards with manga artwork by Eiichiro Oda (Luffy "King of the Pirates", Shanks Marineford, Vivi Alabasta, Crocodile, Corazon "I LOVE YOU!!", Red Roc Luffy vs Kaido, Zoro & Sanji Wano, Shichibukai Warlords, Three Captains Sabaody, Whitebeard Marineford, Katakuri, Doflamingo, etc.).
  * 100% card scan audit: 105 official cards verified via automated Node.js test returning HTTP 200 OK with zero broken assets.
* **Authentic One Piece Logo Redesign:**
  * Replaced metallic gold design with authentic One Piece aesthetic (weathered WANTED bounty poster font, carved ship timber, Log Pose compass, and Straw Hat Jolly Roger anchor).
  * Standardized layout: *"GRAND LINE VAULT"* on top, official *"ONE PIECE CARD GAME"* logo on the bottom.
  * Cleaned up legacy `og-preview.jpg` and updated metadata.

## [0.6.2] - 2026-10-08
### 🎨 Patch — High-Definition TCGPlayer CDN Scans, Modal Close Button Fix & Official Grand Line Vault Logos

* **Card Image CORP Policy Resolution:** Solved Bandai's strict `Cross-Origin-Resource-Policy: same-site` block by routing catalog scans through high-definition Cloudflare R2 proxy synchronized with TCGPlayer.
* **Modal Close Button Fix (`CardModal.jsx`):** Eliminated visual overlap between the `(X)` close button and the set badge with safety padding (`pr-12`) and wider container (`max-w-5xl`).
* **Official Grand Line Vault Visual Branding:** Official square logo in Navbar and Footer.
* **Buy Me a Coffee Link Integration:** Official community donation link connected in footer (`buymeacoffee.com/grandlinevault`).

## [0.6.1] - 2026-10-07
### ☕ Patch — Buy Me a Coffee Donations, Symmetrical ES/EN Layout & Legal Disclaimer Polish

* **Buy Me a Coffee Button in Footer:** Replaced duplicate portfolio link with official coffee cup icon linking to `buymeacoffee.com/grandlinevault` with brand hover colors.
* **Legal Disclaimer Polish:** Clarified non-commercial fan-made project status supported by voluntary community contributions.
* **Symmetrical Binder Toolbar Layout:** Resolved line wraps and vertical jumps in pagination controls across ES and EN translations.

## [0.6.0] - 2026-10-07
### 📦 Minor Update — Mass Import of Official Bandai Cards, Full OP-01 to OP-09 & Starter Decks, Stats & Backups Everywhere

* **Mass Import of Official Cards:** Catalog expanded with nearly 100 authentic cards covering OP-01 through OP-09 and starter decks ST-01, ST-02, and ST-10.
* **Supabase SQL Migration (`supabase/migration_v0.6.0_cards_mass_import.sql`):** Direct PostgreSQL batch import script for `public.cards`.
* **Full Haptic Audio Integration:** Satisfying card sleeve snaps (`playCardSnapSound`) across binder, modal, and catalog.
* **Universal Access to Stats & Backups:** Quick-access buttons added to binder toolbar and mobile navigation.

## [0.5.1] - 2026-10-07
### 💎 Patch — Cloud Folder Sync, Advanced Filters, Collector Financial Valuation, Backup/Export & Haptic Sounds

* **Cloud Folder Sync ("My Binders"):** `custom_binders` column (JSONB) in Supabase with RLS policies and debounced background sync.
* **Advanced Catalog Filters & Multi-Criteria Sorting:** Filter by category, summon cost (0-10+), and 6 sorting options.
* **Collector Stats & Market Valuation (€):** Estimated binder value based on live CardTrader market prices, wishlist completion cost, and rarity breakdowns.
* **Full JSON Backups & OPTCG Sim Export:** Complete export/restore and standard format text export (`4 OP01-001`).
* **Tactile Web Audio API Synthesizer:** Real-time page turn whooshes and card snapping clicks with zero dependencies.
* **Uppercase Support in Usernames:** Allowed uppercase characters in `@username` with case-insensitive database uniqueness.

## [0.5.0] - 2026-10-07
### 📂 Minor Update — Custom Folders ("My Binders"), Free-form Organization, Multi-Criteria & Vault X Header Polish

* **Custom Folders ("My Binders"):** Toggle between Official Sets and Free Binder with unlimited pages and native HTML5 Drag & Drop.
* **"ALL" Expansions Browsing:** View the entire card catalog continuously in 9 or 12-pocket pages.

## [0.4.1] - 2026-10-07
### ⚓ Patch — Header Redesign, User Dropdown Menu & Decongested Navigation

* Avatar dropdown menu consolidating profile settings, statistics, backup tools, theme/language switches, and sign-out.
* Optimized responsive padding in binder toolbar.

## [0.4.0] - 2026-10-07
### 👤 Minor Update — User Profile, Customization, 300x300 Avatar Upload & Light Mode Header

* Profile modal with unique username validation, 30-day cooldown policy, 300x300 px client-side avatar crop/compression, pirate collector ranks, and bio.
* Integration of `public.profiles` table in Supabase with RLS.

## [0.3.0] - 2026-10-07
### 🌐 Minor Update — Bilingual Support (Spanish / English) & Dark / Light Theme System

* Complete bilingual support (ES / EN) throughout all views and modals.
* Vault X Black Edition (Dark Mode) and White Edition (Light Mode) textures.

## [0.2.0] - 2026-10-07
### ⚡ Minor Update — Supabase Integration (Cloud Auth & Database Persistence)

* Authentication with email/password and Google OAuth.
* Cloud database synchronization with PostgreSQL and automatic guest migration.

## [0.1.0] - 2026-10-07
### 🚀 Alpha Release — Vault X Virtual Binder & Initial Catalog

* Interactive virtual binder with 9 and 12-pocket layouts, owned vs missing card silhouettes, and celebration confetti.
* Card detail modal with CardTrader live market link and searchable card catalog.
