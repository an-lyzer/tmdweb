<script setup lang="ts">
import iconIngenieria from '../assets/icons_servicios/icon1.png'
import iconConsultoria from '../assets/icons_servicios/icon2.png'
import iconRepuestos from '../assets/icons_servicios/icon3.png'
import iconMantenimiento from '../assets/icons_servicios/icon4.png'
import iconCapacitacion from '../assets/icons_servicios/icon5.png'
import iconCertificacion from '../assets/icons_servicios/icon6.png'

const servicios = [
  {
    titulo: 'Consultoría y Diagnóstico Técnico',
    descripcion: 'Evaluamos tu flota y determinamos la mejor solución para optimizar costos y rendimiento con tecnología GNV.',
    puntos: ['Estudio de Viabilidad', 'Análisis de retorno de inversión', 'Asesoría personalizada'],
    imagen: '',
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
    imagen: '',
    icono: iconIngenieria,
    invertido: true,
  },
  {
    titulo: 'Mantenimiento y Soporte Post Venta',
    descripcion: 'Acompañamiento técnico integral para asegurar la operación continua de tu flota.',
    puntos: ['Mantenimiento preventivo y correctivo', 'Atención de emergencias', 'Soporte técnico especializado'],
    imagen: '',
    icono: iconMantenimiento,
  },
  {
    titulo: 'Venta de Repuestos',
    descripcion: 'Componentes originales y de alta calidad para máxima durabilidad y rendimiento.',
    puntos: ['Repuestos originales', 'Stock permanente'],
    imagen: '',
    icono: iconRepuestos,
    invertido: true,
  },
  {
    titulo: 'Certificación y Gestión Legal',
    descripcion: 'Gestionamos toda la documentación y certificaciones requeridas para circular.',
    puntos: ['Certificación de conversión', 'Cumplimiento de la normativa FISE'],
    imagen: '',
    icono: iconCertificacion,
  },
  {
    titulo: 'Capacitación Operativa del Cliente',
    descripcion: 'Capacitamos el personal y monitoreamos el desempeño de la flota en tiempo real.',
    puntos: [
      'Capacitación de mecánicos para el adecuado mantenimiento de la unidad, tanto preventivo como correctivo',
      'Capacitación de pilotos para la optimización del manejo del vehículo',
    ],
    imagen: '',
    icono: iconCapacitacion,
    invertido: true,
  },
]
</script>

<template>
  <section class="servicio-descripcion" aria-labelledby="servicio-descripcion-titulo">
    <article
      v-for="servicio in servicios"
      :key="servicio.titulo"
      class="servicio-descripcion__contenido"
      :class="{ 'servicio-descripcion__contenido--invertido': servicio.invertido }"
    >
      <div class="servicio-descripcion__imagen">
        <img v-if="servicio.imagen" :src="servicio.imagen" :alt="servicio.titulo" />
        <span v-else aria-hidden="true">Imagen próximamente</span>
      </div>

      <div class="servicio-descripcion__texto">
        <h3 id="servicio-descripcion-titulo">{{ servicio.titulo }}</h3>
        <h6>{{ servicio.descripcion }}</h6>
        <ul>
          <li v-for="punto in servicio.puntos" :key="punto">{{ punto }}</li>
        </ul>
      </div>

      <span class="servicio-descripcion__icono" aria-hidden="true"><img :src="servicio.icono" alt="" /></span>
    </article>
  </section>
</template>

<style scoped>
.servicio-descripcion {
  width: 100%;
  padding: clamp(4rem, 8vw, 8rem) 7rem;
  color: #393b37;
}

.servicio-descripcion__contenido {
  position: relative;
  display: grid;
  grid-template-columns: minmax(25rem, 1fr) minmax(30rem, 1fr);
  gap: clamp(3rem, 8vw, 10rem);
  max-width: 128rem;
  height: 28rem;
  margin: 0 auto;
  align-items: center;
}

.servicio-descripcion__contenido + .servicio-descripcion__contenido {
  margin-top: clamp(5rem, 10vw, 10rem);
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__imagen {
  grid-column: 2;
  justify-self: end;
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__texto {
  grid-column: 1;
  grid-row: 1;
}

.servicio-descripcion__contenido--invertido .servicio-descripcion__icono {
  right: auto;
  left: 0;
}

.servicio-descripcion__imagen {
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
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.servicio-descripcion__texto h3 {
  margin: 0;
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: 1.14;
}

.servicio-descripcion__texto h6 {
  max-width: 50rem;
  margin: clamp(1.5rem, 3vw, 2.5rem) 0 0;
  font-size: var(--text-h6);
  font-weight: 400;
  line-height: 1.35;
}

.servicio-descripcion__texto ul {
  display: grid;
  gap: 1.3rem;
  margin: clamp(2.5rem, 5vw, 4.5rem) 0 0;
  padding: 0 0 0 1.6rem;
  font-size: var(--text-h6);
  font-weight: 500;
  line-height: 1.2;
}

.servicio-descripcion__texto li::marker { color: #87b535; }

.servicio-descripcion__icono {
  position: absolute;
  right: 0;
  bottom: 0;
  display: grid;
  width: 5.8rem;
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

@media (max-width: 1000px) {
  .servicio-descripcion { padding-inline: 2rem; }
  .servicio-descripcion__contenido { height: auto; grid-template-columns: 1fr; gap: 3rem; }
  .servicio-descripcion__contenido--invertido .servicio-descripcion__imagen,
  .servicio-descripcion__contenido--invertido .servicio-descripcion__texto {
    grid-column: auto;
    grid-row: auto;
  }
  .servicio-descripcion__icono { right: 1rem; bottom: 1rem; }
  .servicio-descripcion__contenido--invertido .servicio-descripcion__icono { right: 1rem; left: auto; }
}

@media (max-width: 560px) {
  .servicio-descripcion { padding-inline: 1rem; }
  .servicio-descripcion__imagen { width: 100%; height: auto; min-height: 22rem; }
  .servicio-descripcion__icono { width: 4.5rem; }
}
</style>
