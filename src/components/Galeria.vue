<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHome, getStrapiAssetUrl } from '../services/strapi.ts'
import logosCelesteSocial from '../assets/logoscelessocial.webp'

const fotos = [
  { clase: 'galeria__foto--principal', alt: 'Motor convertido a GNV' },
  { clase: 'galeria__foto--tanques', alt: 'Tanques para GNV' },
  { clase: 'galeria__foto--repuestos', alt: 'Repuestos TMD Gas' },
  { clase: 'galeria__foto--motor-azul', alt: 'Motor azul para conversión' },
  { clase: 'galeria__foto--motor', alt: 'Motor para conversión a GNV' },
  { clase: 'galeria__foto--taller', alt: 'Taller de conversiones TMD Gas' },
]

const imagenesConversiones = ref<string[]>([])

onMounted(async () => {
  try {
    const home = await getHome('u98yq7h5klflg2qhaiyv6j8y')
    imagenesConversiones.value = home.conversiones.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="galeria" aria-labelledby="galeria-titulo">
    <header class="galeria__header">
      <h2 id="galeria-titulo">Nuestras<br />Conversiones<span>.</span></h2>
        <img :src="logosCelesteSocial" alt="Síguenos en TikTok, Facebook y LinkedIn" class="galeria__redes" loading="lazy" decoding="async" />
    </header>

    <div class="galeria__mosaico">
      <figure v-for="(foto, index) in fotos" :key="foto.clase" class="galeria__foto" :class="foto.clase">
        <img v-if="imagenesConversiones[index]" :src="imagenesConversiones[index]" :alt="foto.alt" loading="lazy" decoding="async" />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.galeria {
  box-sizing: border-box;
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 5rem) clamp(1.5rem, 5.5vw, 7rem);
  color: #36551b;
}

.galeria__header {
  display: flex;
  min-width: 0;
  gap: 1.5rem;
  align-items: flex-end;
  margin-bottom: clamp(2rem, 4vw, 4rem);
}

.galeria__header h2 {
  min-width: 0;
  margin: 0;
  font-size: clamp(2.75rem, 5vw, 5rem);
  font-weight: 700;
  line-height: 1.08;
}

.galeria__header h2 span {
  color: #80aa31;
}

.galeria__redes {
  display: block;
  width: clamp(8rem, 12vw, 12rem);
  max-width: 100%;
  height: auto;
  flex: 0 1 auto;
  transform: translateY(-0.6rem);
}

.galeria__mosaico {
  display: grid;
  width: 100%;
  aspect-ratio: 4 / 3;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(0.7rem, 1.2vw, 1.2rem);
}

.galeria__foto {
  display: grid;
  min-width: 0;
  min-height: 0;
  margin: 0;
  place-items: center;
  overflow: hidden;
  border-radius: 0.2rem;
  background: linear-gradient(135deg, #d9e3d0, #b8cda2);
  color: #537c21;
  font-size: 0.85rem;
  text-align: center;
}

.galeria__foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.galeria__foto--principal { grid-area: 1 / 1 / 3 / 3; }
.galeria__foto--tanques { grid-area: 1 / 3 / 2 / 4; }
.galeria__foto--repuestos { grid-area: 1 / 4 / 2 / 5; }
.galeria__foto--motor-azul { grid-area: 3 / 1 / 4 / 2; }
.galeria__foto--motor { grid-area: 3 / 2 / 4 / 3; }
.galeria__foto--taller { grid-area: 2 / 3 / 4 / 5; }

@media (max-width: 900px) {
  .galeria {
    padding-inline: 2rem;
  }

  .galeria__mosaico {
    aspect-ratio: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
  }

  .galeria__foto,
  .galeria__foto--principal,
  .galeria__foto--tanques,
  .galeria__foto--repuestos,
  .galeria__foto--motor-azul,
  .galeria__foto--motor,
  .galeria__foto--taller {
    grid-area: auto;
    aspect-ratio: 1;
    background: transparent;
  }

  .galeria__foto img {
    object-fit: contain;
  }
}

@media (max-width: 560px) {
  .galeria {
    padding-inline: 1rem;
  }

  .galeria__header {
    display: grid;
    min-width: 0;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.85rem;
    align-items: start;
  }

  .galeria__header h2 {
    max-width: 100%;
    font-size: clamp(2rem, 10vw, 2.75rem);
    line-height: 1.02;
    overflow-wrap: normal;
  }

  .galeria__redes {
    width: clamp(6rem, 26vw, 7.5rem);
    max-width: 100%;
    justify-self: start;
    transform: none;
  }

  .galeria__mosaico {
    grid-template-columns: 1fr;
  }

  .galeria__foto,
  .galeria__foto--principal,
  .galeria__foto--tanques,
  .galeria__foto--repuestos,
  .galeria__foto--motor-azul,
  .galeria__foto--motor,
  .galeria__foto--taller {
    min-height: 12rem;
    aspect-ratio: auto;
  }

  .galeria__foto img {
    height: auto;
    max-height: none;
  }
}

@media (max-width: 330px) {
  .galeria__header {
    gap: 0.7rem;
  }

  .galeria__header h2 {
    font-size: 1.9rem;
  }

  .galeria__redes {
    width: 5.75rem;
    max-width: 100%;
  }
}
</style>
