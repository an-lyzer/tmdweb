<template>
  <section class="servicios-cta" aria-labelledby="servicios-cta-titulo">
    <div class="servicios-cta__fondo" aria-hidden="true">Imagen de fondo próximamente</div>
    <div class="servicios-cta__contenido">
      <h2 id="servicios-cta-titulo">¿Tienes preguntas?</h2>
      <h6>Contáctanos y te daremos toda la información que necesitas<br />para dar el siguiente paso</h6>
      <RouterLink to="/contacto">Contáctanos</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.servicios-cta {
  position: relative;
  display: grid;
  min-height: 29rem;
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
  flex-direction: column;
  align-items: center;
}

.servicios-cta h2 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 4rem);
  font-weight: 600;
}

.servicios-cta h6 {
  margin: 1rem 0 0;
  color: rgb(255 255 255 / 88%);
  font-size: var(--text-h6);
  font-weight: 400;
  line-height: 1.35;
}

.servicios-cta a {
  display: grid;
  width: min(100%, 18rem);
  min-height: 4.25rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  place-items: center;
  border-radius: 0.9rem;
  background: var(--azul);
  color: var(--blanco);
  font-size: var(--text-h5);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 180ms ease;
}

.servicios-cta a:hover { background: var(--color-1); }

@media (max-width: 560px) {
  .servicios-cta { min-height: 25rem; padding: 2rem 1rem; }
  .servicios-cta h6 br { display: none; }
}
</style>
