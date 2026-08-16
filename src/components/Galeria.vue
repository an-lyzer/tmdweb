<script setup lang="ts">
import logosCelesteSocial from '../assets/logoscelessocial.png'
import motor1 from '../assets/motor1.PNG'

const fotos = [
  { clase: 'galeria__foto--principal', imagen: '', alt: 'Motor convertido a GNV' },
  { clase: 'galeria__foto--tanques', imagen: '', alt: 'Tanques para GNV' },
  { clase: 'galeria__foto--repuestos', imagen: '', alt: 'Repuestos TMD Gas' },
  { clase: 'galeria__foto--motor-azul', imagen: motor1, alt: 'Motor azul para conversión' },
  { clase: 'galeria__foto--motor', imagen: '', alt: 'Motor para conversión a GNV' },
  { clase: 'galeria__foto--taller', imagen: '', alt: 'Taller de conversiones TMD Gas' },
]
</script>

<template>
  <section class="galeria" aria-labelledby="galeria-titulo">
    <header class="galeria__header">
      <h2 id="galeria-titulo">Nuestras<br />Conversiones<span>.</span></h2>
      <img :src="logosCelesteSocial" alt="Síguenos en TikTok, Facebook y LinkedIn" class="galeria__redes" />
    </header>

    <div class="galeria__mosaico">
      <figure v-for="foto in fotos" :key="foto.clase" class="galeria__foto" :class="foto.clase">
        <img v-if="foto.imagen" :src="foto.imagen" :alt="foto.alt" />
        <span v-else aria-hidden="true">Imagen próximamente</span>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.galeria {
  box-sizing: border-box;
  height: 91.75rem;
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 5rem) 7rem;
  color: #36551b;
}

.galeria__header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: clamp(2rem, 4vw, 4rem);
}

.galeria__header h2 {
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
  height: auto;
  align-self: center;
}

.galeria__mosaico {
  display: grid;
  height: calc(100% - clamp(7.5rem, 12vw, 12rem));
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
    height: auto;
    padding-inline: 2rem;
  }

  .galeria__mosaico {
    height: auto;
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
    aspect-ratio: 1 / 0.9;
  }

  .galeria__foto--principal,
  .galeria__foto--taller {
    grid-column: span 2;
    aspect-ratio: 1.55 / 1;
  }
}

@media (max-width: 560px) {
  .galeria {
    padding-inline: 1rem;
  }

  .galeria__header {
    align-items: flex-end;
  }

  .galeria__mosaico {
    grid-template-columns: 1fr;
  }

  .galeria__foto--principal,
  .galeria__foto--taller {
    grid-column: auto;
  }
}
</style>
