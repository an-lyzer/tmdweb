<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHome, getStrapiAssetUrl } from '../services/strapi.ts'


// Índices originales de las imágenes en Strapi; se conserva el hueco del motor retirado.
const motores = [
  {
    nombre: 'Weichai WP4.6NNG200E-52',
    imagenIndex: 0,
    detalles: ['Euro 5', 'Motor Delantero', '4 cilindros', '200 HP', 'Bus y Camión'],
  },
  {
    nombre: 'Weichai WP7NG240',
    imagenIndex: 1,
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '240 HP', 'Bus y Camión'],
  },
  {
    nombre: 'Yuchai YC6G230N-50',
    imagenIndex: 2,
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '230 HP', 'Bus y Camión'],
  },
  {
    nombre: 'Yuchai YC6MK375N-50',
    imagenIndex: 3,
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '375 HP', 'Bus de Transporte personal'],
  },
  {
    nombre: 'Weichai WP13NG430E52',
    imagenIndex: 5,
    detalles: ['Euro 5', 'Motor Delantero', '4 cilindros', '200 HP', 'Bus y Camión'],
  },
  {
    nombre: 'Yuchai YC6L280N-50',
    imagenIndex: 6,
    detalles: [
      'Euro 5',
      'Motor Delantero',
      '6 cilindros',
      '280 HP',
      'Camión Mercedes e Iveco',
    ],
  },
  {
    nombre: 'Yuchai YC4G180/190N-50',
    imagenIndex: 7,
    detalles: [
      'Euro 5',
      'Motor Delantero',
      '6 cilindros',
      '280 HP',          
      'Camión',
    ],
  },
]

const imagenesMotores = ref<string[]>([])

onMounted(async () => {
  try {
    const home = await getHome('u98yq7h5klflg2qhaiyv6j8y')
    imagenesMotores.value = home.motores.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="motores" aria-labelledby="motores-titulo">
    <header class="motores__header">
      <div>
        <h2 id="motores-titulo">Hechos para Soportar la Ruta.</h2>
        <p>Motores hechos para maximizar tu ahorro</p>
      </div>
      <div class="motores__marcas" aria-label="Marcas de motores">
        <span class="motores__marca motores__marca--weichai">WEICHAI</span>
        <span class="motores__marca motores__marca--yuchai">YUCHAI</span>
      </div>
    </header>

    <div class="motores__grid">
      <article v-for="motor in motores" :key="motor.nombre" class="motores__item">
        <div class="motores__media">
          <img v-if="imagenesMotores[motor.imagenIndex]" :src="imagenesMotores[motor.imagenIndex]" :alt="motor.nombre" loading="lazy" decoding="async" />
        </div>
        <div class="motores__detalle">
          <h3>{{ motor.nombre }}</h3>
          <ul>
            <li v-for="detalle in motor.detalles" :key="detalle">{{ detalle }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.motores {
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(1rem, 2vw, 2rem) clamp(1.5rem, 5.5vw, 7rem);
  color: #363835;
}

.motores__header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: clamp(2.5rem, 5vw, 5rem);
}

.motores__header h2 {
  margin: 0;
  color: #79a72e;
  font-size: clamp(2rem, 3.7vw, 3.65rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.15;
}

.motores__header p {
  margin: clamp(0.6rem, 1.4vw, 1.2rem) 0 0;
  font-size: clamp(1.1rem, 2vw, 1.85rem);
}

.motores__marcas {
  display: flex;
  gap: clamp(1rem, 2vw, 2.5rem);
  align-items: center;
  padding-top: 0.35rem;
  white-space: nowrap;
}

.motores__marca {
  font-weight: 800;
  letter-spacing: -0.08em;
}

.motores__marca--weichai {
  color: #111;
  font-size: clamp(1.85rem, 3.6vw, 3.9rem);
  font-style: italic;
}

.motores__marca--yuchai {
  color: #4c4c4c;
  font-size: clamp(1.6rem, 3vw, 3.2rem);
}

.motores__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(2rem, 6vw, 7rem);
  row-gap: clamp(2rem, 4vw, 4rem);
}

.motores__item {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(10rem, 16.625rem) minmax(0, 1fr);
  gap: clamp(1rem, 2.5vw, 2.5rem);
  align-items: center;
}

.motores__media {
  display: grid;
  width: 100%;
  max-width: 16.625rem; /* 266 px */
  aspect-ratio: 1 / 0.85;
  justify-self: center;
  place-items: center;
  overflow: hidden;
  background: transparent;
  color: #6b8660;
  font-size: 0.8rem;
  text-align: center;
}

.motores__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.motores__detalle {
  min-width: 0;
}

.motores__detalle h3 {
  margin: 0;
  color: #30332f;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.15;
  overflow-wrap: anywhere;
}

.motores__detalle ul {
  margin: clamp(0.7rem, 1.2vw, 1.15rem) 0 0;
  padding-left: 1.4rem;
  font-size: clamp(0.98rem, 1.5vw, 1.45rem);
  line-height: 1.35;
}

@media (max-width: 980px) {
  .motores__header {
    flex-direction: column;
  }
}

@media (max-width: 1180px) {
  .motores__grid {
    max-width: 54rem;
    margin: 0 auto;
    grid-template-columns: 1fr;
  }

  .motores__item {
    grid-template-columns: 16.625rem minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .motores {
    padding-inline: 2rem;
  }
}

@media (max-width: 620px) {
  .motores__header {
    margin-bottom: 2.25rem;
  }

  .motores__marcas {
    flex-wrap: wrap;
  }

  .motores__item {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .motores__media {
    width: min(100%, 16.625rem);
    margin: 0 auto;
  }

  .motores__detalle {
    text-align: center;
  }

  .motores__detalle ul {
    display: inline-block;
    text-align: left;
  }
}

@media (max-width: 430px) {
  .motores {
    padding-inline: 1rem;
  }

  .motores__marcas {
    gap: 1rem;
  }

  .motores__header h2 { font-size: 2rem; }
}
</style>
