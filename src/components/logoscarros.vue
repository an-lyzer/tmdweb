<script setup lang="ts">
import bmw from '../assets/logoscarros/bmw.png'
import goldenDragon from '../assets/logoscarros/goldendragon.png'
import iveco from '../assets/logoscarros/iveco.png'
import man from '../assets/logoscarros/man.png'
import mercedes from '../assets/logoscarros/mercedes.png'
import volkswagen from '../assets/logoscarros/volkswagen.png'
import volvo from '../assets/logoscarros/volvo.png'
import yutong from '../assets/logoscarros/yutong.png'

const logos = [
  { name: 'BMW', src: bmw },
  { name: 'Golden Dragon', src: goldenDragon },
  { name: 'Iveco', src: iveco },
  { name: 'MAN', src: man },
  { name: 'Mercedes-Benz', src: mercedes },
  { name: 'Volkswagen', src: volkswagen },
  { name: 'Volvo', src: volvo },
  { name: 'Yutong', src: yutong },
]

// La segunda copia permite que el desplazamiento sea continuo.
const carouselLogos = [...logos, ...logos]
</script>

<template>
  <section class="logos-carousel" aria-label="Marcas de vehículos compatibles">
    <div class="logos-carousel__viewport">
      <div class="logos-carousel__track">
        <div
          v-for="(logo, index) in carouselLogos"
          :key="`${logo.name}-${index}`"
          class="logos-carousel__item"
          :aria-hidden="index >= logos.length"
        >
          <img
            :src="logo.src"
            :alt="index < logos.length ? `Logo ${logo.name}` : ''"
            class="logos-carousel__image"
            :class="{ 'logos-carousel__image--gray': logo.name === 'Golden Dragon' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.logos-carousel {
  width: 100%;
  overflow: hidden;
  background: var(--blanco);
}

.logos-carousel__viewport {
  width: min(100%, 80rem);
  margin: 0 auto;
  overflow: hidden;
}

.logos-carousel__track {
  display: flex;
  width: 100%;
  animation: move-logos 28s linear infinite;
  will-change: transform;
}

.logos-carousel__item {
  flex: 0 0 20%;
  min-width: 0;
  height: 22rem;
  padding: 1rem 1.5rem;
  display: grid;
  place-items: center;
}

.logos-carousel__image {
  display: block;
  width: auto;
  max-width: 100%;
  height: 3.5rem;
  object-fit: contain;
}

.logos-carousel__image--gray {
  filter: grayscale(100%) brightness(1.2) contrast(0.8);
}

.logos-carousel__viewport:hover .logos-carousel__track {
  animation-play-state: paused;
}

@keyframes move-logos {
  to {
    transform: translateX(-160%);
  }
}

@media (max-width: 768px) {
  .logos-carousel__item {
    flex-basis: 33.333%;
    height: 5.5rem;
    padding-inline: 0.8rem;
  }

  .logos-carousel__image {
    height: 2.75rem;
  }

  @keyframes move-logos {
    to {
      transform: translateX(-266.666%);
    }
  }
}

@media (max-width: 480px) {
  .logos-carousel__item {
    flex-basis: 50%;
  }

  @keyframes move-logos {
    to {
      transform: translateX(-400%);
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .logos-carousel__track {
    animation: none;
  }
}
</style>
