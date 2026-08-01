<script setup lang="ts">
import barraVerde from '../assets/logoscarros/barra_verde.png'
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
    <img :src="barraVerde" alt="" class="logos-carousel__bar" aria-hidden="true" />
    <h2 class="logos-carousel__title">Hemos convertido</h2>
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
            :class="{
              'logos-carousel__image--gray': logo.name === 'Golden Dragon',
              'logos-carousel__image--iveco': logo.name === 'Iveco',
              'logos-carousel__image--man': logo.name === 'MAN',
              'logos-carousel__image--yutong': logo.name === 'Yutong',
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.logos-carousel {
  position: relative;
  z-index: 4;
  width: 100%;
  overflow: visible;
  background: var(--blanco);
}

.logos-carousel__bar {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  transform: translateY(-5.3rem);
  margin-bottom: -3rem;
}

.logos-carousel__title {
  margin: 0 0 clamp(0.25rem, 1vw, 0.5rem);
  color: var(--negro);
  opacity: 0.5;
  font-size: clamp(1.125rem, 2.2vw, var(--text-h5));
  font-weight: 400;
  text-align: center;
  line-height: 1.2;
}

.logos-carousel__viewport {
  width: 100%;
  margin: 0 auto;
  padding-inline: clamp(0.5rem, 2vw, 2rem);
  overflow: hidden;
}

.logos-carousel__track {
  display: flex;
  width: 266.6667%;
  animation: move-logos 15s linear infinite;
  will-change: transform;
}

.logos-carousel__item {
  flex: 0 0 6.25%;
  min-width: 0;
  height: clamp(6.5rem, 10vw, 10rem);
  padding: clamp(0.35rem, 0.8vw, 0.75rem);
  display: grid;
  place-items: center;
}

.logos-carousel__image {
  display: block;
  width: auto;
  max-width: 100%;
  height: clamp(4.5rem, 7vw, 7.5rem);
  object-fit: contain;
}

.logos-carousel__image--gray {
  filter: grayscale(100%) brightness(1.2) contrast(0.8);
}

.logos-carousel__image--iveco {
  padding-inline: 0.5rem;
  transform: scale(0.78);
}

.logos-carousel__image--man {
  transform: scale(1.40);
}

.logos-carousel__image--yutong {
  transform: scale(1.15);
}

@keyframes move-logos {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1024px) {
  .logos-carousel__track {
    width: 400%;
  }

  .logos-carousel__item {
    height: 11rem;
  }
}

@media (max-width: 768px) {
  .logos-carousel__track {
    width: 400%;
    animation-duration: 10s;
  }

  .logos-carousel__bar {
    transform: translateY(-1.75rem);
    margin-bottom: -0.7rem;
  }

  .logos-carousel__item {
    height: clamp(7.5rem, 24vw, 9rem);
    padding-inline: 0.2rem;
  }

  .logos-carousel__image {
    height: 5rem;
    transform: scale(1.15);
  }

  .logos-carousel__image--iveco {
    transform: scale(0.9);
  }

  .logos-carousel__image--man {
    transform: scale(1.3);
  }

  .logos-carousel__image--yutong {
    transform: scale(1.2);
  }

}

@media (max-width: 560px) {
  .logos-carousel__track {
    width: 533.3333%;
    animation-duration: 10s;
  }

  .logos-carousel__viewport {
    padding-inline: 0.25rem;
  }

  .logos-carousel__item {
    height: clamp(6.5rem, 30vw, 8rem);
  }

  .logos-carousel__image {
    height: clamp(3.5rem, 18vw, 4.75rem);
    transform: scale(1.12);
  }

  .logos-carousel__image--iveco {
    transform: scale(0.86);
  }

  .logos-carousel__image--man {
    transform: scale(1.2);
  }

  .logos-carousel__image--yutong {
    transform: scale(1.16);
  }

}

@media (max-width: 380px) {
  .logos-carousel__track {
    width: 800%;
  }

  .logos-carousel__bar {
    transform: translateY(-1.25rem);
    margin-bottom: -0.35rem;
  }
  

  .logos-carousel__image--iveco {
    transform: scale(0.7);
  }

  .logos-carousel__image--man {
    transform: scale(1.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logos-carousel__track {
    animation: none;
  }
}
</style>
