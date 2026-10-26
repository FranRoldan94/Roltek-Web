# SEO de roltek.es

Cómo está montado el SEO técnico de la web, qué queda por hacer fuera del repositorio y cómo trabajar con Google Search Console.

## Cómo funciona

| Pieza | Dónde | Notas |
|---|---|---|
| Metadatos por página | `generateMetadata` en cada `page.tsx`, con `pageMetadata()` de `src/lib/seo.ts` | Título, descripción, canonical, hreflang (`es`, `en`, `x-default` → inglés), Open Graph, X y RSS. |
| Valores por defecto | `src/app/[lang]/layout.tsx` | `metadataBase`, plantilla `%s — ROLTEK`, `robots` con `max-image-preview:large`. |
| Datos estructurados | `src/lib/seo.ts` y páginas | `WebSite` + `Person` en la home, `ProfilePage` en Sobre mí, `CreativeWork` en cada proyecto y `BlogPosting` en cada artículo. Enlazados por `@id` (`https://roltek.es/#person`). |
| Sitemap | `src/app/sitemap.ts` | Páginas públicas en ambos idiomas con alternativas hreflang. Los artículos llevan `lastModified` real (`updatedAt` o `publishedAt`); el resto no lleva fecha para no inventarla. |
| robots.txt | `src/app/robots.ts` | Permite todo y apunta al sitemap. |
| Imágenes OG | `opengraph-image.tsx` en cada ruta, plantilla en `src/lib/og.tsx` | 1200×630, por idioma, con texto alternativo traducido. |
| Iconos | `src/app/icon.svg`, `src/app/apple-icon.tsx`, `src/app/manifest.ts` | |
| 404 reales | `src/proxy.ts` | Con Cache Components, un slug desconocido respondería 200 con la UI de 404 (soft 404). El proxy comprueba los slugs de proyectos y artículos y devuelve 404 de verdad. La lista de artículos publicados se calcula en build en `next.config.ts`. |
| Previews sin indexar | `next.config.ts` (`headers`) | `X-Robots-Tag: noindex, nofollow` en `roltek-web.vercel.app` y en las URLs de despliegue de Vercel. |

### Decisiones

- **Blog vacío = `noindex`.** Mientras no haya artículos publicados, `/es/blog` y `/en/blog` llevan `noindex, follow` y no salen en el sitemap: una página sin contenido no aporta nada en Google. Se indexa sola al publicar el primer artículo.
- **Proyectos como `CreativeWork`, no `SoftwareApplication`.** La ficha de StepOrbit es un caso de estudio. Google exige `offers` y valoraciones para el resultado enriquecido de apps; sin ellos Search Console marcaría errores. `SoftwareApplication` debe ir en la futura página de producto (`/apps/steporbit`) cuando la app esté publicada, con plataforma y precio reales.
- **Sin `BreadcrumbList`.** La web no muestra migas de pan; Google pide que los datos estructurados reflejen lo que se ve en la página.
- **Sin `Organization`.** ROLTEK es una marca personal, no una empresa: se describe como `Brand` de la `Person`.
- **`x-default` en inglés.** Coincide con el idioma al que el proxy envía a los visitantes que no hablan español ni inglés (Googlebot rastrea sin `Accept-Language` y recibe `/en`; la versión española se descubre por hreflang, enlaces y sitemap).

## Checklist de producción

Estado comprobado el 2026-10-26 con `curl` contra producción:

- [x] HTTPS activo con HSTS (`max-age=63072000`).
- [x] `https://www.roltek.es` → `https://roltek.es/` con 308 (un salto).
- [x] `http://roltek.es` → `https://roltek.es/` con 308.
- [x] `https://roltek.es/` → `/es` o `/en` con 307 (redirección por idioma, temporal a propósito) y `Vary: Accept-Language, Cookie`.
- [x] `robots.txt` y `sitemap.xml` responden 200.
- [x] `roltek-web.vercel.app` está protegido por Vercel Authentication, así que Google no puede rastrearlo. Además, tras desplegar este cambio, responde con `noindex`.
- [x] Existe un registro TXT `google-site-verification` en el DNS de `roltek.es`.

Pendiente de revisar en los paneles (no se puede comprobar desde el repositorio):

- [ ] **Vercel → Settings → Environment Variables:** en *Production*, `NEXT_PUBLIC_SITE_URL` debe ser `https://roltek.es` o no existir (el valor por defecto ya es ese). Si apuntara a otro dominio, las canonical y el sitemap serían incorrectos.
- [ ] **Vercel → Settings → Domains:** `roltek.es` como dominio principal de producción y `www.roltek.es` con redirección 308 a `roltek.es` (es lo que se observa hoy).
- [ ] **`http://www.roltek.es`** hace dos saltos (`http://www` → `https://www` → `https://roltek.es/`). Es el comportamiento estándar de Vercel y Google lo sigue sin problema; solo se podría reducir a uno con una regla de redirección en Cloudflare, lo que no es necesario.
- [ ] **Cloudflare:** si los registros de Vercel están en modo *proxied* (nube naranja), comprobar que SSL/TLS está en *Full (strict)* para evitar bucles de redirección. Vercel recomienda *DNS only* (nube gris).
- [ ] **Search Console:** confirmar que la propiedad de dominio `roltek.es` está verificada y que el sitemap se ha enviado (ver abajo).

## Google Search Console

### 1. Verificar el dominio

Ya hay un TXT `google-site-verification=…` en el DNS, así que es probable que la propiedad exista. Si no:

1. En [Search Console](https://search.google.com/search-console), *Añadir propiedad* → **Dominio** → `roltek.es` (cubre `https`, `http`, `www` y subdominios).
2. Copia el registro TXT que muestra Google.
3. En Cloudflare → `roltek.es` → *DNS* → *Records* → *Add record*: tipo `TXT`, nombre `@`, contenido el valor copiado, TTL *Auto*.
4. Vuelve a Search Console y pulsa *Verificar*. La propagación suele tardar minutos, a veces horas.

No borres el TXT después: Google lo vuelve a comprobar periódicamente.

### 2. Enviar el sitemap

*Indexación → Sitemaps* → escribe `https://roltek.es/sitemap.xml` → *Enviar*. El estado debe pasar a *Correcto* y mostrar el número de URLs descubiertas (12 a fecha de hoy: 6 páginas × 2 idiomas).

### 3. Inspeccionar una URL

Escribe la URL completa (por ejemplo `https://roltek.es/es/projects/steporbit`) en la barra superior. Comprueba:

- *La URL está en Google* o el motivo por el que no lo está.
- *Canonical declarada por el usuario* y *Canonical seleccionada por Google*: deben coincidir.
- *Probar URL publicada* → *Ver página probada* para ver el HTML renderizado y la captura.

### 4. Solicitar indexación

Tras inspeccionar una URL nueva o actualizada, *Solicitar indexación*. Úsalo para páginas importantes (home, un proyecto o artículo nuevo); para el resto basta el sitemap. Hay un cupo diario.

### 5. Detectar errores de cobertura

*Indexación → Páginas*. Revisa *Por qué no se indexan las páginas*:

| Motivo | Qué significa aquí |
|---|---|
| Excluida por la etiqueta «noindex» | Esperado para `/es/blog` y `/en/blog` mientras no haya artículos. |
| Página con redirección | Esperado para `https://roltek.es/`, `www` y `http`. |
| No encontrada (404) | Esperado para URLs que no existen. Si aparece una URL real, es un error. |
| Rastreada: actualmente sin indexar / Descubierta: actualmente sin indexar | Normal en un sitio nuevo; mejora con contenido y enlaces externos. |
| Duplicada: Google ha elegido una canónica diferente | Revisar: no debería ocurrir. |

Revisa también *Experiencia → Métricas web principales* (necesita tráfico real para mostrar datos) y *Mejoras* (datos estructurados detectados).

### 6. Consultas, impresiones y clics

*Rendimiento → Resultados de búsqueda*. Activa *Clics totales*, *Impresiones totales*, *CTR medio* y *Posición media*. Las pestañas *Consultas* y *Páginas* muestran por qué búsquedas apareces y qué páginas reciben tráfico. Filtra por *Consulta contiene «roltek»* o *«roldán»* para seguir la búsqueda de marca. Los datos tardan 2–3 días en aparecer.

## Roadmap

### 30 días

- Enviar el sitemap y comprobar en *Páginas* que las 12 URLs se indexan.
- Añadir los perfiles reales que existan (LinkedIn, X…) en `socials` de `src/config/site.ts`: aparecen en el footer y en `Person.sameAs`, lo que ayuda a Google a asociar la marca con Fran Roldán.
- Confirmar los datos de StepOrbit (año, estado, tecnologías) y ampliar el caso de estudio con retos, enfoque y resultados reales: es la página con más potencial de búsquedas propias.
- Publicar el primer artículo técnico (por ejemplo, sobre SwiftUI o watchOS a partir del trabajo en StepOrbit). El blog se indexará automáticamente.

### 60 días

- Capturas reales de StepOrbit (`coverImage` y `gallery` con `next/image` y texto alternativo).
- Ritmo de publicación sostenible (1–2 artículos al mes) en los temas del blog; enlazar cada artículo con el proyecto relacionado y viceversa.
- Revisar en *Rendimiento* las consultas con impresiones y CTR bajo y ajustar títulos y descripciones de esas páginas.
- Conseguir enlaces externos legítimos: README de GitHub, perfil de LinkedIn, artículos invitados.

### 90 días

- Página de producto `/apps/steporbit` cuando la app se publique, con `SoftwareApplication` (sistema operativo, categoría, precio y enlace a la App Store) y la política de privacidad propia de la app.
- Migas de pan visibles en proyectos y artículos, y entonces `BreadcrumbList`.
- Si el blog crece: páginas por categoría (`/blog/swiftui`…) con contenido propio, no solo listados.
- Revisar Core Web Vitals con datos reales de campo en Search Console.

## Limitaciones

- Las métricas de rendimiento de este repositorio son de laboratorio (Playwright, móvil emulado, CPU ×4, red limitada contra `next start` en local). Los datos de campo solo los da Search Console o CrUX cuando hay tráfico suficiente.
- La indexación, las canónicas elegidas por Google y las consultas solo se pueden comprobar en Search Console.
- La validación de datos estructurados se ha hecho comprobando que el JSON-LD es válido y coherente con la página; conviene pasar las URLs públicas por la [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results) y el [validador de Schema.org](https://validator.schema.org/) tras desplegar.
