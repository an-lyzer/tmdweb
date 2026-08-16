<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getLogos } from '../services/strapi.ts'

const logoUrl = ref('')

onMounted(async () => {
  try {
    const logo = await getLogos()
    if (logo) logoUrl.value = `http://localhost:1337${logo}`
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <div class="site-footer__brand">
        <RouterLink to="/" aria-label="TMD Gas">
          <img v-if="logoUrl" :src="logoUrl" alt="TMD Gas" />
        </RouterLink>
        <p>© 2024 TMD Gas. Todos los derechos reservados.</p>
      </div>

      <nav class="site-footer__group" aria-label="TMD Gas">
        <h2>TMD GAS</h2>
        <RouterLink to="/servicios">Servicios</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
      </nav>

      <nav class="site-footer__group" aria-label="Nosotros">
        <h2>Nosotros</h2>
        <RouterLink to="/nosotros">Acerca de</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>

      <nav class="site-footer__group" aria-label="Ayuda">
        <h2>Ayuda</h2>
        <a href="#">Términos de servicio</a>
        <a href="#">Legal</a>
        <a href="#">Política de privacidad</a>
      </nav>

      <nav class="site-footer__group" aria-label="Síguenos">
        <h2>Síguenos</h2>
        <a href="#">Facebook</a>
        <a href="#">TikTok</a>
        <a href="#">LinkedIn</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background: #93c83d;
  color: var(--blanco);
}

.site-footer__content {
  display: grid;
  grid-template-columns: minmax(17rem, 2fr) repeat(4, minmax(7rem, 1fr));
  gap: clamp(2rem, 5vw, 6rem);
  max-width: 128rem;
  min-height: 21rem;
  margin: 0 auto;
  padding: clamp(3.5rem, 5vw, 5.5rem) 7rem;
  box-sizing: border-box;
}

.site-footer__brand {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
}

.site-footer__brand a {
  display: block;
}

.site-footer__brand img {
  display: block;
  width: 7rem;
  height: auto;
  object-fit: contain;
}

.site-footer__brand p {
  margin: auto 0 0;
  font-size: clamp(0.9rem, 1.2vw, 1.15rem);
  line-height: 1.35;
}

.site-footer__group {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}

.site-footer__group h2 {
  margin: 0 0 1.25rem;
  color: inherit;
  font-size: clamp(1.35rem, 2vw, 2rem);
  font-weight: 700;
  line-height: 1;
}

.site-footer__group a {
  color: inherit;
  font-size: clamp(0.95rem, 1.35vw, 1.3rem);
  line-height: 1.2;
  text-decoration: none;
}

.site-footer__group a:hover {
  text-decoration: underline;
  text-underline-offset: 0.2rem;
}

@media (max-width: 1050px) {
  .site-footer__content {
    grid-template-columns: minmax(14rem, 2fr) repeat(2, minmax(8rem, 1fr));
  }

  .site-footer__brand {
    grid-row: span 2;
  }
}

@media (max-width: 680px) {
  .site-footer__content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-height: auto;
    padding: 3rem 2rem;
  }

  .site-footer__brand {
    grid-column: span 2;
    grid-row: auto;
    gap: 2rem;
  }

  .site-footer__brand p {
    margin: 0;
  }
}

@media (max-width: 420px) {
  .site-footer__content {
    padding-inline: 1rem;
  }
}
</style>
