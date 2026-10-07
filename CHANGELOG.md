# Changelog — Grand Line Vault

Todas las versiones notables de este proyecto están documentadas en este archivo según el estándar **SemVer (Semantic Versioning)** adaptado con la filosofía de ciclo de vida de **Blizzard / World of Warcraft**.

---

## 📌 Guía de Estructura de Versiones: `[MAJOR] . [MINOR] . [PATCH]`

* **MAJOR (ej. `2.0.0`):** Expansión mayor (*Major Update*). Rediseño estructural, nueva arquitectura de base de datos, salto de versión o cambio que rompe compatibilidad (equivalente a las expansiones del WoW como *The War Within* o *Dragonflight*).
* **MINOR (ej. `0.1.0`):** Nueva característica o módulo (*Minor Update*). Se añade funcionalidad sustancial (nuevo álbum virtual, tablón de intercambio, filtros avanzados) de forma compatible.
* **PATCH (ej. `0.0.1`):** Corrección o parche (*Hotfix*). Arreglo de bugs, optimización de estilos visuales, hotfixes de rendimiento o pequeñas mejoras en el código existente.

---

## [0.3.0] - 2026-10-07
### 🌐 Minor Update — Sistema Multi-Idioma (Español / Inglés) & Modo Claro / Oscuro

#### ✨ Nuevas Características (Features)
* **Soporte Bilingüe Completo (Español / English):**
  * Selector de idioma en la barra de navegación (`ES` / `EN`) con persistencia en `localStorage`.
  * Traducción completa de todos los módulos: Álbum Virtual, Catálogo de Cartas, Ficha Técnica, Tablón de Intercambios, Modales de Autenticación y Versionado, y Pie de Página.
  * Detección automática del idioma del navegador del usuario.
* **Sistema de Temas: Modo Oscuro & Modo Claro:**
  * Selector de tema en la barra de navegación (icono Sol / Luna) con persistencia en `localStorage`.
  * **Modo Oscuro (Vault X Black Edition):** Textura de piel negra, pespunte dorado y fundas transparentes ahumadas.
  * **Modo Claro (Vault X White Edition):** Textura de piel marfil/blanca, pespunte dorado y contraste nítido adaptado a navegación diurna.
* **Actualización del README:**
  * README bilingüe (Español e Inglés) y corrección de la URL de despliegue oficial a `https://grand-line-vault-tcg.vercel.app`.

---

## [0.2.0] - 2026-10-07
### ⚡ Minor Update — Integración de Supabase (Auth & Base de Datos en la Nube)

#### ✨ Nuevas Características (Features)
* **Autenticación con Supabase (`AuthModal`):**
  * Sistema de registro e inicio de sesión mediante Email y Contraseña.
  * Manejo de estados de sesión con `AuthProvider` y `@supabase/supabase-js`.
  * Menú de usuario en la barra de navegación con indicador de estado en la nube 🟢 y opción para cerrar sesión.
* **Sincronización de Colección en la Nube (`user_collections`):**
  * Persistencia en tiempo real en PostgreSQL con seguridad RLS (*Row Level Security*).
  * Migración automática: si un usuario navega como invitado y luego crea su cuenta, sus cartas de `localStorage` se migran automáticamente a su cuenta de Supabase.
* **Seguridad y Variables de Entorno:**
  * Configuración segura mediante `.env` (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).

---

## [0.1.0] - 2026-10-07
### 🚀 Alpha Release — Álbum Virtual Vault X & Catálogo Inicial

#### ✨ Nuevas Características (Features)
* **Álbum Virtual Interactivo (Vault X Style):**
  * Simulación de archivador físico con textura de piel negra (`binder-leather`), bordes con pespunte dorado (`binder-stitching`) y lomo central.
  * Hojas de 9 bolsillos (cuadrícula 3x3) y soporte conmutable a 12 bolsillos (4x3).
  * Renderizado diferencial: cartas en posesión a todo color y con brillo holográfico al pasar el ratón (`holo-shine`); cartas faltantes en escala de grises/silueta translúcida con etiqueta distintiva de "FALTA".
  * Barra de progreso de completitud por expansión en tiempo real (porcentaje y número de cartas).
  * Animación de celebración con confeti al añadir cartas al álbum.
* **Catálogo & Base de Datos One Piece TCG:**
  * Dataset inicial con cartas oficiales de las expansiones **OP-01 (Romance Dawn)**, **OP-05 (Awakening of the New Era)**, **OP-09 (The Four Emperors)** y **ST-01 (Straw Hat Crew)**.
  * Filtros dinámicos por nombre, código ID (`OP05-060`), texto de efecto, expansión, color (Rojo, Verde, Azul, Púrpura, Negro, Amarillo) y rarezas (`L`, `C`, `UC`, `R`, `SR`, `SEC`, `SP`).
  * Filtro rápido de inventario: *Todas*, *En Colección*, *Faltantes* y *Wishlist*.
* **Ficha Detallada de Carta (`CardModal`):**
  * Arte en alta resolución con badges oficiales de estadísticas (Coste, Vidas, Poder de ataque, Counter, Atributo, Tipo de tripulación).
  * Contador rápido de copias (`+` / `-`) y botón para marcar en Wishlist.
  * Conexión directa y botón de búsqueda a **CardTrader** para consultar precios y disponibilidad de mercado en tiempo real.
* **Persistencia Local (`localStorage`):**
  * El estado de las cartas guardadas, copias y wishlist se almacena en el navegador del usuario sin requerir backend inicial.
* **Tablón de Intercambio P2P (`TradeBoard`):**
  * Vista previa del tablón comunitario para publicar cartas repetidas y cartas buscadas entre usuarios.
* **Modal Educativo de Versiones (`VersionModal`):**
  * Modal interactivo accesible desde el badge de versión en la barra de navegación para consultar la versión activa y el estándar SemVer WoW.

---

## [Próximas Versiones Planificadas]

### [0.2.0] - Próximamente (Minor Update)
* Conexión con Supabase para autenticación multi-usuario (Email y Google OAuth).
* Sincronización de colección en la nube (PostgreSQL + RLS).
* Buscador global con atajo de teclado (`Ctrl + K`).

### [1.0.0] - Próximamente (Major Release — Lanzamiento Oficial Vercel)
* Primera versión oficial pública y estable.
* Álbumes personalizados con nombres propios creados por el usuario (ej. *"Mis Líderes Favoritos"*, *"Carpeta Manga Art"*).
* Exportación e importación de listas de cartas a formato CSV / JSON y formatos de simuladores de juego (OPTCG Sim).

### [2.0.0] - Próximamente (Major Update — Expansión Social y Mercado)
* Sistema completo de chat directo y notificaciones entre usuarios para el tablón de intercambios.
* Valoración total estimada del álbum en euros según cotización de mercado.
