# Blog administrable con Strapi

La aplicación consulta la colección `blogs` de Strapi. Cada vez que publiques una entrada, aparecerá automáticamente en `/blog` al recargar la página.

## 1. Configura Strapi

El contenido que ya tienes usa estos campos. Si tu Collection Type tiene otro API ID plural, indícalo en `VITE_STRAPI_BLOG_COLLECTION`.

| Campo | Tipo | Requerido |
| --- | --- | --- |
| `Title` | Text (short text) | Sí |
| `slug` | UID, basado en `Title` | Sí |
| `textlargo` | Text (long text) | Sí |
| `imagen` o `imagenes` | Media, varias imágenes | No |
| `videoUrl` | Text (URL de YouTube, Facebook o TikTok) | No |
| `categoria` | Text (short text) | No |
| `autor` | Text (short text) | No |
| `fechaPublicacion` | Date | No |
| `destacado` | Boolean | No |

En **Settings → Users & Permissions → Roles → Public**, habilita para `Blog` los permisos `find` y `findOne`. Publica tanto las entradas como sus imágenes.

## 2. Indica la URL de Strapi

Copia `.env.example` como `.env.local` y cambia `VITE_STRAPI_URL` cuando la API no esté en `http://localhost:1337`. Reinicia Vite después de cambiarla.

## 3. Publica

En **Content Manager → Blogs**, crea una entrada, completa como mínimo `Title`, `slug` y `textlargo`, agrega opcionalmente varias imágenes en `imagen`/`imagenes` y un enlace en `videoUrl`, y pulsa **Publish**. La publicación mostrará las imágenes en un carrusel y el video incrustado en un reproductor adaptable. El extracto de la tarjeta se genera a partir del primer párrafo de `textlargo` si no agregas `extracto`. El listado se ordena por la fecha de publicación de Strapi. Marca `destacado` para que la entrada tenga prioridad en la columna de destacados.
