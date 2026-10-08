# Changelog — Grand Line Vault

Todas las versiones notables de este proyecto están documentadas en este archivo según el estándar **SemVer (Semantic Versioning)** adaptado con la filosofía de ciclo de vida de **Blizzard / World of Warcraft**.

---

## 📌 Guía de Estructura de Versiones: `[MAJOR] . [MINOR] . [PATCH]`

* **MAJOR (ej. `2.0.0`):** Expansión mayor (*Major Update*). Rediseño estructural, nueva arquitectura de base de datos, salto de versión o cambio que rompe compatibilidad (equivalente a las expansiones del WoW como *The War Within* o *Dragonflight*).
* **MINOR (ej. `0.1.0`):** Nueva característica o módulo (*Minor Update*). Se añade funcionalidad sustancial (nuevo álbum virtual, tablón de intercambio, filtros avanzados) de forma compatible.
* **PATCH (ej. `0.0.1`):** Corrección o parche (*Hotfix*). Arreglo de bugs, optimización de estilos visuales, hotfixes de rendimiento o pequeñas mejoras en el código existente.

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
* **Logotipos Oficiales de Grand Line Vault:**
  * **Versión Cuadrada (1:1):** Log Pose (brújula náutica), letras oficiales de "ONE PIECE CARD GAME" y relieve 3D en oro pirata "GRAND LINE VAULT". Integrado en el Navbar (`Navbar.jsx`) y pie de página (`Footer.jsx`).
  * **Versión Banner (16:9):** Composición cinematográfica náutica con mascarones de proa y madera tallada pirata con bronce. Configurado en `index.html` mediante etiquetas Open Graph y Twitter Cards (`og:image`) para que se muestre como vista previa al compartir el enlace de la web por WhatsApp, Discord, X/Twitter, etc.
* **Integración del Enlace Oficial de Buy Me a Coffee:**
  * Conectado el enlace oficial definitivo `https://buymeacoffee.com/grandlinevault`.

## [0.6.1] - 2026-10-07
### ☕ Patch — Buy Me a Coffee (Donaciones), Layout Simétrico ES/EN en Controles del Álbum y Ajuste Legal del Disclaimer

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Botón 'Buy Me a Coffee' en el Footer:**
  * Reemplazado el icono duplicado de portfolio web en la barra inferior por el icono oficial de la taza de café con corazón (*Buy Me a Coffee*), enlazado a la página oficial de aportaciones y donaciones comunitarias (`https://buymeacoffee.com/grandlinevault`).
  * Efecto de hover dinámico con el color dorado oficial `#FFDD00` de la marca Buy Me a Coffee y tooltip bilingüe (*"Invítame a un café (Donaciones)"* / *"Buy Me a Coffee (Donations)"*).
* **Ajuste Legal y Comunitario en el Disclaimer:**
  * Actualizado el texto legal a: *"One Piece Card Game es propiedad de Eiichiro Oda / Shueisha, Toei Animation y Bandai. Proyecto fan-made independiente sin fines comerciales, mantenido con apoyo voluntario de la comunidad."* (protege la condición legal del proyecto comunitario no comercial al recibir donaciones voluntarias de servidores).
* **Solución al Descuadre Vertical de Controles del Álbum (Español vs. Inglés):**
  * Corrección del salto de línea que provocaba que en español el toolbar ocupara dos líneas verticales por diferencias de longitud tipográfica (*"Bolsillos"* vs *"Pockets"* y acento en *"Pág."*).
  * Aplicado `flex-nowrap`, `whitespace-nowrap`, `shrink-0` y ancho mínimo consistente (`min-w-[72px]`) en el contador de páginas para garantizar una visualización simétrica, compacta y alineada en una sola fila en cualquier idioma y resolución.

## [0.6.0] - 2026-10-07
### 📦 Minor Update — Ingestión Masiva de Cartas Oficiales, Cobertura Completa OP-01 a OP-09 y ST-01/ST-02/ST-10, Accesibilidad Total de Estadísticas y Backups

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Ingestión Masiva de Cartas Oficiales de One Piece TCG:**
  * Ampliación del catálogo con cerca de 100 cartas auténticas con ilustraciones oficiales en alta resolución de Bandai.
  * Cobertura de sets ampliada:
    * **OP-01:** Romance Dawn
    * **OP-02:** Paramount War (Whitebeard, Ace, Kuzan SEC, Borsalino, Uta SEC)
    * **OP-03:** Pillars of Strength (Katakuri, Big Mom, Rob Lucci, Nami Alt-Win, Sogeking SEC)
    * **OP-04:** Kingdoms of Intrigue (Vivi, Rebecca, Sabo, Corazon SEC)
    * **OP-05:** Awakening of the New Era (Luffy Gear 5 SEC & Manga, Enel, Kid, Law)
    * **OP-06:** Wings of the Captain (Zoro SEC & Manga, Gecko Moria, Perona, Reiju, Yamato)
    * **OP-07:** 500 Years in the Future (Dragon, Bonney, Boa Hancock SEC & Manga, Lucci)
    * **OP-08:** Two Legends (Chopper, Rayleigh SEC, Whitebeard SEC, Marco)
    * **OP-09:** The Four Emperors (Blackbeard Teach, Buggy SEC & Manga, Shanks SEC, Gol.D.Roger SEC & Manga)
    * **ST-01:** Straw Hat Crew (Luffy, Zoro, Sanji, Chopper, Nami, Brook)
    * **ST-02:** Worst Generation (Kid, Killer, Bonney, Hawkins)
    * **ST-10:** The Three Captains (Law, Luffy, Kid)
    * **DON!! Cards:** Ilustraciones especiales (Gold Stamp, Manga Gear 5, Red Hair Pirates, Whitebeard Pirates, Blackbeard Darkness).
* **Script de Migración SQL para Supabase (`supabase/migration_v0.6.0_cards_mass_import.sql`):**
  * Script generado con todas las cartas estructuradas para inserción/actualización directa en la tabla `public.cards` de PostgreSQL.
* **Integración Completa de Sonido Táctil Háptico:**
  * Sonido de chasquido de funda (`playCardSnapSound`) conectado al añadir/quitar copias de cartas y al alternar la Wishlist en la ficha modal (`CardModal`) y en las acciones rápidas del catálogo (`CardCatalog`).
* **Accesibilidad Universal para Estadísticas y Backups:**
  * Añadidos botones directos de **Estadísticas & Valoración (€)** y **Copia de Seguridad & Exportar (JSON / OPTCG Sim)** en la barra de control para usuarios invitados y en la barra de navegación móvil para acceso instantáneo con un solo toque.

## [0.5.1] - 2026-10-07
### 💎 Patch — Sincronización en la Nube de Carpetas, Filtros Avanzados, Estadísticas Financieras, Backup/Export y Efectos de Sonido Hápticos

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Sincronización en la Nube de "Mis Carpetas" (Supabase Cloud Sync):**
  * Columna `custom_binders` (JSONB) integrada en `public.profiles` con políticas RLS seguras.
  * Sincronización automática con guardado diferido (*debounced*) en segundo plano para optimizar el rendimiento.
  * Migración transparente de carpetas creadas como invitado hacia la cuenta de usuario al iniciar sesión.
* **Filtros Avanzados y Ordenación Multicriterio en el Catálogo (`CardCatalog`):**
  * Filtro por **Categoría / Tipo de Carta**: Leader, Character, Event, Stage, DON!!.
  * Filtro por **Coste de Invocación**: 0 a 10+.
  * Nuevo selector de ordenación: por ID Oficial, Coste (menor a mayor / mayor a menor), Poder, Rareza, Precio en € y Nombre A-Z.
* **Estadísticas del Coleccionista & Valoración Financiera (`CollectionStatsModal`):**
  * Valor total de la colección estimado en euros (€) basado en cotizaciones reales de CardTrader.
  * Estimación del coste total para completar las cartas en la lista de deseos (*Wishlist*).
  * Desglose visual por rareza (Líderes, Raras, Super Raras, Secretas, Mangas) con contadores exactos.
  * Barras de progreso individuales por expansión con cálculo dinámico.
  * Sección "Joyas de la Corona": ranking de las cartas más valiosas poseídas con enlaces directos a CardTrader.
  * Acceso directo con insignia de valor monetario (`~XXX€`) en el pill de estadísticas del header y opción dedicada en el menú desplegable.
* **Copias de Seguridad, Exportación e Importación (`BackupModal`):**
  * Exportación de backup completo en formato `.json` (colección, wishlist y carpetas personalizadas) y restauración desde archivo.
  * Exportación estándar para el simulador competitivo **OPTCG Sim** (formato texto `4 OP01-001`) con copia al portapapeles y descarga `.txt`.
  * Importación rápida por pegado de texto plano o subida de listas para añadir cartas en lote a la colección.
* **Efectos de Sonido Táctiles (Web Audio API Synthesizer):**
  * Síntesis en tiempo real con cero dependencias externas ni peso de archivos MP3:
    * Sonido de paso de hoja (*whoosh*) al cambiar de página en el archivador.
    * Sonido de chasquido (*snap/click*) al enfundar o mover una carta entre bolsillos.
  * Conmutador con icono y estado (🔊 Activado / 🔇 Silenciado) guardado en `localStorage`.
* **Soporte de Mayúsculas en Nombres de Usuario:**
  * Permitido el uso de caracteres en mayúsculas en el `@username` (ej. `@Killian_TR`) manteniendo la unicidad insensible a mayúsculas (*case-insensitive*) en PostgreSQL.
* **Rediseño del Footer & Barra de Enlaces y Contacto:**
  * Eliminación del botón duplicado de portfolio en el pie de página para un diseño mucho más limpio y profesional.
  * Inclusión del año oficial de creación: `© 2026 Grand Line Vault • Creado y desarrollado por Killian Torrell` con enlace directo a [killiantr.vercel.app](https://killiantr.vercel.app).
  * Nueva barra de iconos de redes y contacto: perfil de **LinkedIn** ([in/killiantorrell](https://www.linkedin.com/in/killiantorrell)), **GitHub** ([@KillianTR](https://github.com/KillianTR)), **Portfolio Web** y botón de **Contacto** directo por correo electrónico.
  * Actualización de la insignia del footer a `v0.5.1`.

## [0.5.0] - 2026-10-07
### 📂 Minor Update — Carpetas Personalizadas, Ordenación Libre, Multicriterio & Limpieza de Cabecera Vault X

#### ✨ Nuevas Características & Mejoras (Features & UI)
* **Sistema de Carpetas Personalizadas ("Mis Carpetas"):**
  * **Dos modos en el álbum:** Alternancia rápida entre `Catálogo Oficial (Sets)` (checklist canónico con siluetas de cartas faltantes) y `Mis Carpetas (Álbum Libre)` (organización personalizada sin restricciones).
  * **Creación y gestión de carpetas:** Creación de múltiples carpetas con nombre propio, selección de portada y eliminación.
  * **Páginas dinámicas:** Botones para `+ Añadir Página` o eliminar páginas sobrantes en cualquier carpeta.
  * **Asignación libre por bolsillo:** Clic en cualquier bolsillo vacío para abrir el `CardPickerModal`, buscar por nombre/código, filtrar por tipo (Leader, Character, Event, Stage, DON!!) o mostrar solo cartas que el usuario ya posee en su colección.
  * **Drag & Drop HTML5 nativo:** Arrastra cartas directamente de un bolsillo a otro para reordenar filas o páginas al instante.
  * **Carpeta inicial preconfigurada:** Estructura realista con 4 Luffys en fila 1, 4 Zoros en fila 2, Sanji, Jinbe, páginas de Yonkos, Marines y sección de cartas DON!!.
  * Persistencia en `localStorage` con migración automática.
* **Navegación Oficial con "TODAS" las Expansiones y Multi-Página:**
  * Opción `TODAS` en el selector de expansiones para explorar todo el catálogo paginado (página 1, 2, 3...) en formato de 9 o 12 bolsillos.
  * Selector de ordenación multicriterio:
    * Por Tipo de Carta (Leader, Character, Event, Stage, DON!!)
    * Por Rareza
    * Por Color
    * Por Coste
    * Por Poder
    * Por Código de Carta (ID)
* **Limpieza y Pulido del Vault X Header:**
  * Eliminación de términos innecesarios: la placa ahora muestra limpiamente `VAULT X • ONE PIECE`.
  * Eliminación del subtítulo físico no aplicable (*"Acid-free, side-loading 9-pocket archival binder pages"*).
  * Retirada de la insignia de versión del navbar para despejar la cabecera; trasladada al menú desplegable de usuario (`Ajustes / Versión`) y al pie de página.
* **Ampliación de Cartas Mock:**
  * Incorporación de Sanji (`ST01-004`), Jinbe (`OP01-005`), Zoro Alt-Art (`OP01-026`), Sakazuki (`OP02-099`), Borsalino (`OP02-114`) y cartas de Don personalizadas (`DON-001`, `DON-002`).

---

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
