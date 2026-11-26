<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getArticles, type BlogArticle } from '../services/strapi'

const fallbackImage = new URL('../assets/motor1.webp', import.meta.url).href
const PAGE_SIZE = 6
const articles = ref<BlogArticle[]>([])
const search = ref('')
const visibleCount = ref(PAGE_SIZE)
const loading = ref(true)
const error = ref('')

const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase())
const filteredArticles = computed(() => {
  if (!normalizedSearch.value) return articles.value
  return articles.value.filter((article) =>
    [article.title, article.excerpt, article.category].join(' ').toLocaleLowerCase().includes(normalizedSearch.value),
  )
})
const visibleArticles = computed(() => filteredArticles.value.slice(0, visibleCount.value))
const featuredArticles = computed(() => {
  const featured = articles.value.filter((article) => article.featured)
  return (featured.length ? featured : articles.value).slice(0, 3)
})
const latestArticles = computed(() => articles.value.slice(0, 2))
const canLoadMore = computed(() => visibleCount.value < filteredArticles.value.length)

function imageFor(article: BlogArticle) { return article.image ?? fallbackImage }
function formatDate(value: string | null) {
  if (!value) return 'Próximamente'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}
function submitSearch() { visibleCount.value = PAGE_SIZE }
function loadMore() { visibleCount.value += PAGE_SIZE }

async function loadBlog() {
  loading.value = true
  error.value = ''
  try {
    // Un lote amplio permite buscar sin realizar una petición adicional.
    const result = await getArticles(1, 100)
    articles.value = result.articles
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'No se pudo cargar el blog.'
  } finally {
    loading.value = false
  }
}

onMounted(loadBlog)
</script>

<template>
  <section class="blog">
    <div class="buscador">
      <span class="buscador__badge">Blog</span>
      <h1>Descubre nuestras últimas noticias</h1>
      <p>Descubre los logros y avances que nos diferencian. Desde conversiones hasta mejoras en nuestros servicios.</p>
      <form class="buscador__form" @submit.prevent="submitSearch">
        <label class="sr-only" for="search-articles">Buscar artículos</label>
        <div class="buscador__field">
          <span class="buscador__icon" aria-hidden="true">⌕</span>
          <input id="search-articles" v-model="search" type="search" placeholder="Buscar artículos..." />
        </div>
        <button type="submit">Buscar</button>
      </form>
    </div>

    <div class="main-blog">
      <div class="articulos">
        <div class="main-blog__title"><h2>Conocimiento que impulsa tu negocio.</h2><span class="main-blog__line" aria-hidden="true"></span></div>
        <p v-if="loading" class="status">Cargando artículos...</p>
        <div v-else-if="error" class="status status--error">
          <p>{{ error }}</p><button type="button" @click="loadBlog">Intentar otra vez</button>
        </div>
        <p v-else-if="!visibleArticles.length" class="status">No encontramos artículos para tu búsqueda.</p>
        <div v-else class="articulos__grid">
          <RouterLink v-for="article in visibleArticles" :key="article.id" :to="{ name: 'publicacion-blog', params: { slug: article.slug } }" class="article-card">
            <img class="article-card__image" :src="imageFor(article)" :alt="article.title" />
            <div class="article-card__overlay">
              <span class="article-card__category">{{ article.category }}</span>
              <h3>{{ article.title }}</h3><p>{{ article.excerpt }}</p>
            </div>
          </RouterLink>
        </div>
        <button v-if="canLoadMore" class="articulos__more" type="button" @click="loadMore"><span aria-hidden="true">⟳</span> Cargar más</button>
      </div>

      <aside v-if="!loading && !error && articles.length" class="articulos destacados">
        <section v-if="featuredArticles.length" class="sidebar-section">
          <div class="sidebar-section__title"><h3>Artículos destacados</h3><span aria-hidden="true"></span></div>
          <RouterLink v-for="article in featuredArticles" :key="article.id" :to="{ name: 'publicacion-blog', params: { slug: article.slug } }" class="sidebar-card">
            <img class="sidebar-card__image" :src="imageFor(article)" :alt="article.title" />
            <div class="sidebar-card__content"><span>{{ formatDate(article.publishedAt) }}</span><h4>{{ article.title }}</h4></div>
          </RouterLink>
        </section>
        <section v-if="latestArticles.length" class="sidebar-section">
          <div class="sidebar-section__title"><h3>Lo último</h3><span aria-hidden="true"></span></div>
          <RouterLink v-for="article in latestArticles" :key="article.id" :to="{ name: 'publicacion-blog', params: { slug: article.slug } }" class="sidebar-card">
            <img class="sidebar-card__image" :src="imageFor(article)" :alt="article.title" />
            <div class="sidebar-card__content"><span>{{ formatDate(article.publishedAt) }}</span><h4>{{ article.title }}</h4></div>
          </RouterLink>
        </section>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.blog { min-height: calc(100vh - 7rem); padding: 2.5rem 1.5rem 4rem; background: #fbfbf7; }
.buscador { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; max-width: 1100px; margin: 0 auto; text-align: center; }
.buscador__badge { padding: .7rem 1rem; border-radius: 999px; background: #dff0be; font: 600 1rem Inter, sans-serif; }
.buscador h1 { max-width: 14ch; color: #333634; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: .98; letter-spacing: -.04em; }.buscador p { max-width: 62rem; color: #505450; font-size: clamp(1.1rem, 1.3vw, 1.55rem); line-height: 1.45; }
.buscador__form { display: flex; align-items: center; gap: 1rem; width: min(100%, 760px); margin-top: .5rem; }.buscador__field { display: flex; flex: 1; gap: .85rem; align-items: center; min-width: 0; padding: .9rem 1.2rem; border: 2px solid #d0d0cb; border-radius: .75rem; background: var(--blanco); }.buscador__icon { color: #8a8c86; font-size: 1.4rem; }.buscador__field input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--negro); }
.buscador__form button, .status button { padding: .95rem 1.6rem; border-radius: .75rem; background: var(--azul); color: var(--blanco); font-weight: 700; }
.main-blog { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 2rem; align-items: start; width: min(100%, 1240px); margin: 3.5rem auto 0; }.main-blog__title, .sidebar-section__title { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }.main-blog__title h2 { color: #393d39; font-size: clamp(1.8rem, 2vw, 2.8rem); line-height: 1.05; letter-spacing: -.04em; white-space: nowrap; }.main-blog__line, .sidebar-section__title span { flex: 1; height: 1px; background: #d7dacd; }
.articulos__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }.article-card { position: relative; display: block; min-height: 360px; overflow: hidden; border-radius: 1rem; background: #2d2d2d; color: var(--blanco); }.article-card__image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 220ms ease; }.article-card:hover .article-card__image, .article-card:focus-visible .article-card__image { transform: scale(1.04); }.article-card::after { position: absolute; inset: 0; content: ''; background: linear-gradient(180deg, rgb(0 0 0 / 8%), rgb(0 0 0 / 65%)); }.article-card__overlay { position: absolute; z-index: 1; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; gap: .55rem; padding: 1rem; }.article-card__category { align-self: flex-start; padding: .4rem .75rem; border-radius: 999px; background: rgb(255 255 255 / 95%); color: #333634; font: 600 .9rem Inter, sans-serif; }.article-card__overlay h3 { font-size: 1.35rem; line-height: 1.15; }.article-card__overlay p { display: -webkit-box; max-width: 32ch; overflow: hidden; font-size: .84rem; line-height: 1.35; color: rgb(255 255 255 / 92%); -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.articulos__more { display: flex; gap: .5rem; align-items: center; margin: 2rem auto 0; padding: .65rem 1rem; border-radius: .65rem; background: #dfeebc; color: #4a4f46; font-weight: 700; }.destacados { display: flex; flex-direction: column; gap: 1.6rem; }.sidebar-section__title h3 { color: #393d39; font-size: 1.15rem; white-space: nowrap; }.sidebar-card { display: grid; grid-template-columns: 84px 1fr; gap: .85rem; align-items: center; margin-bottom: 1.1rem; }.sidebar-card__image { width: 84px; height: 84px; border-radius: .7rem; object-fit: cover; }.sidebar-card__content span { display: block; margin-bottom: .3rem; color: #6f726b; font-size: .85rem; }.sidebar-card__content h4 { color: #303330; font-size: 1rem; line-height: 1.35; }
.status { padding: 2rem; border-radius: 1rem; background: #f0f2ea; color: #505450; text-align: center; }.status--error { background: #fff0ee; color: #8e3027; }.status button { margin-top: 1rem; }.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
@media (max-width: 1150px) {
  .main-blog { grid-template-columns: minmax(0, 1fr) 17rem; }
  .articulos__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 900px) {
  .blog { padding-inline: 2rem; }
  .main-blog { grid-template-columns: 1fr; }
  .destacados {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 680px) {
  .blog { padding: 2rem 1rem 3rem; }
  .buscador { gap: 1rem; }
  .buscador h1 { font-size: clamp(2.2rem, 11vw, 3.25rem); }
  .buscador p { font-size: 1rem; }
  .buscador__form { flex-direction: column; align-items: stretch; gap: .75rem; }
  .buscador__form button { width: 100%; }
  .main-blog { margin-top: 2.5rem; }
  .main-blog__title h2 { white-space: normal; }
  .articulos__grid { grid-template-columns: 1fr; }
  .article-card { min-height: 20rem; }
  .destacados { grid-template-columns: 1fr; gap: 1.25rem; }
  .sidebar-card { grid-template-columns: 4.5rem minmax(0, 1fr); }
  .sidebar-card__image { width: 4.5rem; height: 4.5rem; }
}

@media (max-width: 380px) {
  .article-card { min-height: 18rem; }
  .main-blog__title { align-items: flex-start; }
  .main-blog__title h2 { font-size: 1.65rem; }
}
</style>
