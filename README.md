# 🏴‍☠️ Grand Line Vault — One Piece TCG Virtual Binder & Tracker

[![Versión](https://img.shields.io/badge/version-v0.2.0--minor-amber?style=for-the-badge&logo=git)](CHANGELOG.md)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20&%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Despliegue](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

> **Grand Line Vault** es una aplicación web moderna diseñada para coleccionistas y jugadores del **One Piece Card Game (OPTCG)**. Permite gestionar tu inventario personal, rastrear cartas faltantes y experimentar tu colección en un **álbum virtual interactivo inspirado en archivadores físicos Vault X** (con hojas de 9 y 12 bolsillos, fundas protectoras, efectos holográficos y enlace directo a CardTrader para comparar precios).

---

## 🌟 Características Principales

### 📖 1. Álbum Virtual Interactivo (Estilo Vault X)
* **Estética de archivador de colección:** Acabado de textura de piel negra (`binder-leather`), pespuntes cosidos en hilo dorado (`binder-stitching`) y sombreado de lomo.
* **Cuadrícula de bolsillos adaptable:** Configurable entre **9 bolsillos (3x3)** (estándar tipo Vault X Zip Binder) y **12 bolsillos (4x3)**.
* **Visualización inteligente:**
  * **Cartas en posesión:** Se muestran a todo color con su contador de copias (ej. `x1`, `x4`) y efecto de brillo holográfico al pasar el ratón (`holo-shine`) en cartas raras (SR, SEC, Alternate Art).
  * **Cartas faltantes:** Se muestran en silueta translúcida en escala de grises con etiqueta de `"FALTA"` y botones rápidos para marcarlas como obtenidas, añadirlas a tu lista de deseos (*Wishlist*) o buscarlas en CardTrader.
* **Barra de completitud:** Porcentaje dinámico de cartas conseguidas por cada expansión (ej. *OP-01 Romance Dawn*, *OP-05*, *OP-09*).
* **Celebración con confeti:** Efecto visual al completar cartas en el álbum.

### 🔍 2. Catálogo & Base de Datos Oficial
* Buscador en tiempo real por nombre de carta, código identificador (ej. `OP05-060`, `ST01-012`) o texto de habilidad.
* Filtros combinados por:
  * **Expansión:** OP-01, OP-05, OP-09, ST-01, etc.
  * **Color:** Rojo, Verde, Azul, Púrpura, Negro, Amarillo o multicolor.
  * **Rareza:** Leader (`L`), Common (`C`), Uncommon (`UC`), Rare (`R`), Super Rare (`SR`), Secret Rare (`SEC`), Special/Manga (`SP`).
  * **Estado de posesión:** *Todas*, *En Colección*, *Faltantes* y *Wishlist*.

### ⚡ 3. Ficha Técnica & Enlace a CardTrader
* Al hacer clic en cualquier carta se abre una ventana modal con:
  * Ilustración oficial en alta definición.
  * Estadísticas de juego: Coste, Vidas, Poder de ataque, Valor de contraataque (Counter), Atributo y Rasgos de tripulación.
  * Texto íntegro de la habilidad o efecto.
  * Estimación de precio de mercado.
  * **Botón directo a CardTrader:** Abre la búsqueda exacta de esa carta en el marketplace oficial para ver cotizaciones reales y vendedores disponibles.

### 🤝 4. Tablón de Intercambios Comunitario (P2P)
* Espacio para que los miembros de la comunidad publiquen cartas repetidas que ofrecen y qué cartas buscan para cerrar acuerdos locales o por envío.

---

## 🏷️ Sistema de Versionado SemVer (Estilo Blizzard / WoW)

El proyecto sigue una nomenclatura estricta de versiones basada en tres cifras: **`MAJOR . MINOR . PATCH`** (ejemplo: `2.0.1`):

```
       ┌─────────── MAJOR : Gran actualización / Expansión (como en World of Warcraft)
       │ ┌───────── MINOR : Nueva funcionalidad o módulo sin romper compatibilidad
       │ │ ┌─────── PATCH : Hotfix, reparación de bugs o parche rápido
       ▼ ▼ ▼
       2 . 0 . 1
```

1. **MAJOR (`2.x.x`):** Cambios de arquitectura global, migraciones mayores de base de datos o rediseños integrales.
2. **MINOR (`x.1.x`):** Nuevas pantallas o módulos (ej. añadir el álbum virtual, sistema de login o filtros avanzados).
3. **PATCH (`x.x.1`):** Hotfixes de código, optimizaciones de CSS o resolución de incidencias.

> 💡 Puedes consultar el historial completo en [CHANGELOG.md](CHANGELOG.md) o haciendo clic en la insignia de versión en la cabecera de la aplicación.

---

## 🌿 Flujo de Trabajo con Ramas en Git (Git Flow)

Para mantener el repositorio limpio y estructurado para la comunidad y portfolio:

* **`main`:** Código estable y probado listo para producción en Vercel. Cada merge aquí lleva un tag de versión (`git tag -a v0.1.0 -m "Release v0.1.0"`).
* **`feature/<nombre-de-la-tarea>`:** Ramas de desarrollo para nuevas características (ej. `feature/virtual-binder`, `feature/supabase-auth`).
* **`hotfix/<nombre-del-fallo>`:** Ramas para parches urgentes que se fusionan de inmediato tras corregir el error.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Iconografía:** [Lucide Icons](https://lucide.dev/)
* **Efectos:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Persistencia Inicial:** Web Storage API (`localStorage`)
* **Despliegue:** [Vercel](https://vercel.com/)
* **Backend Futuro:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)

---

## 🚀 Instalación y Puesta en Marcha Local

Clona el repositorio e instala las dependencias:

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/one-piece-tcg.git

# 2. Entrar a la carpeta
cd one-piece-tcg

# 3. Instalar paquetes de npm
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abre tu navegador en `http://localhost:5173` para disfrutar de la experiencia.

---

## 📄 Licencia y Aviso Legal

Este proyecto es de código abierto bajo la licencia MIT.  
*One Piece Card Game* es marca registrada y propiedad intelectual de Eiichiro Oda / Shueisha, Toei Animation y Bandai Namco. Esta web es una herramienta comunitaria creada por fans sin ánimo de lucro.
