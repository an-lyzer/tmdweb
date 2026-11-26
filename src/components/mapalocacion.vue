<template>
  <section class="mapa-locacion" aria-label="Ubicación de TMD Gas">
    <iframe
      title="Ubicación de TMD Gas en Av. Evitamiento 1980, Ate, Lima"
      src="https://www.google.com/maps?q=Av.+Evitamiento+1980,+Ate,+Lima&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </section>
</template>

<style scoped>
.mapa-locacion {
  width: 100%;
  height: 32rem;
  overflow: hidden;
  background: #e9eee4;
}

.mapa-locacion iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 680px) {
  .mapa-locacion {
    height: clamp(18rem, 75vw, 24rem);
  }
}
</style>
