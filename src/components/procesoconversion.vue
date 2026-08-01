<script setup lang="ts">
import montanasVerdes from '../assets/logoscarros/montañasverdes.png'

const pasos = [
  { numero: '1', titulo: 'Análisis de retorno de inversión', imagen: '' },
  { numero: '2', titulo: 'Estudio de Viabilidad', imagen: '' },
  { numero: '3', titulo: 'Asesoría personalizada', imagen: '' },
]
</script>

<template>
  <section class="proceso" aria-labelledby="proceso-titulo">
    <img :src="montanasVerdes" alt="" class="proceso__montanas" aria-hidden="true" />

    <header class="proceso__header">
      <h2 id="proceso-titulo">Convertimos tu unidad de forma rápida y segura</h2>
      <p>En TMD seguimos un flujo profesional para atender todas tus necesidades</p>
    </header>

    <div class="proceso__pasos">
      <article v-for="paso in pasos" :key="paso.numero" class="proceso__paso">
        <span class="proceso__numero" aria-hidden="true">{{ paso.numero }}</span>
        <div class="proceso__imagen">
          <img v-if="paso.imagen" :src="paso.imagen" :alt="paso.titulo" />
          <span v-else aria-hidden="true">Imagen próximamente</span>
          <h3>{{ paso.titulo }}</h3>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.proceso {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(1rem, 2vw, 2rem) 7rem clamp(3rem, 7vw, 7rem);
  background: var(--blanco);
}

.proceso__montanas {
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 18rem;
  object-fit: fill;
  object-position: bottom;
  pointer-events: none;
}

.proceso__header {
  position: relative;
  z-index: 1;
  max-width: 78rem;
  margin: 0 auto clamp(1.5rem, 3vw, 3rem);
  text-align: center;
}

.proceso__header h2 {
  max-width: 80rem;
  margin: 0 auto;
  color: var(--color-3, #537c21);
  font-size: clamp(2.2rem, 4.8vw, 5rem);
  font-weight: 600;
  line-height: 1.08;
}

.proceso__header p {
  margin: clamp(1rem, 2vw, 2rem) 0 0;
  color: #777;
  font-size: clamp(1rem, 1.7vw, 1.65rem);
}

.proceso__pasos {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.5rem, 5.5vw, 7rem);
  max-width: 112rem;
  margin: 0 auto;
}

.proceso__paso {
  position: relative;
  padding-top: clamp(3rem, 5vw, 5.5rem);
}

.proceso__numero {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 50%;
  color: #9bcf47;
  font-size: clamp(5rem, 9vw, 9rem);
  font-weight: 600;
  line-height: 0.75;
  text-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 20%);
  transform: translateX(-50%);
}

.proceso__imagen {
  position: relative;
  display: grid;
  aspect-ratio: 1.35 / 1;
  place-items: center;
  overflow: hidden;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #365f24, #7aa329);
  box-shadow: 0 0.5rem 1.2rem rgb(0 0 0 / 18%);
}

.proceso__imagen::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 5%), rgb(0 0 0 / 56%));
  content: '';
}

.proceso__imagen > span {
  color: rgb(255 255 255 / 70%);
  font-size: 0.9rem;
}

.proceso__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.proceso__imagen h3 {
  position: absolute;
  z-index: 1;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  margin: 0;
  color: var(--blanco);
  font-size: clamp(1.25rem, 2.4vw, 2.55rem);
  font-weight: 600;
  line-height: 1.12;
  text-align: center;
}

@media (max-width: 800px) {
  .proceso {
    padding-bottom: 8rem;
    padding-inline: 2rem;
  }

  .proceso__pasos {
    grid-template-columns: 1fr;
    max-width: 30rem;
  }

  .proceso__montanas {
    min-width: 140%;
    width: 140%;
    height: 14rem;
  }
}

@media (max-width: 480px) {
  .proceso {
    padding-inline: 1rem;
  }
}
</style>
