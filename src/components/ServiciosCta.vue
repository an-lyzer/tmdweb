<script setup lang="ts">
import buses from '../assets/Buses.webp'
</script>

<template>
  <section class="servicios-cta" aria-labelledby="servicios-cta-titulo">
    <div class="servicios-cta__fondo" :style="{ backgroundImage: `url(${buses})` }" aria-hidden="true"></div>
    <div class="servicios-cta__contenido">
      <h1 id="servicios-cta-titulo">¿Tienes preguntas?</h1>
      <h5>Contáctanos y te daremos toda la información que necesitas<br />para dar el siguiente paso</h5>
      <RouterLink to="/contacto">Contáctanos</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.servicios-cta {
  position: relative;
  display: grid;
  height: 20.3125rem;
  place-items: center;
  overflow: hidden;
  background: #1e2d31;
  color: var(--blanco);
  text-align: center;
}

.servicios-cta__fondo {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(90deg, #344e49, #18282f);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: rgb(255 255 255 / 45%);
  font-size: 0.9rem;
}

.servicios-cta__fondo::after {
  position: absolute;
  inset: 0;
  background: rgb(5 17 20 / 60%);
  content: '';
}

.servicios-cta__contenido {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, 56rem);
  padding: 0 1.5rem;
  flex-direction: column;
  align-items: center;
}

.servicios-cta h1 {
  margin: 0;
  font-weight: 600;
}

.servicios-cta h5 {
  margin: 1rem 0 0;
  color: rgb(255 255 255 / 88%);
  font-size: var(--text-h5);
  font-weight: 400;
  line-height: 1.35;
}

.servicios-cta a {
  display: inline-flex;
  box-sizing: border-box;
  width: min(100%, 14rem);
  height: 2.9375rem;
  min-height: 0;
  margin-top: 1.5rem;
  padding: 0 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  background: var(--azul);
  color: var(--blanco);
  font-size: var(--text-h5);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 180ms ease;
}

.servicios-cta a:hover { background: var(--color-2); }

@media (max-width: 900px) {
  .servicios-cta {
    height: auto;
    min-height: 18rem;
    padding: 3rem 2rem;
  }

  .servicios-cta__fondo {
    background-position: 45% center;
  }

  .servicios-cta h1 {
    font-size: clamp(2.1rem, 6vw, 3.25rem);
    line-height: 1.08;
  }

  .servicios-cta h5 {
    max-width: 40rem;
    margin-top: 0.85rem;
    font-size: clamp(1rem, 2.8vw, 1.3rem);
  }

  .servicios-cta a {
    width: min(100%, 12rem);
    height: 2.8rem;
    margin-top: 1.25rem;
    border-radius: 0.75rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 560px) {
  .servicios-cta {
    min-height: 16.5rem;
    padding: 2.5rem 1rem;
  }

  .servicios-cta__contenido {
    padding-inline: 0.5rem;
  }

  .servicios-cta__fondo {
    background-position: 42% center;
  }

  .servicios-cta h1 {
    font-size: clamp(1.85rem, 9vw, 2.5rem);
  }

  .servicios-cta h5 {
    font-size: 0.98rem;
    line-height: 1.4;
  }

  .servicios-cta h5 br { display: none; }

  .servicios-cta a {
    width: min(72%, 10.5rem);
    height: 2.65rem;
    padding-inline: 0.9rem;
    font-size: 1rem;
  }
}
</style>
