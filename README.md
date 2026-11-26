# TMD

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Despliegue

El sitio obtiene contenido e imagenes desde Strapi. El archivo `.env` configura
el backend tanto para desarrollo como para produccion:

```env
VITE_STRAPI_URL=https://victorc295.sg-host.com
VITE_STRAPI_BLOG_COLLECTION=blogs
```

Puedes cambiar esta URL en el panel del hosting o en `.env.production`.
Para usar un backend local, configura `VITE_STRAPI_URL=http://localhost:1337`
en `.env.local`. Reinicia Vite despues de cambiar las variables.

Usa la URL publica HTTPS de Strapi, sin barra final ni `/api`. Ejecuta `npm run build` y
publica el contenido de `dist/` en un hosting estatico.

### SiteGround: evitar el 404 al refrescar

El archivo `public/.htaccess` configura la carga de las rutas de Vue Router
(`/servicios`, `/nosotros`, `/contacto`, `/blog` y `/blog/:slug`). Vite lo copia
a `dist/.htaccess` al ejecutar `npm run build`.

Publica todo el contenido de `dist/` en la carpeta del dominio en SiteGround
(normalmente `public_html`), incluyendo el archivo oculto `.htaccess`, junto a
`index.html`. Si el servidor ya tiene un `.htaccess` con otras reglas, incorpora
las reglas de este proyecto conservando las configuraciones existentes.

Despues de publicar, comprueba que puedes abrir directamente y refrescar cada
ruta, incluido un articulo del blog. Si SiteGround conserva el error anterior
en cache, purga la cache del sitio. Al agregar nuevas rutas a `src/router/index.ts`,
actualiza tambien la regla de paginas de `public/.htaccess`. Las rutas desconocidas
y los archivos inexistentes mantienen la respuesta 404 del servidor.

En Strapi debes publicar los permisos de lectura para las colecciones y los
archivos multimedia, autorizar el dominio del sitio en CORS y servir API y
archivos por HTTPS. Las variables `VITE_*` se incluyen en el JavaScript al
compilar: no pongas secretos ni tokens privados en ellas.
