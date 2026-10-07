# Changelog — Grand Line Vault

Todas las versiones notables de este proyecto están documentadas en este archivo según el estándar **SemVer (Semantic Versioning)** adaptado con la filosofía de ciclo de vida de **Blizzard / World of Warcraft**.

---

## 📌 Guía de Estructura de Versiones: `[MAJOR] . [MINOR] . [PATCH]`

* **MAJOR (ej. `2.0.0`):** Expansión mayor (*Major Update*). Rediseño estructural, nueva arquitectura de base de datos, salto de versión o cambio que rompe compatibilidad (equivalente a las expansiones del WoW como *The War Within* o *Dragonflight*).
* **MINOR (ej. `0.1.0`):** Nueva característica o módulo (*Minor Update*). Se añade funcionalidad sustancial (nuevo álbum virtual, tablón de intercambio, filtros avanzados) de forma compatible.
* **PATCH (ej. `0.0.1`):** Corrección o parche (*Hotfix*). Arreglo de bugs, optimización de estilos visuales, hotfixes de rendimiento o pequeñas mejoras en el código existente.

## [0.4.1] - 2026-10-07
### ⚓ Patch — Rediseño del Header, Menú Desplegable de Usuario y Descongestión Visual

#### ✨ Nuevas Características & Mejoras de UX (Features & UI)
* **Menú Desplegable de Usuario en el Avatar (User Dropdown Menu):**
  * Descongestión del header: sustitución de múltiples botones independientes (idioma, tema, perfil, cerrar sesión) por un desplegable flotante unificado al hacer clic en el avatar.
  * Tarjeta de usuario con avatar en alta definición, @nombre, email y rango pirata con icono de condecoración (`Award`).
  * Acceso directo a "Mi Perfil y Personalización" para abrir el modal de perfil.
  * Ajustes integrados: cambio rápido de idioma (ES / EN) y alternancia de Modo Oscuro / Modo Claro dentro del propio desplegable.
  * Botón estilizado de "Cerrar Sesión".
  * Cierre inteligente al pulsar fuera del menú o con la tecla `Escape`.
* **Distribución Espaciosa del Header (3 Zonas):**
  * **Zona Izquierda:** Logotipo de Grand Line Vault, insignia de versión clickeable y subtítulo.
  * **Zona Central:** Pestañas de navegación (Álbum, Catálogo, Intercambios) con protagonismo y espacio para respirar.
  * **Zona Derecha:** Píldora de estadísticas (`Colección: X | Wishlist: Y`) + separador vertical + Píldora interactiva de avatar con flecha indicadora.
* **Sincronización Reactiva:**
  * Evento global de actualización para sincronizar avatar, nombre y rango en la barra de navegación en tiempo real al guardar cambios en el perfil.
* **Corrección de Salto de Línea en la Barra del Álbum (VirtualBinder):**
  * Solución al desbordamiento en español que forzaba a la barra a ocupar dos líneas verticales (`ST-01` en segunda fila y paginación partida).
  * Optimización de espaciados, paddings y `whitespace-nowrap` para que todos los selectores de sets, bolsillos y paginador quepan en una sola fila compacta y homogénea en ambos idiomas.

---

## [0.4.0] - 2026-10-07
### 👤 Minor Update — Perfil de Usuario, Personalización, Subida de Avatar 300x300 & Header Modo Claro

#### ✨ Nuevas Características (Features)
* **Modal de Personalización de Perfil (`ProfileModal`):**
  * Acceso directo haciendo clic en el avatar o nombre del usuario en la barra de navegación.
  * **Nombre de Usuario (@username):**
    * Validación de nombres únicos en Supabase (`public.profiles`).
    * **Regla de 30 días:** Solo se puede cambiar el nombre de usuario una vez cada 30 días, bloqueando el campo con candado visual e indicando la fecha exacta del próximo cambio.
  * **Subida y Procesamiento de Foto de Perfil (Avatar 300x300 px):**
    * Carga de archivos PNG, JPG o WebP con redimensionado y recorte cuadrado automático a 300x300 mediante Canvas del navegador.
    * Compresión inteligente a WebP/JPEG (~25-35 KB) para carga instantánea y nulo impacto en rendimiento.
    * Borde dorado con aro de coleccionista pirata y opción de eliminar avatar.
  * **Normas de la Comunidad y Advertencia de Moderación:**
    * Mensaje explícito de tolerancia cero ante imágenes explícitas, violentas o protegidas, con advertencia de sanción o suspensión de cuenta.
  * **Datos Personales Opcionales & Rango de Coleccionista:**
    * Campo de Nombre y Apellidos opcional.
    * Selector de Rango Pirata (*Novato del East Blue*, *Peor Generación*, *Guerrero del Mar*, *Comandante de Yonko*, *Rey de los Piratas*) con icono de insignia (`Award`), sin emojis ni estética de IA.
    * Biografía o frase pirata personalizada de hasta 160 caracteres.
  * **Seguridad & Correo Vinculado:**
    * Visualización de correo asociado e insignia de Google OAuth.
    * Cambio seguro de contraseña integrado con Supabase Auth.
  * **Suscripción a Novedades (Newsletter):**
    * Casilla de verificación para recibir avisos de nuevas funciones, salidas de cartas oficiales y eventos.
  * **Feedback de Guardado Reasegurador:**
    * Animación de confeti celebratorio + casilla de notificación verde con check + botón dinámico en verde esmeralda con `¡Guardado con éxito!` para confirmar al usuario que los cambios están en la nube antes de cerrar el modal.
* **Esquema de Base de Datos Supabase (`supabase/profiles_schema.sql`):**
  * Tabla `public.profiles` con políticas RLS (lectura pública, escritura privada del propio usuario) y trigger automático para nuevos registros.

#### 🐛 Correcciones y Mejoras Visuales (Fixes & UI)
* **Header en Modo Claro:**
  * Corrección de contraste: el header en modo claro ahora tiene fondo blanco nítido (`bg-white/95 border-neutral-200`) eliminando el tono gris oscuro accidental.
* **Iconografía Limpia:**
  * Reemplazo de iconos de destellos tipo IA (`Sparkles`) por iconos limpios de condecoración (`Award`) en rangos e insignias.
* **Pie de Página (Footer):**
  * Inclusión de enlace y botón directo al portfolio de Killian Torrell (`killiantr.vercel.app`).
* **Logo en Footer en Modo Claro:**
  * Inversión de color adaptativa para el logo en modo claro.

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
