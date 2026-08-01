<script setup lang="ts">


const motores = [
  {
    nombre: 'Weichai WP5NG200',
    detalles: ['Euro 5', 'Motor Delantero', '4 cilindros', '200 HP', 'Bus y Camión'],
    imagen: '',
  },
  {
    nombre: 'Weichai WP7NG240',
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '240 HP', 'Bus y Camión'],
    imagen: '',
  },
  {
    nombre: 'Yuchai YC6G230N-50',
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '230 HP', 'Bus y Camión'],
    imagen: '',
  },
  {
    nombre: 'Yuchai YC6G230N-50',
    detalles: ['Euro 5', 'Motor Delantero', '6 cilindros', '230 HP', 'Bus y Camión'],
    imagen: '',
  },
  {
    nombre: 'Yuchai YC4D140N-50',
    detalles: ['Euro 5', '4 cilindros', '140 HP', 'Hasta 10T', 'Bus y Camión'],
    imagen: '',
  },
  {
    nombre: 'Weichai WP13NG430E52',
    detalles: ['Euro 5', 'Motor Delantero', '4 cilindros', '200 HP', 'Bus y Camión'],
    imagen: '',
  },
]
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
      <article v-for="(motor, index) in motores" :key="`${motor.nombre}-${index}`" class="motores__item">
        <div class="motores__media">
          <img v-if="motor.imagen" :src="motor.imagen" :alt="motor.nombre" />
          <span v-else aria-hidden="true">Imagen del motor próximamente</span>
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
  padding: clamp(1rem, 2vw, 2rem) 7rem;
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
  grid-template-columns: minmax(10rem, 0.85fr) minmax(12rem, 1fr);
  gap: clamp(1rem, 2.5vw, 2.5rem);
  align-items: center;
}

.motores__media {
  display: grid;
  aspect-ratio: 1 / 0.85;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f2f4ef, #d7e2cb);
  color: #6b8660;
  font-size: 0.8rem;
  text-align: center;
}

.motores__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.motores__detalle h3 {
  margin: 0;
  color: #30332f;
  font-size: clamp(1.2rem, 2vw, 2rem);
  font-style: italic;
  font-weight: 700;
  line-height: 1.15;
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

@media (max-width: 720px) {
  .motores {
    padding-inline: 2rem;
  }

  .motores__grid {
    grid-template-columns: 1fr;
  }

  .motores__item {
    grid-template-columns: minmax(8rem, 0.8fr) minmax(11rem, 1fr);
  }
}

@media (max-width: 430px) {
  .motores {
    padding-inline: 1rem;
  }

  .motores__marcas {
    gap: 1rem;
  }

  .motores__item {
    grid-template-columns: 1fr;
  }

  .motores__media {
    width: min(100%, 20rem);
    margin: 0 auto;
  }
}
</style>
