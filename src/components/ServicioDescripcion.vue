<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getServiceDescriptionImages, getStrapiAssetUrl } from '../services/strapi.ts'
import iconIngenieria from '../assets/icons_servicios/icon1.webp'
import iconConsultoria from '../assets/icons_servicios/icon2.webp'
import iconRepuestos from '../assets/icons_servicios/icon3.webp'
import iconMantenimiento from '../assets/icons_servicios/icon4.webp'
import iconCapacitacion from '../assets/icons_servicios/icon5.webp'
import iconCertificacion from '../assets/icons_servicios/icon6.webp'

const servicios = [
  {
    titulo: 'Consultoría y Diagnóstico Técnico',
    descripcion: 'Evaluamos tu flota y determinamos la mejor solución para optimizar costos y rendimiento con tecnología GNV.',
    puntos: ['Estudio de Viabilidad', 'Análisis de retorno de inversión', 'Asesoría personalizada'],
    icono: iconConsultoria,
  },
  {
    titulo: 'Ingeniería de Transformación Energética',
    descripcion: 'Diseñamos e implementamos sistemas de conversión a GNV con altos estándares de seguridad y rendimiento.',
    puntos: [
      'Diseño de sistema a gas',
      'Instalación con equipos certificados',
      'Calibración y puesta en marcha',
      'Cumplimiento de normativas MINEM',
    ],
    icono: iconIngenieria,
    invertido: true,
  },
  {
    titulo: 'Mantenimiento y Soporte Post Venta',
    descripcion: 'Acompañamiento técnico integral para asegurar la operación continua de tu flota.',
    puntos: ['Mantenimiento preventivo y correctivo', 'Atención de emergencias', 'Soporte técnico especializado'],
    icono: iconMantenimiento,
  },
  {
    titulo: 'Venta de Repuestos',
    descripcion: 'Componentes originales y de alta calidad para máxima durabilidad y rendimiento.',
    puntos: ['Repuestos originales', 'Stock permanente'],
    icono: iconRepuestos,
    invertido: true,
  },
  {
    titulo: 'Certificación y Gestión Legal',
    descripcion: 'Gestionamos toda la documentación y certificaciones requeridas para circular.',
    puntos: ['Certificación de conversión', 'Cumplimiento de la normativa FISE'],
    icono: iconCertificacion,
  },
  {
    titulo: 'Capacitación Operativa del Cliente',
    descripcion: 'Capacitamos el personal y monitoreamos el desempeño de la flota en tiempo real.',
    puntos: [
      'Capacitación de mecánicos para el adecuado mantenimiento de la unidad, tanto preventivo como correctivo',
      'Capacitación de pilotos para la optimización del manejo del vehículo',
    ],
    icono: iconCapacitacion,
    invertido: true,
    puntosCompactos: true,
  },
]

const imagenesServicios = ref<string[]>([])

onMounted(async () => {
  try {
    const imagenes = await getServiceDescriptionImages()
    imagenesServicios.value = imagenes.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="servicio-descripcion" aria-labelledby="servicio-descripcion-titulo">
    <article
      v-for="(servicio, index) in servicios"
      :key="servicio.titulo"
      :id="`servicio-${index + 1}`"
      class="servicio-descripcion__contenido"
      :class="{
        'servicio-descripcion__contenido--invertido': servicio.invertido,
        'servicio-descripcion__contenido--puntos-compactos': servicio.puntosCompactos,
      }"
    >
      <div class="servicio-descripcion__imagen">
        <img v-if="imagenesServicios[index]" :src="imagenesServicios[index]" :alt="servicio.titulo" />
      </div>

      <div class="servicio-descripcion__texto">
        <h3 id="servicio-descripcion-titulo">{{ servicio.titulo }}</h3>
        <h6>{{ servicio.descripcion }}</h6>
        <ul>
          <li v-for="punto in servicio.puntos" :key="punto">{{ punto }}</li>
        </ul>
        <span
          class="servicio-descripcion__icono"
          :class="servicio.invertido ? 'servicio-descripcion__icono--junto-a-puntos' : 'servicio-descripcion__icono--alineado-imagen'"
          aria-hidden="true"
        ><img :src="servicio.icono" alt="" /></span>
      </div>
    </article>
  </section>
</template>

<style scoped>
.servicio-descripcion {
  width: 100%;
  padding: 0 7rem;
  color: #393b37;
}

.servicio-descripcion__contenido {
  position: relative;
  display: grid;
  grid-template-columns: minmax(25rem, 1fr) minmax(30rem, 1fr);
  gap: clamp(3rem, 8vw, 10rem);
  max-width: 128rem;
  padding: clamp(1.5rem, 3vw, 2.5rem) 0;
  margin: 0 auto;
  align-items: center;
  scroll-margin-top: 5rem;
}

.servicio-descripcion__contenido + .servicio-descripcion__contenido {
  margin-top: 0;
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__imagen {
  grid-column: 2;
  justify-self: end;
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__texto {
  grid-column: 1;
  grid-row: 1;
}

.servicio-descripcion__imagen {
  position: relative;
  display: grid;
  width: 34.75rem;
  height: 23.0625rem;
  place-items: center;
  overflow: hidden;
  border-radius: 1.25rem;
  background: linear-gradient(135deg, #dce5d1, #9bae8b);
  color: #537c21;
  font-size: 0.95rem;
}

.servicio-descripcion__imagen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.servicio-descripcion__imagen::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(255 255 255 / 0%) 35%, #fff 100%);
  content: '';
  pointer-events: none;
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__imagen::after {
  background: linear-gradient(270deg, rgb(255 255 255 / 0%) 35%, #fff 100%);
}

.servicio-descripcion__texto h3 {
  margin: 0;
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: 1.14;
}

.servicio-descripcion__texto {
  position: relative;
}

.servicio-descripcion__contenido:not(.servicio-descripcion__contenido--invertido) .servicio-descripcion__texto {
  position: static;
}

.servicio-descripcion__texto h6 {
  max-width: 50rem;
  margin: clamp(0.9rem, 1.8vw, 1.5rem) 0 0;
  font-size: var(--text-h6);
  font-weight: 400;
  line-height: 1.35;
}

.servicio-descripcion__texto ul {
  display: grid;
  gap: 1.3rem;
  margin: clamp(1.5rem, 3vw, 2.7rem) 0 0;
  padding: 0 0 0 1.6rem;
  font-size: var(--text-h6);
  font-weight: 500;
  line-height: 1.2;
}

.servicio-descripcion__texto li::marker { color: #87b535; }

.servicio-descripcion__contenido--puntos-compactos .servicio-descripcion__texto ul {
  padding-left: 1rem;
}

.servicio-descripcion__icono {
  position: absolute;
  right: 0;
  bottom: 0;
  display: grid;
  width: 4.0925rem; /* 65.48 px */
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: transparent;
}

.servicio-descripcion__icono img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.servicio-descripcion__icono--junto-a-puntos {
  right: -4.0925rem;
  bottom: 0;
}

.servicio-descripcion__icono--alineado-imagen {
  /* Alinea el borde inferior del icono con el borde inferior de la imagen. */
  bottom: calc(50% - 11.53125rem);
}

@media (max-width: 1000px) {
  .servicio-descripcion { padding-inline: 2rem; }
  .servicio-descripcion__contenido { height: auto; grid-template-columns: 1fr; gap: 1.8rem; }

  .servicio-descripcion__texto {
    position: relative;
    order: 1;
  }

  .servicio-descripcion__contenido:not(.servicio-descripcion__contenido--invertido) .servicio-descripcion__texto {
    position: relative;
  }

  .servicio-descripcion__imagen {
    width: min(100%, 40rem);
    height: auto;
    aspect-ratio: 1.5 / 1;
    order: 2;
    justify-self: center;
  }

  .servicio-descripcion__contenido--invertido .servicio-descripcion__imagen,
  .servicio-descripcion__contenido--invertido .servicio-descripcion__texto {
    grid-column: auto;
    grid-row: auto;
  }

  .servicio-descripcion__contenido--invertido .servicio-descripcion__imagen {
    justify-self: center;
  }

  .servicio-descripcion__imagen::after,
  .servicio-descripcion__contenido--invertido .servicio-descripcion__imagen::after {
    background: linear-gradient(180deg, #fff 0%, rgb(255 255 255 / 0%) 34%);
  }

  .servicio-descripcion__icono,
  .servicio-descripcion__icono--junto-a-puntos,
  .servicio-descripcion__icono--alineado-imagen,
  .servicio-descripcion__contenido--invertido .servicio-descripcion__icono {
    position: static;
    width: 3.5rem;
    margin: 1rem 0 0 auto;
  }
}

@media (max-width: 560px) {
  .servicio-descripcion { padding-inline: 1rem; }
  .servicio-descripcion__imagen {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 1.35 / 1;
  }
  .servicio-descripcion__icono { width: 3.15rem; }
}
</style>
