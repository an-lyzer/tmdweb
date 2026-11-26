<script setup lang="ts">
import { RouterLink } from 'vue-router'
import pathlineasverdes from '../assets/pathlineasverdes.webp'
import heroCelImage480 from '../assets/herocelimage-480.jpg'
import heroCelImage960 from '../assets/herocelimage-960.jpg'
import heroBackground from '../assets/hero/fondo_hero.webp'
import blancoFondo from '../assets/hero/blanco_fondo.webp'
import caliddaLogo from '../assets/calidda.webp'
import camaraComercioLogo from '../assets/camara_comercio.webp'
import fiseLogo from '../assets/FISE.webp'
import dineroIcono from '../assets/hero/dinero.webp'
import gasolinaIcono from '../assets/hero/gasolina.webp'
import tuercaIcono from '../assets/hero/tuerca.webp'
import LogosCarros from './logoscarros.vue'
import Beneficios from './beneficios.vue'
import ProcesoConversion from './procesoconversion.vue'
import Servicios from './Servicios.vue'
import Motores from './Motores.vue'
import Marcas from './Marcas.vue'
import Financiacion from './Financiacion.vue'
import Galeria from './Galeria.vue'
import FormContacto from './formcontacto.vue'

const heroMobileSrcSet = `${heroCelImage480} 480w, ${heroCelImage960} 960w`
</script>

<template>
  <section class="home">
    <div class="hero">
      <picture class="hero-picture">
        <source media="(max-width: 768px)" :srcset="heroMobileSrcSet" sizes="100vw" />
        <img
          :src="heroBackground"
          sizes="100vw"
          alt="Flota vehicular convertida a GNV"
          class="hero-image"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
      </picture>
      <img :src="blancoFondo" alt="" class="blanco-fondo" />

      <svg class="hero-items__defs" aria-hidden="true">
        <defs>
          <linearGradient id="hero-benefit-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#557d20" />
            <stop offset="0.42" stop-color="#76ad2d" />
            <stop offset="1" stop-color="#91ce3f" />
          </linearGradient>
        </defs>
      </svg>

      <div class="hero-items">
        <div class="hero-items__izquierda">
          <div class="hero-items__logos" aria-label="Entidades aliadas">
            <img :src="fiseLogo" alt="Fondo de Inclusión Social Energético" />
            <img :src="caliddaLogo" alt="Cálidda" />
            <img :src="camaraComercioLogo" alt="Cámara de Comercio Peruano China" />
          </div>

          <div class="hero-items__titulo">
            <h1>¡Convierte a <strong>GNV</strong>!</h1>
          </div>

          <p class="hero-items__ahorro">
            y ahorra hasta <strong>60%</strong><br />
            en combustible.
          </p>

          <p class="hero-items__descripcion">
            Convertimos buses y camiones<br />
            de carga pesada según tu<br />
            operación de diésel a gas.
          </p>
        </div>

        <div class="hero-items__tarjetas" aria-label="Beneficios de la conversión a GNV">
          <article class="hero-items__tarjeta hero-items__tarjeta--tecnologia">
            <svg class="hero-items__tarjeta-fondo" viewBox="0 0 1000 264" preserveAspectRatio="none" aria-hidden="true">
              <path d="M28 4H970Q996 4 996 30V232Q996 258 970 258H170Q154 258 144 242L10 47Q0 34 5 20Q11 4 28 4Z" />
            </svg>
            <img :src="tuercaIcono" alt="" aria-hidden="true" />
            <p>Tecnología Certificada<br /><span>(Weichai-Yuchai)</span></p>
          </article>

          <article class="hero-items__tarjeta hero-items__tarjeta--costo">
            <svg class="hero-items__tarjeta-fondo" viewBox="0 0 1000 264" preserveAspectRatio="none" aria-hidden="true">
              <path d="M28 4H970Q996 4 996 30V232Q996 258 970 258H170Q154 258 144 242L10 47Q0 34 5 20Q11 4 28 4Z" />
            </svg>
            <img :src="gasolinaIcono" alt="" aria-hidden="true" />
            <p>Menor costo <span>por km</span></p>
          </article>

          <article class="hero-items__tarjeta hero-items__tarjeta--inicial">
            <svg class="hero-items__tarjeta-fondo" viewBox="0 0 1000 264" preserveAspectRatio="none" aria-hidden="true">
              <path d="M28 4H970Q996 4 996 30V232Q996 258 970 258H170Q154 258 144 242L10 47Q0 34 5 20Q11 4 28 4Z" />
            </svg>
            <img :src="dineroIcono" alt="" aria-hidden="true" />
            <p><strong>0%</strong><span>de inicial</span></p>
          </article>
        </div>

        <RouterLink class="hero-items__cta-movil" to="/contacto">Asesoría gratuita</RouterLink>
      </div>

      <img :src="pathlineasverdes" alt="" class="pathlineasverdes" />
    </div>

    <div class="content">
      <LogosCarros />
      <Beneficios />
      <ProcesoConversion />
      <Servicios />
      <Motores />
      <Marcas />
      <Financiacion />
      <Galeria />
      <FormContacto />
    </div>
  </section>
</template>

<style scoped>
.home {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #111;
}

.hero::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(to bottom, rgb(0 0 0 / 0%) 42%, rgb(0 0 0 / 78%) 100%);
  content: '';
  pointer-events: none;
}

.hero-picture {
  position: absolute;
  z-index: 1;
  inset: 0;
  display: block;
}

.hero-image {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blanco-fondo {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 70%;
  height: 70%;
  object-fit: contain;
  object-position: top left;
  pointer-events: none;
}

.hero-items {
  position: relative;
  z-index: 3;
  display: grid;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  /* 3.5rem de desplazamiento + 4.6rem de header + 2.5rem (40 px) de separación. */
  padding: 10.6rem 5.6rem clamp(4rem, 6vw, 6rem);
  grid-template-columns: minmax(0, 1.42fr) minmax(25rem, 0.95fr);
  gap: clamp(2rem, 4vw, 5rem);
  align-items: start;
  transform: translateY(3rem);
}

.hero-items__izquierda {
  align-self: start;
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: flex-start;
  /* Compensa la fila de logos para alinear “¡Convierte a GNV!” con las tarjetas. */
  transform: translate(1rem, -4.65rem) scale(1.1);
  transform-origin: top left;
}

.hero-items__logos {
  display: flex;
  gap: 1.5rem; /* 24 px */
  align-items: center;
  margin-bottom: 0.5rem; /* 8 px */
}

.hero-items__logos img {
  display: block;
  width: auto;
  /* 3.25rem visibles luego del aumento de 10% del bloque izquierdo. */
  height: 2.9545rem;
  max-height: 2.9545rem;
  object-fit: contain;
}

/* Compensa el margen transparente propio del archivo de la Cámara de Comercio. */
.hero-items__logos img:nth-child(3) {
  height: 3.75rem;
  max-height: 3.75rem;
  transform: translateY(0.3rem);
}

.hero-items__titulo {
  width: fit-content;
  max-width: 100%;
  margin-left: 0;
  padding: 0.5rem 1.5rem;
  background: rgb(255 255 255 / 75%);
  clip-path: polygon(3.5% 0, 100% 0, 96% 100%, 0 100%);
}

.hero-items__titulo h1 {
  color: var(--negro);
  font-size: 4.625rem; /* 74 px */
  font-style: italic;
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.hero-items__titulo strong {
  color: var(--color-3);
  font-weight: inherit;
}

.hero-items__ahorro {
  margin: 0.5rem 0 0; /* 8 px */
  color: var(--blanco);
  font-size: 3.5rem; /* 56 px */
  font-style: italic;
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.015em;
}

.hero-items__ahorro strong {
  display: inline-block;
  margin-left: 0.18em;
  padding: 0.04em 0.28em 0.1em;
  background: hsl(84.09 54.15% 50.39% / 85%);
  color: var(--blanco);
  font-style: normal;
  font-weight: 600;
  clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%);
}

.hero-items__descripcion {
  margin: 1.5rem 0 0; /* 24 px */
  color: var(--blanco);
  font-size: 1.5rem; /* 24 px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

.hero-items__tarjetas {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* 12 px */
  align-items: flex-end;
  transform: scale(0.9);
  transform-origin: top right;
}

.hero-items__defs {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.hero-items__tarjeta {
  position: relative;
  display: grid;
  box-sizing: border-box;
  padding: 0 4% 0 8%;
  grid-template-columns: max-content max-content;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  overflow: visible;
  background: transparent;
}

.hero-items__tarjeta--tecnologia { width: 100%; aspect-ratio: 984 / 264; }
.hero-items__tarjeta--costo { width: 76%; aspect-ratio: 757 / 266; }
.hero-items__tarjeta--inicial { width: 55%; aspect-ratio: 568 / 264; }

.hero-items__tarjeta > img:not(.hero-items__tarjeta-fondo) {
  position: relative;
  z-index: 1;
  display: block;
  width: auto;
  height: 48%;
  max-width: 6rem;
  object-fit: contain;
  justify-self: center;
}

.hero-items__tarjeta .hero-items__tarjeta-fondo {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter: drop-shadow(0 0.42rem 0.28rem rgb(0 0 0 / 34%));
  pointer-events: none;
}

.hero-items__tarjeta-fondo path {
  fill: url('#hero-benefit-gradient');
  fill-opacity: 0.82;
}

.hero-items__tarjeta p {
  position: relative;
  z-index: 1;
  width: auto;
  min-width: 0;
  color: var(--blanco);
  font-family: Inter, system-ui, sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.875rem); /* Hasta 30 px */
  font-style: italic;
  font-weight: 700;
  line-height: 1.08;
  overflow-wrap: break-word;
  text-align: right;
  text-shadow: 0 0.18rem 0.18rem rgb(0 0 0 / 30%);
  justify-self: end;
}

.hero-items__tarjeta--tecnologia p {
  font-size: clamp(1.125rem, 2vw, 2.25rem);
  font-style: normal;
  text-align: right;
  white-space: nowrap;
}

.hero-items__tarjeta--tecnologia p span {
  display: block;
  font-size: 0.78em;
}

.hero-items__tarjeta--costo p {
  font-size: clamp(1.125rem, 2vw, 2.25rem);
  text-align: right;
}

.hero-items__tarjeta--costo p span { display: block; }

.hero-items__tarjeta--inicial p strong {
  display: inline-block;
  font-size: 2.45em;
  font-style: normal;
  font-weight: 400;
  line-height: 0.72;
}

.hero-items__tarjeta--inicial p {
  line-height: 1;
  text-align: right;
}

.hero-items__tarjeta--inicial p span {
  display: block;
  white-space: nowrap;
}

.hero-items__cta-movil { display: none; }

.pathlineasverdes {
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
}

@media (max-width: 1100px) {
  .hero-items {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-items__titulo {
    width: 100%;
    margin-left: 0;
  }

  .hero-items__izquierda {
    transform: none;
  }

  .hero-items__tarjetas {
    width: min(100%, 48rem);
    margin-left: auto;
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: min(42rem, calc(100svh - 2.65rem));
  }

  .hero::after {
    background: linear-gradient(
      to bottom,
      rgb(0 0 0 / 4%) 5%,
      rgb(0 0 0 / 25%) 43%,
      rgb(38 72 20 / 68%) 68%,
      rgb(104 166 45 / 94%) 100%
    );
  }

  .hero-picture > .hero-image {
    object-position: center center;
  }

  .blanco-fondo {
    display: none;
  }

  .hero-items {
    display: flex;
    min-height: min(42rem, calc(100svh - 2.65rem));
    padding: 4.5rem 1rem 1rem;
    flex-direction: column;
    gap: 0.8rem;
    justify-content: center;
    transform: none;
  }

  .hero-items__izquierda {
    width: min(100%, 32rem);
    margin: 0 auto;
    align-items: stretch;
  }

  .hero-items__logos {
    min-height: 3.25rem;
    margin: 0 0 0.35rem;
    padding: 0;
    gap: 0.45rem;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .hero-items__logos img {
    width: auto;
    max-width: calc((100% - 0.9rem) / 3);
    height: 2rem;
    max-height: 2rem;
  }

  .hero-items__logos img:nth-child(3) {
    height: 2.35rem;
    max-height: 2.35rem;
    transform: translateY(0.12rem);
  }

  .hero-items__titulo {
    width: 100%;
    padding: 0.4rem 0.55rem;
    clip-path: polygon(2% 0, 100% 0, 97% 100%, 0 100%);
  }

  .hero-items__titulo h1 {
    font-size: clamp(1.65rem, 8.4vw, 2.3rem);
    line-height: 1;
    text-align: center;
    white-space: nowrap;
  }

  .hero-items__ahorro {
    margin-top: 0.65rem;
    font-size: clamp(1.55rem, 7.7vw, 2.3rem);
    line-height: 1.08;
    text-align: center;
  }

  .hero-items__descripcion {
    margin-top: 1rem;
    font-size: clamp(0.85rem, 3.8vw, 1rem);
    line-height: 1.22;
    text-align: center;
  }

  .hero-items__descripcion br {
    display: initial;
  }

  .hero-items__tarjetas {
    width: min(100%, 28rem);
    margin: 0.85rem auto 0;
    gap: 0.55rem;
    align-items: stretch;
  }

  .hero-items__tarjeta--tecnologia,
  .hero-items__tarjeta--costo,
  .hero-items__tarjeta--inicial {
    width: 100%;
    min-height: 4rem;
    aspect-ratio: auto;
  }

  .hero-items__tarjeta {
    width: min(92%, 24rem);
    min-height: 3.5rem;
    padding: 0.35rem 0.8rem;
    grid-template-columns: 2.65rem minmax(0, 1fr);
    gap: 0.6rem;
    align-self: center;
    justify-content: stretch;
    overflow: hidden;
    border-radius: 0.55rem;
    background: linear-gradient(90deg, rgb(85 125 32 / 90%), rgb(145 206 63 / 90%));
    box-shadow: 0 0.35rem 0.6rem rgb(0 0 0 / 28%);
  }

  .hero-items__tarjeta .hero-items__tarjeta-fondo {
    display: none;
  }

  .hero-items__tarjeta > img:not(.hero-items__tarjeta-fondo) {
    width: 2.3rem;
    height: 2.3rem;
    max-width: 2.3rem;
    max-height: 100%;
  }

  .hero-items__tarjeta p,
  .hero-items__tarjeta--tecnologia p,
  .hero-items__tarjeta--costo p {
    width: 100%;
    font-size: clamp(0.85rem, 3.8vw, 1.05rem);
    line-height: 1.05;
    text-align: center;
    white-space: normal;
    justify-self: stretch;
  }

  .hero-items__tarjeta--costo p span,
  .hero-items__tarjeta--inicial p span {
    display: inline;
  }

  .hero-items__tarjeta--inicial p strong {
    margin-right: 0.18em;
    font-size: 1.85em;
    line-height: 0.8;
    vertical-align: -0.08em;
  }

  .hero-items__cta-movil {
    display: grid;
    width: min(76%, 15rem);
    min-height: 3rem;
    margin: 0.9rem auto 0;
    padding: 0.65rem 1rem;
    place-items: center;
    border-radius: 999px;
    background: var(--azul);
    box-shadow: 0 0.35rem 0.8rem rgb(0 0 0 / 28%);
    color: var(--blanco);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    text-decoration: none;
  }

}

@media (max-width: 360px), (max-height: 700px) and (max-width: 768px) {
  .hero-items {
    padding-bottom: 0.75rem;
    gap: 0.6rem;
  }

  .hero-items__logos {
    min-height: 2.8rem;
    margin-bottom: 0.3rem;
    padding-block: 0.3rem;
  }

  .hero-items__logos img {
    height: 1.7rem;
    max-height: 1.7rem;
  }

  .hero-items__logos img:nth-child(3) {
    height: 2rem;
    max-height: 2rem;
  }

  .hero-items__descripcion {
    margin-top: 0.7rem;
  }

  .hero-items__tarjeta--tecnologia,
  .hero-items__tarjeta--costo,
  .hero-items__tarjeta--inicial {
    min-height: 3.55rem;
  }

  .hero-items__cta-movil {
    min-height: 2.7rem;
  }
}
</style>
