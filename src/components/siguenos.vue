<script setup lang="ts">
import tiktok from '../assets/tiktok.webp'
import facebook from '../assets/facebook.webp'
import linkedin from '../assets/linkedin.webp'

const redes = [
  { nombre: 'Tiktok', icono: tiktok, clase: 'siguenos__icono--tiktok', enlace: 'https://www.tiktok.com/@tmdgas_peru?is_from_webapp=1&sender_device=pc' },
  { nombre: 'Facebook', icono: facebook, clase: 'siguenos__icono--facebook', enlace: 'https://www.facebook.com/share/1DjgtZ2Y99/?mibextid=wwXIfr' },
  { nombre: 'Linkedin', icono: linkedin, clase: 'siguenos__icono--linkedin', enlace: 'https://www.linkedin.com/company/tmd-gas/' },
]
</script>

<template>
  <section class="siguenos" aria-labelledby="siguenos-titulo">
    <h6 class="siguenos__eyebrow">SÍGUENOS</h6>
    <h2 id="siguenos-titulo">MANTENTE AL DÍA CON TMD GAS</h2>
    <h6 class="siguenos__descripcion">Conoce nuestras últimas novedades, servicios y contenido<br> especializado sobre conversión a GNV.</h6>

    <div class="siguenos__redes">
      <a v-for="red in redes" :key="red.nombre" :href="red.enlace" class="siguenos__tarjeta" :aria-label="`Visitar ${red.nombre}`" target="_blank" rel="noopener noreferrer">
        <span class="siguenos__icono" :class="red.clase"><img :src="red.icono" alt="" /></span>
        <h5>{{ red.nombre }}</h5>
      </a>
    </div>
  </section>
</template>

<style scoped>
.siguenos {
  box-sizing: border-box;
  display: flex;
  height: 38.5625rem;
  padding: clamp(3rem, 5vw, 5rem) 7rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #33352f;
  text-align: center;
}

.siguenos__eyebrow {
  margin: 0;
  color: #80aa31;
  font-size: var(--text-h6);
  font-weight: 600;
}

.siguenos h2 {
  margin: 2rem 0 0;
  font-size: clamp(2.2rem, 4.7vw, 4.7rem);
  font-weight: 600;
  line-height: 1.08;
}

.siguenos__descripcion {
  max-width: 52rem;
  margin: 2rem auto 0;
  color: #4d5049;
  font-size: var(--text-h6);
  font-weight: 400;
  line-height: 1.35;
  opacity: 0.8;
}

.siguenos__redes {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 14.9375rem);
  gap: 2rem;
  justify-content: center;
  margin-top: clamp(4rem, 7vw, 6rem);
}

.siguenos__tarjeta {
  position: relative;
  display: grid;
  height: 7.125rem;
  padding: 2.2rem 1rem 0.75rem;
  place-items: center;
  border-radius: 1rem;
  background: #edf6df;
  color: #3a3c37;
  font-size: clamp(1.35rem, 2vw, 2rem);
  font-weight: 500;
  text-decoration: none;
  transition: background-color 180ms ease, transform 180ms ease;
}

.siguenos__tarjeta h5 {
  margin: 0;
  font-size: var(--text-h5);
  font-weight: 500;
}

.siguenos__tarjeta:hover {
  background: #e1f0ca;
  transform: translateY(-0.2rem);
}

.siguenos__icono {
  position: absolute;
  top: -2.5rem;
  display: grid;
  width: 5rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
}

.siguenos__icono--tiktok { background: #30312e; }
.siguenos__icono--facebook { background: #1665f2; }
.siguenos__icono--linkedin { background: #1167b7; }

.siguenos__icono img {
  width: 54%;
  height: 54%;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

@media (max-width: 900px) {
  .siguenos {
    height: auto;
    min-height: 38.5625rem;
    padding-inline: 2rem;
  }

  .siguenos__redes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .siguenos {
    min-height: 0;
    padding: 4rem 1rem 4.5rem;
  }

  .siguenos h2 {
    margin-top: 1.25rem;
    font-size: clamp(2rem, 10vw, 3rem);
  }

  .siguenos__descripcion {
    margin-top: 1.25rem;
    font-size: 1rem;
  }

  .siguenos__descripcion br {
    display: none;
  }

  .siguenos__redes {
    grid-template-columns: 1fr;
    gap: 4.25rem;
    max-width: 21.25rem;
    margin-top: 4.75rem;
    margin-right: auto;
    margin-left: auto;
  }

  .siguenos__tarjeta {
    width: 100%;
  }
}
</style>
