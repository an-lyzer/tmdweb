<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import facebookIcon from '../assets/facebook.webp'
import linkedinIcon from '../assets/linkedin.webp'
import tiktokIcon from '../assets/tiktok.webp'
import profilePic from '../assets/profilepic.webp'
import { getArticleBySlug, type BlogArticle } from '../services/strapi'

const route = useRoute()
const fallbackImage = new URL('../assets/motor1.webp', import.meta.url).href
const article = ref<BlogArticle | null>(null)
const loading = ref(true)
const error = ref('')
const headings = computed(() => article.value?.content.filter((block) => block.type === 'heading') ?? [])
const activeImage = ref(0)
const videoAspectRatio = computed(() => {
  const raw = article.value?.videoUrl
  if (!raw) return '16 / 9'
  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, '').toLowerCase()
    if (host.endsWith('tiktok.com') || /youtube\.com$/.test(host) && url.pathname.includes('/shorts/')) return '9 / 16'
  } catch { /* el iframe muestra el enlace de respaldo cuando la URL no es válida */ }
  return '16 / 9'
})
const videoEmbedUrl = computed(() => {
  const raw = article.value?.videoUrl
  if (!raw) return null
  try {
    const url = new URL(raw)
    const host = url.hostname.replace(/^www\./, '').toLowerCase()
    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null
    }
    if (host.endsWith('youtube.com')) {
      const id = url.searchParams.get('v') ?? url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null
    }
    if (host.endsWith('tiktok.com')) {
      const id = url.pathname.match(/\/video\/(\d+)/)?.[1]
      return id ? `https://www.tiktok.com/player/v1/${id}?controls=1&description=1` : null
    }
    if (host.endsWith('facebook.com') || host === 'fb.watch') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(raw)}&show_text=0&width=1280`
    }
  } catch { return null }
  return null
})
const directVideoUrl = computed(() => {
  const raw = article.value?.videoUrl
  if (!raw) return null
  try {
    return /\.(?:mp4|m4v|mov|webm|ogv|ogg|m3u8)$/i.test(new URL(raw).pathname) ? raw : null
  } catch { return null }
})
const mediaSlides = computed(() => {
  const slides: Array<{ type: 'image' | 'video' | 'file' | 'link'; src: string }> = []
  if (videoEmbedUrl.value) slides.push({ type: 'video', src: videoEmbedUrl.value })
  else if (directVideoUrl.value) slides.push({ type: 'file', src: directVideoUrl.value })
  else if (article.value?.videoUrl) slides.push({ type: 'link', src: article.value.videoUrl })

  slides.push(...(article.value?.images ?? []).map((src) => ({ type: 'image' as const, src })))

  if (!slides.length) slides.push({ type: 'image' as const, src: fallbackImage })
  return slides
})
const activeSlide = computed(() =>
  mediaSlides.value[activeImage.value] ?? mediaSlides.value[0] ?? { type: 'image' as const, src: fallbackImage },
)

function formatDate(value: string | null) {
  if (!value) return 'Fecha por confirmar'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
function headingId(index: number) { return `seccion-${index}` }
function handleImageError(event: Event) {
  const image = event.currentTarget as HTMLImageElement
  const videoIndex = mediaSlides.value.findIndex((slide) => slide.type === 'video' || slide.type === 'file' || slide.type === 'link')
  if (videoIndex !== -1) {
    activeImage.value = videoIndex
    return
  }
  if (image.src !== fallbackImage) image.src = fallbackImage
}
function moveImage(step: number) {
  const count = mediaSlides.value.length
  if (count > 1) activeImage.value = (activeImage.value + step + count) % count
}

async function loadArticle(slug: string) {
  loading.value = true
  error.value = ''
  article.value = null
  activeImage.value = 0
  try {
    article.value = await getArticleBySlug(slug)
    if (!article.value) error.value = 'Esta publicación no existe o aún no ha sido publicada.'
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'No se pudo cargar el artículo.'
  } finally {
    loading.value = false
  }
}

watch(() => String(route.params.slug ?? ''), loadArticle, { immediate: true })
</script>

<template>
  <article class="publicacion-blog" aria-labelledby="publicacion-blog-titulo">
    <p v-if="loading" class="state">Cargando publicación...</p>
    <section v-else-if="error" class="state state--error">
      <p>{{ error }}</p><RouterLink to="/blog">Volver al blog</RouterLink>
    </section>

    <template v-else-if="article">
      <div class="publicacion-blog__contenedor">
        <div class="publicacion-blog__contenido">
          <nav class="publicacion-blog__migas" aria-label="Ruta de navegación">
            <RouterLink to="/blog">Blog</RouterLink><span aria-hidden="true">›</span><span>Noticias</span><span aria-hidden="true">›</span><span>{{ article.category }}</span>
          </nav>
          <h1 id="publicacion-blog-titulo">{{ article.title }}</h1>
          <div class="publicacion-blog__autor">
            <img class="publicacion-blog__autor-icono" :src="profilePic" alt="" />
            <p><strong>{{ article.author }}</strong><span aria-hidden="true">|</span> Publicado el {{ formatDate(article.publishedAt) }}</p>
          </div>
        </div>
        <div class="publicacion-blog__media">
          <div class="publicacion-blog__galeria" :class="{ 'publicacion-blog__galeria--vertical': activeSlide.type === 'video' && videoAspectRatio === '9 / 16' }" aria-label="Galería de imágenes y video del artículo">
            <img
              v-if="activeSlide.type === 'image'"
              class="publicacion-blog__imagen"
              :src="activeSlide.src"
              :alt="`${article.title} — imagen ${activeImage + 1} de ${mediaSlides.length}`"
              @error="handleImageError"
            />
            <div v-else-if="activeSlide.type === 'video'" class="publicacion-blog__video">
              <iframe :src="activeSlide.src" :title="`Video: ${article.title}`" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
            <video v-else-if="activeSlide.type === 'file'" class="publicacion-blog__video-file" :src="activeSlide.src" controls playsinline preload="metadata"></video>
            <a v-else class="publicacion-blog__video-link" :href="activeSlide.src" target="_blank" rel="noopener noreferrer">Ver video en una nueva pestaña <span aria-hidden="true">↗</span></a>
          </div>
          <div v-if="mediaSlides.length > 1" class="publicacion-blog__indicadores" aria-label="Seleccionar contenido">
            <button v-for="(slide, index) in mediaSlides" :key="`${slide.type}-${index}`" type="button" :aria-label="`Mostrar ${slide.type === 'video' || slide.type === 'link' ? 'video' : `imagen ${index + 1}`}`" :aria-current="activeImage === index ? 'true' : undefined" @click="activeImage = index"></button>
          </div>
        </div>
      </div>

      <section class="publicacion-blog__cuerpo" aria-label="Contenido del artículo">
        <aside class="publicacion-blog__lateral">
          <div class="publicacion-blog__compartir">
            <h2>Visita nuestras redes</h2>
            <div>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visitar LinkedIn"><img :src="linkedinIcon" alt="" /></a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="Visitar TikTok"><img :src="tiktokIcon" alt="" /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visitar Facebook"><img :src="facebookIcon" alt="" /></a>
            </div>
          </div>
          <nav v-if="headings.length" class="publicacion-blog__indice" aria-label="En este artículo">
            <h2>En este artículo</h2>
            <a v-for="(heading, index) in headings" :key="`${heading.text}-${index}`" :href="`#${headingId(index)}`">{{ index + 1 }}. {{ heading.text }}</a>
          </nav>
        </aside>

        <div class="publicacion-blog__texto">
          <template v-if="article.content.length">
            <template v-for="(block, index) in article.content" :key="index">
              <h2 v-if="block.type === 'heading'" :id="headingId(headings.findIndex((heading) => heading === block))">{{ block.text }}</h2>
              <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
              <ul v-else-if="block.type === 'list'"><li v-for="item in block.items ?? []" :key="item">{{ item }}</li></ul>
              <p v-else>{{ block.text }}</p>
            </template>
          </template>
          <p v-else>{{ article.excerpt }}</p>
        </div>
      </section>
    </template>
  </article>
</template>

<style scoped>
.publicacion-blog__contenedor { grid-template-columns: minmax(0, 1fr) minmax(0, 33.8125rem); }
.publicacion-blog__media { display: grid; min-width: 0; gap: 1rem; }
.publicacion-blog__galeria { position: relative; overflow: hidden; aspect-ratio: 16 / 10; border-radius: 1.5rem; background: #dce6d4; }
.publicacion-blog__imagen { display: block; width: 100%; height: auto; max-height: min(60vh, 36rem); aspect-ratio: 16 / 10; object-fit: contain; object-position: center; background: #dce6d4; }
.publicacion-blog__indicadores { display: flex; justify-content: center; gap: .5rem; padding: .25rem 0; }
.publicacion-blog__indicadores button { width: .6rem; height: .6rem; padding: 0; border-radius: 50%; background: #aeb8a4; }
.publicacion-blog__indicadores button[aria-current="true"] { background: #5e8d25; transform: scale(1.25); }
.publicacion-blog__galeria--vertical { width: min(100%, 24rem, 39vh); justify-self: center; aspect-ratio: 9 / 16; }
.publicacion-blog__video { position: absolute; inset: 0; overflow: hidden; background: #111; }
.publicacion-blog__video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.publicacion-blog__video-file { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #111; }
.publicacion-blog__video-link { display: flex; min-height: 4rem; align-items: center; justify-content: center; gap: .5rem; padding: 1rem; border-radius: 1rem; background: #202820; color: #fff; font-weight: 700; text-align: center; }
.publicacion-blog { min-height: 55rem; padding: clamp(3rem, 5vw, 5rem) 2rem; background: linear-gradient(116deg, #f8fdf1, #eef8de); color: var(--negro); }
.publicacion-blog__contenedor { display: grid; width: min(100%, 77.5rem); min-height: 21.375rem; margin: 0 auto; grid-template-columns: minmax(0, 1fr) 33.8125rem; gap: clamp(2.5rem, 6vw, 7rem); align-items: center; }
.publicacion-blog__contenido { display: flex; align-self: stretch; flex-direction: column; gap: 3rem; padding: 1rem 0; }.publicacion-blog__migas { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; font-size: var(--text-h6); }.publicacion-blog h1 { max-width: 12ch; margin: 0; font-size: clamp(2.8rem, 4.2vw, 4.5rem); line-height: 1.1; letter-spacing: -.05em; }.publicacion-blog__autor { display: flex; gap: .75rem; align-items: center; }.publicacion-blog__autor-icono { display: block; width: 2.85rem; aspect-ratio: 1; flex: 0 0 auto; border-radius: 50%; object-fit: cover; }.publicacion-blog__autor p { display: flex; flex-wrap: wrap; gap: .65rem; align-items: center; font-size: 1rem; }.publicacion-blog__imagen { display: block; width: 33.8125rem; height: 21.375rem; max-width: 100%; border-radius: 1.5rem; object-fit: cover; object-position: center; background: #dce6d4; }.publicacion-blog__cuerpo { display: grid; max-width: 77.5rem; margin: 0 auto; padding: clamp(5rem, 9vw, 10rem) 0 3rem; grid-template-columns: minmax(14rem, 18rem) minmax(0, 1fr); gap: 6.75rem; }.publicacion-blog__lateral { display: grid; gap: 3.5rem; align-self: start; position: sticky; top: 2rem; }.publicacion-blog__compartir h2, .publicacion-blog__indice h2 { font-size: var(--text-h6); }.publicacion-blog__compartir > div { display: flex; gap: 1rem; margin-top: 1.25rem; }.publicacion-blog__compartir a { display: grid; width: 3.25rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: #f8f8f5; }.publicacion-blog__compartir img { width: 1.5rem; height: 1.5rem; object-fit: contain; }.publicacion-blog__indice { display: grid; gap: 1rem; padding: 1.5rem; border-radius: .9rem; background: rgb(250 250 247 / 90%); box-shadow: 0 .75rem 2rem rgb(43 52 35 / 8%); }.publicacion-blog__indice a { color: #5e6259; line-height: 1.35; }.publicacion-blog__texto { display: grid; gap: 2rem; max-width: 57rem; }.publicacion-blog__texto h2 { font-size: var(--text-h4); }.publicacion-blog__texto p, .publicacion-blog__texto li, blockquote { font-size: var(--text-h6); line-height: 1.55; }.publicacion-blog__texto ul { display: grid; gap: .75rem; padding-left: 1.4rem; }blockquote { margin: 0; padding: 1.25rem 1.5rem; border-left: .35rem solid var(--color-2); background: rgb(255 255 255 / 55%); }.state { max-width: 50rem; margin: 8rem auto; padding: 2rem; border-radius: 1rem; background: #f0f2ea; text-align: center; }.state--error { background: #fff0ee; color: #8e3027; }.state a { display: inline-block; margin-top: 1rem; color: var(--azul); font-weight: 700; }
@media (max-width: 68.75rem) { .publicacion-blog__contenedor, .publicacion-blog__cuerpo { grid-template-columns: 1fr; }.publicacion-blog__contenedor { min-height: auto; }.publicacion-blog h1 { margin: 0; }.publicacion-blog__imagen { width: 100%; height: auto; aspect-ratio: 541 / 342; }.publicacion-blog__lateral { position: static; grid-template-columns: 1fr 1fr; gap: 2rem; } }
@media (max-width: 37.5rem) { .publicacion-blog__lateral { grid-template-columns: 1fr; }.publicacion-blog__autor p { font-size: 1rem; } }
.publicacion-blog__contenedor { grid-template-columns: minmax(0, 1fr) minmax(0, 33.8125rem); }
.publicacion-blog__imagen { width: 100%; height: auto; max-height: min(60vh, 36rem); aspect-ratio: 16 / 10; object-fit: contain; }
@media (max-width: 68.75rem) { .publicacion-blog__contenedor { grid-template-columns: 1fr; } }
@media (max-width: 37.5rem) { .publicacion-blog { padding-inline: 1rem; }.publicacion-blog__media { gap: .75rem; } }
</style>
