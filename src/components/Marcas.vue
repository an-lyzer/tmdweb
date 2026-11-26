<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHome, getStrapiAssetUrl } from '../services/strapi.ts'

const marcas = [
  { nombre: 'Transportes Huascar' },
  { nombre: 'Cruz del Sur' },
  { nombre: 'Transporte Martínez' },
  { nombre: 'Va y Ven' },
  { nombre: 'ETS Salvador' },
  { nombre: 'Villarrica Tours' },
  { nombre: 'Etuchisa' },
  { nombre: 'ZBUSS' },
  { nombre: 'El Rápido' },
  { nombre: 'Confort Travel' },
  { nombre: 'Vipusa' },
]

const imagenesMarcas = ref<string[]>([])

onMounted(async () => {
  try {
    const home = await getHome('u98yq7h5klflg2qhaiyv6j8y')
    imagenesMarcas.value = home.marcas.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="marcas" aria-labelledby="marcas-titulo">
    <header class="marcas__header">
      <h2 id="marcas-titulo">Compañías que confían en nosotros.</h2>
      <p>
        Empresas de transporte y logística ya han confiado en TMD Gas para convertir sus flotas a
        GNV y reducir significativamente sus costos operativos. Nuestra experiencia, tecnología
        certificada y asesoría continua nos convierten en un aliado estratégico para una operación
        más eficiente, rentable y sostenible.
      </p>
    </header>

    <div class="marcas__grid" aria-label="Empresas clientes">
      <div v-for="(marca, index) in marcas" :key="marca.nombre" class="marcas__logo">
        <img v-if="imagenesMarcas[index]" :src="imagenesMarcas[index]" :alt="`Logo ${marca.nombre}`" loading="lazy" decoding="async" />
        <span v-else>{{ marca.nombre }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marcas {
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 6rem) 7rem;
}

.marcas__header {
  max-width: 84rem;
  margin: 0 auto clamp(3rem, 6vw, 6rem);
  text-align: center;
}

.marcas__header h2 {
  margin: 0;
  color: var(--color-3, #537c21);
  font-size: clamp(2rem, 4.2vw, 4rem);
  font-weight: 700;
  line-height: 1.15;
}

.marcas__header p {
  max-width: 78rem;
  margin: clamp(1.5rem, 3vw, 3.5rem) auto 0;
  color: #687b4e;
  font-size: clamp(1rem, 1.65vw, 1.65rem);
  line-height: 1.42;
}

.marcas__grid {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  column-gap: 0;
  row-gap: clamp(2rem, 4.5vw, 5rem);
  align-items: center;
}

.marcas__logo {
  display: grid;
  grid-column: span 4;
  min-width: 0;
  min-height: clamp(3.5rem, 6vw, 5.5rem);
  place-items: center;
  color: #537c21;
  font-size: clamp(0.85rem, 1.25vw, 1.2rem);
  font-weight: 600;
  text-align: center;
}

/* La última fila ocupa doce de dieciséis columnas y queda centrada. */
.marcas__logo:nth-child(9) {
  grid-column: 3 / span 4;
}

.marcas__logo:nth-child(10) {
  grid-column: 7 / span 4;
}

.marcas__logo:nth-child(11) {
  grid-column: 11 / span 4;
}

.marcas__logo img {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: clamp(3.5rem, 6vw, 5.5rem);
  object-fit: contain;
}

@media (max-width: 900px) {
  .marcas {
    padding-inline: 2rem;
  }

  .marcas__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: clamp(1rem, 4vw, 5rem);
  }

  .marcas__logo,
  .marcas__logo:nth-child(9),
  .marcas__logo:nth-child(10),
  .marcas__logo:nth-child(11) {
    grid-column: auto;
  }
}

@media (max-width: 560px) {
  .marcas {
    padding-inline: 1rem;
  }

  .marcas__header {
    margin-bottom: 2.5rem;
  }

  .marcas__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
  }
}
</style>
