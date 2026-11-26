<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{ title: string; description: string }>()

const pages = [
  { to: '/terminos-de-servicio', label: 'Términos de servicio' },
  { to: '/legal', label: 'Aviso legal' },
  { to: '/politica-de-privacidad', label: 'Política de privacidad' },
]
</script>

<template>
  <div class="legal-page">
    <header class="legal-page__header">
      <RouterLink class="legal-page__back" to="/">← Volver al inicio</RouterLink>
      <p class="legal-page__eyebrow">TMD Gas · Información legal</p>
      <h1>{{ title }}</h1>
      <p class="legal-page__description">{{ description }}</p>
      <p class="legal-page__date">Última actualización: <time datetime="2026-10-15">15 de octubre de 2026</time></p>
    </header>

    <div class="legal-page__body">
      <nav class="legal-page__nav" aria-label="Páginas legales">
        <RouterLink v-for="page in pages" :key="page.to" :to="page.to">{{ page.label }}</RouterLink>
      </nav>
      <article class="legal-page__content" :aria-label="title">
        <slot />
        <aside class="legal-page__contact" aria-label="Contacto TMD Gas">
          <h2>¿Necesitas comunicarte con nosotros?</h2>
          <p>Encuéntranos en Av. Evitamiento 1980, Ate, Lima, Perú, o llámanos al <a href="tel:+51934215417">+51 934 215 417</a>.</p>
          <RouterLink to="/contacto">Ver canales de contacto →</RouterLink>
        </aside>
      </article>
    </div>
  </div>
</template>

<style scoped>
.legal-page { max-width: 100rem; margin: 0 auto; padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 5.5vw, 7rem); }
.legal-page__header { padding-bottom: 2.5rem; border-bottom: 1px solid #dce5d3; }
.legal-page__back { display: inline-block; margin-bottom: 2.5rem; color: var(--azul); font-size: 0.95rem; }
.legal-page__eyebrow { margin-bottom: 1rem; color: #537c21; font-weight: 600; }
.legal-page h1 { max-width: 20ch; color: #3a561c; font-size: clamp(2.1rem, 4.5vw, 4rem); line-height: 1.15; overflow-wrap: anywhere; }
.legal-page__description { max-width: 48rem; margin-top: 1.5rem; font-size: 1.1rem; line-height: 1.7; }
.legal-page__date { margin-top: 1.5rem; color: #60665c; font-size: 0.875rem; }
.legal-page__body { display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: clamp(2rem, 5vw, 5rem); padding-top: 2.5rem; align-items: start; }
.legal-page__nav { display: grid; gap: 0.5rem; }
.legal-page__nav a { padding: 1rem; border-left: 3px solid transparent; border-radius: 0 0.5rem 0.5rem 0; line-height: 1.5; }
.legal-page__nav a.router-link-exact-active { border-left-color: #537c21; background: #f2f7e9; color: #3a561c; font-weight: 600; }
.legal-page__content { max-width: 49rem; min-width: 0; line-height: 1.8; overflow-wrap: anywhere; }
.legal-page__content :deep(section + section) { margin-top: 2rem; }
.legal-page__content :deep(h2) { margin-bottom: 0.75rem; color: #3a561c; font-size: clamp(1.2rem, 2vw, 1.5rem); line-height: 1.4; font-weight: 600; }
.legal-page__content :deep(p + p) { margin-top: 0.75rem; }
.legal-page__content :deep(ul) { padding-left: 1.4rem; margin: 0.75rem 0; }
.legal-page__content :deep(li + li) { margin-top: 0.5rem; }
.legal-page__content :deep(a) { color: var(--azul); text-decoration: underline; text-underline-offset: 0.2em; }
.legal-page__contact { margin-top: 2.5rem; padding: clamp(1.25rem, 3vw, 2rem); border-radius: 1rem; background: #f2f7e9; }
.legal-page__contact > a { display: inline-block; margin-top: 1rem; font-weight: 600; }
.legal-page a:hover { text-decoration: underline; text-underline-offset: 0.2em; }
.legal-page a:focus-visible, .legal-page__content :deep(a:focus-visible) { outline: 3px solid var(--azul); outline-offset: 4px; }
@media (max-width: 760px) {
  .legal-page__body { grid-template-columns: 1fr; gap: 2rem; }
  .legal-page__nav { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.25rem; }
  .legal-page__nav a { padding: 0.75rem 0.5rem; font-size: 0.85rem; overflow-wrap: anywhere; }
}
@media (max-width: 420px) {
  .legal-page__nav { grid-template-columns: 1fr; }
}
</style>
