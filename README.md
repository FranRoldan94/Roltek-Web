# ROLTEK

Web oficial de [ROLTEK](https://roltek.es), la marca de ingeniería de software de Fran Roldán.

Next.js 16 (App Router, Cache Components) · TypeScript estricto · Tailwind CSS 4 · MDX · Motion.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm build && pnpm start
```

Copia `.env.example` a `.env.local` si necesitas cambiar la URL pública o el email de contacto.

## Idiomas

La web está en español (`/es`) e inglés (`/en`). `src/proxy.ts` redirige las rutas sin prefijo según el idioma del navegador (`Accept-Language`); si no es ninguno de los dos, usa inglés. El selector de idioma guarda la elección en la cookie `NEXT_LOCALE`, que tiene prioridad.

Los textos de la interfaz están en `src/i18n/dictionaries/` (`en.ts` define la forma y `es.ts` debe cumplirla, así que TypeScript avisa si falta una traducción).

## Estructura

```
src/
  app/[lang]/        rutas (home, about, projects, blog, contact, privacy, feed.xml, OG image)
  app/               sitemap, robots, icono y 404 global
  components/
    ui/              primitivas (botones, etiquetas, reveal, spotlight…)
    layout/          header, footer, navegación, selector de idioma
    sections/        secciones de la home
    projects/ blog/  componentes de cada dominio
  config/            marca y enlaces (site.ts), navegación, "Currently building" (now.ts)
  content/           proyectos (TS tipado) y artículos (MDX)
  i18n/              locales, diccionarios y carga por idioma
  lib/               SEO, carga de contenido, utilidades
  types/             modelos de contenido
```

## Contenido

**Proyecto nuevo:** crea `src/content/projects/<slug>.ts` con el tipo `Project` y añádelo a `src/content/projects/index.ts`. Los textos llevan versión `es` y `en`. Si no hay `coverImage`, se usa una ilustración (`visual`).

**Artículo nuevo:** crea `src/content/blog/<slug>/es.mdx` y/o `en.mdx` exportando sus metadatos:

```mdx
export const metadata = {
  title: "…",
  description: "…",
  publishedAt: "2026-11-01",
  category: "swiftui", // swiftui | kotlin | react | architecture | engineering
};
```

El tiempo de lectura, la tabla de contenidos (a partir de `##` y `###`), el sitemap y el RSS se generan solos. Con `draft: true` el artículo solo se ve en `pnpm dev`; `mdx-style-guide` es un borrador interno para revisar estilos.

**"Currently building":** edita `src/config/now.ts`.

**Redes sociales:** añádelas en `socials` dentro de `src/config/site.ts`.

**Imágenes Open Graph:** se generan solas para cada página, proyecto y artículo (`opengraph-image.tsx` en cada ruta) con la plantilla de `src/lib/og.tsx` y las fuentes Geist de `src/assets/fonts/`. No hay que crear ninguna imagen a mano.

## Futuras páginas de producto

Las páginas como `/apps/steporbit` van en `src/app/[lang]/apps/<producto>/`, con su propio `layout.tsx` si necesitan otra identidad visual. Heredan idioma, metadatos y estilos sin tocar el resto.

## Despliegue (Vercel)

1. Importa el repositorio en Vercel (detecta Next.js y pnpm a partir de `packageManager`).
2. Define `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_CONTACT_EMAIL` si difieren de los valores por defecto.
3. Añade el dominio `roltek.es` (y `www.roltek.es` redirigiendo al principal) en *Settings → Domains* y configura los DNS que indique Vercel.
