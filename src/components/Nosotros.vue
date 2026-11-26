<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ServiciosCta from './ServiciosCta.vue'
import { getContactpage, getNosotrosHero, getStrapiAssetUrl } from '../services/strapi.ts'
import busMecanico from '../assets/Bus_mecanico.webp'
import atrasBus from '../assets/atras_bus.webp'
import fondoService from '../assets/Fondoservice.webp'
import buses from '../assets/Buses.webp'
const motor = new URL('../assets/motor1.webp', import.meta.url).href
const razones = [
  {
    titulo: 'Tecnología Certificada',
    descripcion: 'Utilizamos tecnología certificada internacionalmente para garantizar conversiones seguras, confiables y de alto rendimiento.',
  },
  {
    titulo: 'Equipos Confiables',
    descripcion: 'Seleccionamos equipos de alta calidad para asegurar una operación eficiente y duradera en cada unidad.',
  },
  {
    titulo: 'Acompañamiento Experto',
    descripcion: 'Nuestro equipo técnico te acompaña durante todo el proceso, desde el diagnóstico hasta la puesta en marcha.',
  },
  {
    titulo: 'Resultados Comprobados',
    descripcion: 'Trabajamos con resultados medibles que impulsan el ahorro, la seguridad y el desempeño de tu flota.',
  },
]

const historiaPuntos = [
  'Experiencia técnica especializada',
  'Tecnología certificada',
  'Atención personalizada',
  'Compromiso con resultados',
]

const seccionesInstitucionales = [
  {
    id: 'vision',
    titulo: 'Nuestra Visión',
    descripcion: 'Consolidarnos como referentes en el Perú y la región en soluciones integrales para transformar la matriz energética del sector transporte, liderando su transición hacia un modelo más eficiente, competitivo y sostenible.',
    puntos: [
      'Innovación continua',
      'Crecimiento sostenible',
      'Liderazgo técnico',
      'Relaciones de largo plazo',
    ],
    imagenPrincipal: fondoService,
    imagenDetalle: buses,
    altPrincipal: 'Transporte pesado operando con energía GNV',
    altDetalle: 'Bus y camión de TMD Gas en operación',
    invertida: true,
  },
  {
    id: 'mision',
    titulo: 'Nuestra Misión',
    descripcion: 'Ser el aliado estratégico del sector transporte, liderando su transformación hacia operaciones más eficientes, rentables y sostenibles, mediante soluciones integrales de conversión de motores diésel a GNV, tecnología especializada y servicios de alta calidad que generen valor y competitividad de largo plazo.',
    puntos: [
      'Soluciones a medida',
      'Seguridad en cada proceso',
      'Servicio especializado',
      'Valor para nuestros clientes',
    ],
    imagenPrincipal: atrasBus,
    imagenDetalle: motor,
    altPrincipal: 'Vista posterior de un bus',
    altDetalle: 'Motor preparado para una solución de conversión a GNV',
    invertida: false,
  },
]

const razonActiva = ref<number | null>(0)
const carrosUrl = ref('')
const marcasNosotros = ref<string[]>([])

onMounted(async () => {
  try {
    const [nosotros, contacto] = await Promise.all([
      getNosotrosHero('pysenfhki14xofr7cvz8m0gk'),
      getContactpage(),
    ])
    if (contacto.fondoCarroRojo) carrosUrl.value = getStrapiAssetUrl(contacto.fondoCarroRojo)
    marcasNosotros.value = nosotros.marcas.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})

function alternarRazon(indice: number) {
  razonActiva.value = razonActiva.value === indice ? null : indice
}
</script>

<template>
  <section class="nosotros" aria-labelledby="nosotros-titulo">
    <div class="nosotros__contenido">
      <div class="nosotros__presentacion">
        <p class="nosotros__eyebrow">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
          </svg>
          Nosotros
        </p>
        <h1 id="nosotros-titulo">Confianza<br />que impulsa<br />tu operación<span>.</span></h1>
      </div>

      <h6 class="nosotros__mensaje">
        Trabajamos junto a entidades y empresas <br> líderes para ofrecer soluciones confiables,<br> seguras y de alta calidad en cada proyecto.
      </h6>

      <div class="nosotros__accion">
        <div class="nosotros__imagen" role="img" aria-label="Flota de vehículos TMD Gas">
          <img v-if="carrosUrl" :src="carrosUrl" alt="Flota de vehículos TMD Gas" />
        </div>
        <RouterLink class="nosotros__boton" to="/contacto">Solicita información</RouterLink>
      </div>
    </div>

    <div class="nosotros__marcas">
      <h3>Marcas que confían en nosotros</h3>
      <div class="nosotros__logos" aria-label="Marcas que confían en nosotros">
        <template v-if="marcasNosotros.length">
          <img v-for="(marca, index) in marcasNosotros" :key="marca" :src="marca" :alt="`Marca asociada ${index + 1}`" />
        </template>
        <template v-else>
          <span v-for="logo in 5" :key="logo">Logo próximamente</span>
        </template>
      </div>
    </div>
  </section>

  <section class="porque-nosotros" aria-labelledby="porque-nosotros-titulo">
    <div class="porque-nosotros__visual">
      <div class="porque-nosotros__imagen">
        <img :src="busMecanico" alt="Mecánico trabajando en un bus" />
      </div>
      <span class="porque-nosotros__etiqueta">Nosotros</span>
    </div>

    <div class="porque-nosotros__contenido">
      <div class="porque-nosotros__encabezado">
        <h6>¿Porque nosotros?</h6>
        <h1 id="porque-nosotros-titulo">
          <span class="porque-nosotros__linea porque-nosotros__linea--confianza">Confianza en</span>
          <span class="porque-nosotros__linea">Cada conversión<span class="porque-nosotros__punto">.</span></span>
        </h1>
      </div>

      <div class="porque-nosotros__acordeon">
        <article v-for="(razon, indice) in razones" :key="razon.titulo" class="porque-nosotros__item">
          <button
            class="porque-nosotros__boton-acordeon"
            :class="{ 'porque-nosotros__boton-acordeon--abierto': razonActiva === indice }"
            type="button"
            :aria-expanded="razonActiva === indice"
            :aria-controls="`razon-${indice}`"
            @click="alternarRazon(indice)"
          >
            <h5>{{ razon.titulo }}</h5>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </button>
          <Transition name="acordeon">
            <div v-if="razonActiva === indice" :id="`razon-${indice}`" class="porque-nosotros__detalle">
              <h6>{{ razon.descripcion }}</h6>
            </div>
          </Transition>
        </article>
      </div>
    </div>
  </section>

  <!-- <section class="historia" aria-labelledby="historia-titulo">
    <div class="historia__imagenes" aria-label="Imágenes de nuestra historia, pendientes de proporcionar">
      <div class="historia__imagen historia__imagen--principal" role="img">
      </div>
      <div class="historia__imagen historia__imagen--detalle" role="img">
      </div>
    </div>

    <div class="historia__contenido">
      <h2 id="historia-titulo">Nuestra Historia</h2>
      <p>
        Construimos soluciones de conversión a GNV con un enfoque técnico, seguro y confiable. Acompañamos a cada cliente para optimizar la operación de su flota y alcanzar resultados sostenibles.
      </p>
      <ul>
        <li v-for="punto in historiaPuntos" :key="punto">
          <svg viewBox="0 0 28 24" aria-hidden="true">
            <path d="m1 12 6 6L18 5" />
            <path d="m10 12 6 6 11-13" />
          </svg>
          {{ punto }}
        </li>
      </ul>
    </div>
  </section> -->

  <section
    v-for="seccion in seccionesInstitucionales"
    :key="seccion.id"
    class="historia"
    :class="{ 'historia--invertida': seccion.invertida }"
    :aria-labelledby="`${seccion.id}-titulo`"
  >
    <div class="historia__imagenes" :aria-label="`Imágenes de ${seccion.titulo}`">
      <div class="historia__imagen historia__imagen--principal">
        <img :src="seccion.imagenPrincipal" :alt="seccion.altPrincipal" />
      </div>
      <div class="historia__imagen historia__imagen--detalle">
        <img :src="seccion.imagenDetalle" :alt="seccion.altDetalle" />
      </div>
    </div>

    <div class="historia__contenido">
      <h2 :id="`${seccion.id}-titulo`">{{ seccion.titulo }}</h2>
      <p>{{ seccion.descripcion }}</p>
      <ul>
        <li v-for="punto in seccion.puntos" :key="punto">
          <svg viewBox="0 0 28 24" aria-hidden="true">
            <path d="m1 12 6 6L18 5" />
            <path d="m10 12 6 6 11-13" />
          </svg>
          {{ punto }}
        </li>
      </ul>
    </div>
  </section>

  <ServiciosCta />
</template>

<style scoped>
.nosotros {
  display: grid;
  width: 100%;
  height: 40.3125rem; /* 645 px */
  padding: 3.5rem clamp(2rem, 5.5vw, 10rem) 2.5rem;
  grid-template-rows: 1fr auto;
  background: linear-gradient(118deg, #fff 12%, #fafdf4 50%, #caed8a 100%);
  color: var(--negro);
  overflow: hidden;
}

.nosotros__contenido {
  display: grid;
  grid-template-columns: minmax(18rem, 1.05fr) minmax(22rem, 1.3fr) minmax(18rem, 0.9fr);
  gap: clamp(2rem, 4vw, 5rem);
  align-items: center;
}

.nosotros__eyebrow {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #969894;
  font-size: var(--text-h5);
  font-weight: 600;
}

.nosotros__eyebrow svg {
  width: 1.5rem;
  fill: var(--color-1);
}

.nosotros__presentacion {
  align-self: end;
  margin-bottom: 3.5rem;
}

.nosotros h1 {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.nosotros h1 span { color: var(--color-1); }

.nosotros__mensaje {
  max-width: 42rem;
  color: #555752;
  font-weight: 600;
  line-height: 1.45;
  transform: translateY(-7.5rem);
}

.nosotros__accion {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.nosotros__imagen {
  display: grid;
  width: 100%;
  height: 20.25rem;
  place-items: center;
  overflow: hidden;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #91b7e6, #e7efe0);
  color: rgb(48 51 46 / 60%);
  font-size: 0.9rem;
}

.nosotros__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nosotros__boton {
  display: flex;
  width: min(100%, 16rem);
  min-height: 3.75rem;
  padding: 0.75rem 1.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  background: var(--negro);
  color: var(--blanco);
  font-size: var(--text-h5);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  text-align: center;
  transition: background-color 180ms ease, transform 180ms ease;
}

.nosotros__boton:hover {
  background: var(--color-3);
  transform: translateY(-0.15rem);
}

.nosotros__marcas {
  display: grid;
  grid-template-columns: minmax(14rem, 1fr) 2.5fr;
  gap: 3rem;
  align-items: center;
}

.nosotros__marcas h3 {
  max-width: 19rem;
  font-weight: 600;
  line-height: 1.15;
}

.nosotros__logos {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: flex-end;
}

.nosotros__logos span {
  display: grid;
  min-height: 3.5rem;
  padding: 0.5rem;
  place-items: center;
  border-radius: 0.7rem;
  background: rgb(255 255 255 / 48%);
  color: rgb(48 51 46 / 55%);
  font-size: 0.75rem;
  text-align: center;
}

.nosotros__logos img {
  display: block;
  width: auto;
  height: 2.25rem;
  max-height: 2.25rem;
  max-width: 50%;
  object-fit: contain;
}

.porque-nosotros {
  display: grid;
  max-width: 128rem;
  margin: 0 auto;
  padding: clamp(2.72rem, 4.352vw, 4.896rem) clamp(2rem, 5.5vw, 10rem);
  grid-template-columns: minmax(22rem, 1fr) minmax(28rem, 1fr);
  gap: clamp(3rem, 6vw, 8rem);
  align-items: start;
  color: var(--negro);
}

.porque-nosotros__imagen {
  position: relative;
  display: grid;
  width: 100%;
  min-height: 0;
  aspect-ratio: 1.32 / 1;
  place-items: center;
  overflow: hidden;
  border-radius: 1.75rem;
  background: linear-gradient(135deg, #617069, #d8ddd4);
  color: rgb(255 255 255 / 74%);
  font-size: 0.9rem;
}

.porque-nosotros__imagen img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 90%;
}

.porque-nosotros__visual {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.porque-nosotros__etiqueta {
  display: grid;
  width: 8.25rem; /* 132 px */
  min-height: 3.4375rem; /* 55 px */
  padding: 0.5rem 1rem;
  place-items: center;
  border-radius: 999px;
  background: #d1e8ac;
  color: var(--color-4);
  font-size: var(--text-p);
  font-weight: 600;
}

.porque-nosotros__contenido {
  display: grid;
  gap: clamp(2.5rem, 5vw, 5rem);
}

.porque-nosotros__encabezado {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1.5rem; /* 24 px */
  align-items: center;
}

.porque-nosotros__encabezado h6 {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  color: #969894;
  font-weight: 500;
  white-space: nowrap;
}

.porque-nosotros__encabezado h1 {
  display: contents;
  font-size: var(--text-h1);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.porque-nosotros__linea {
  display: block;
}

.porque-nosotros__linea--confianza {
  grid-column: 2;
  grid-row: 1;
  margin-left: 0;
}

.porque-nosotros__linea:not(.porque-nosotros__linea--confianza) {
  grid-column: 1 / -1;
  grid-row: 2;
}

.porque-nosotros__punto { color: var(--color-1); }

.porque-nosotros__acordeon {
  border-bottom: 0.1rem solid #d8ddd4;
}

.porque-nosotros__item {
  border-top: 0.1rem solid #d8ddd4;
}

.porque-nosotros__boton-acordeon {
  display: flex;
  width: 100%;
  padding: 1.6rem 0;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  color: var(--negro);
  cursor: pointer;
  text-align: left;
}

.porque-nosotros__boton-acordeon h5 {
  font-weight: 600;
  line-height: 1.15;
}

.porque-nosotros__boton-acordeon svg {
  width: 1.75rem;
  flex: 0 0 auto;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  transition: transform 220ms ease;
}

.porque-nosotros__boton-acordeon--abierto svg { transform: rotate(180deg); }

.porque-nosotros__detalle {
  overflow: hidden;
}

.porque-nosotros__detalle h6 {
  margin: -0.1rem 0 1.6rem;
  color: #969894;
  font-weight: 400;
  line-height: 1.45;
}

.acordeon-enter-active,
.acordeon-leave-active {
  transition: max-height 220ms ease, opacity 180ms ease;
}

.acordeon-enter-from,
.acordeon-leave-to {
  max-height: 0;
  opacity: 0;
}

.acordeon-enter-to,
.acordeon-leave-from {
  max-height: 12rem;
  opacity: 1;
}

.historia {
  display: grid;
  max-width: 128rem;
  margin: 0 auto;
  padding: clamp(1.792rem, 3.136vw, 3.584rem) clamp(2rem, 5.5vw, 10rem);
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(3rem, 8vw, 10rem);
  align-items: center;
  color: var(--negro);
}

.historia__imagenes {
  position: relative;
  width: 100%;
  min-height: clamp(24rem, 33vw, 32rem);
}

.historia__imagen {
  display: grid;
  overflow: hidden;
  place-items: center;
  border-radius: 1.75rem;
  background: #d4d4d4;
  color: rgb(48 51 46 / 55%);
  font-size: 0.85rem;
  text-align: center;
}

.historia__imagen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.historia--invertida .historia__imagen--principal img {
  object-position: center;
}

.historia--invertida .historia__imagen--detalle img {
  object-position: center;
}

.historia:not(.historia--invertida) .historia__imagen--principal img {
  position: absolute;
  inset: 0;
  object-position: center 70%;
}

.historia:not(.historia--invertida) .historia__imagen--detalle img {
  object-position: 42% center;
}

.historia__imagen--principal {
  position: absolute;
  inset: 0 16% 0 0;
}

.historia__imagen--detalle {
  position: absolute;
  right: 0;
  bottom: 12%;
  width: 48%;
  aspect-ratio: 1 / 1;
  border: 1.25rem solid var(--blanco);
  border-radius: 2rem;
}

.historia__contenido {
  display: grid;
  min-width: 0;
  gap: clamp(1.5rem, 3vw, 3rem);
  align-content: center;
}

.historia__contenido h2 {
  font-weight: 700;
  line-height: 1.1;
  overflow-wrap: break-word;
}

.historia__contenido p {
  max-width: 41rem;
  margin: 0;
  font-size: var(--text-h6);
  line-height: 1.4;
  overflow-wrap: break-word;
}

.historia__contenido ul {
  display: grid;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.historia__contenido li {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  font-size: var(--text-h5);
  font-weight: 500;
  line-height: 1.25;
}

.historia__contenido li svg {
  width: 2rem;
  flex: 0 0 auto;
  margin-top: 0.15em;
  fill: none;
  stroke: var(--color-2);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
}

@media (min-width: 1101px) {
  .historia--invertida .historia__imagenes {
    order: 2;
  }
}

@media (max-width: 1100px) {
  .nosotros {
    height: auto;
    min-height: 0;
    overflow: visible;
  }

  .nosotros__contenido {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.85fr);
    gap: 2.5rem;
  }

  .nosotros__presentacion {
    grid-column: 1;
    grid-row: 1;
    align-self: end;
    margin-bottom: 0;
  }

  .nosotros__mensaje {
    grid-column: 1;
    grid-row: 2;
    align-self: start;
    transform: none;
  }

  .nosotros__accion {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .nosotros__accion { align-items: stretch; }
  .nosotros__boton { align-self: center; }

  .porque-nosotros {
    grid-template-columns: 1fr;
  }

  .porque-nosotros__imagen {
    min-height: 0;
    aspect-ratio: 1.32 / 1;
  }

  .historia {
    grid-template-columns: 1fr;
    gap: clamp(2.5rem, 5vw, 4rem);
  }

  .historia__imagenes {
    min-height: clamp(21rem, 62vw, 28rem);
    max-width: 48rem;
  }
}

@media (max-width: 700px) {
  .nosotros {
    padding: 2.5rem 1.25rem;
    gap: 2.5rem;
  }

  .nosotros__contenido,
  .nosotros__marcas {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .nosotros__presentacion,
  .nosotros__mensaje,
  .nosotros__accion {
    grid-column: 1;
    grid-row: auto;
  }

  .nosotros__presentacion { align-self: start; }
  .nosotros__eyebrow { margin-bottom: 1rem; }
  .nosotros h1 { font-size: clamp(2.6rem, 12vw, 4rem); }
  .nosotros__mensaje { max-width: none; line-height: 1.4; }
  .nosotros__mensaje br { display: none; }
  .nosotros__accion { align-items: stretch; width: 100%; }
  .nosotros__boton {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .nosotros__imagen { height: 16rem; }

  .nosotros__marcas h3 {
    max-width: none;
    text-align: center;
  }

  .nosotros__logos {
    gap: 1.25rem;
    justify-content: center;
  }

  .nosotros__logos img {
    height: 1.8rem;
    max-height: 1.8rem;
    max-width: 8rem;
  }

  .porque-nosotros {
    padding: 3rem 1.25rem;
    gap: 2.5rem;
  }

  .porque-nosotros__imagen {
    min-height: 0;
  }

  .porque-nosotros__visual { gap: 1.25rem; }

  .porque-nosotros__contenido { gap: 2.25rem; }

  .porque-nosotros__encabezado {
    display: block;
  }

  .porque-nosotros__encabezado h6 {
    display: block;
    margin-bottom: 0.75rem;
    white-space: normal;
  }

  .porque-nosotros__encabezado h1 {
    display: block;
    font-size: clamp(2.25rem, 10vw, var(--text-h1));
  }

  .porque-nosotros__linea,
  .porque-nosotros__linea--confianza,
  .porque-nosotros__linea:not(.porque-nosotros__linea--confianza) {
    display: block;
    margin: 0;
  }

  .porque-nosotros__boton-acordeon {
    padding: 1.25rem 0;
  }

  .historia {
    padding: 2.75rem 1.5rem;
    gap: 2.5rem;
  }

  .historia__imagenes {
    min-height: clamp(17rem, 72vw, 22rem);
  }

  .historia__imagen--principal {
    inset: 0 12% 0 0;
  }

  .historia__imagen--detalle {
    width: 52%;
    border-width: 0.8rem;
  }

  .historia__contenido li {
    font-size: var(--text-p);
  }

  .historia__contenido h2 {
    font-size: clamp(2rem, 8vw, var(--text-h2));
  }

  .historia__contenido p {
    font-size: clamp(1rem, 4.5vw, var(--text-h6));
  }
}
</style>
