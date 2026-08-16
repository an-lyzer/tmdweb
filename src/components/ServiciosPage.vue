<script setup lang="ts">
import ServicioDescripcion from './ServicioDescripcion.vue'
import ServiciosCta from './ServiciosCta.vue'
import iconIngenieria from '../assets/icons_servicios/icon1.png'
import iconConsultoria from '../assets/icons_servicios/icon2.png'
import iconRepuestos from '../assets/icons_servicios/icon3.png'
import iconMantenimiento from '../assets/icons_servicios/icon4.png'
import iconCapacitacion from '../assets/icons_servicios/icon5.png'
import iconCertificacion from '../assets/icons_servicios/icon6.png'

const servicios = [
  { titulo: 'Consultoría y Diagnóstico Técnico', icono: iconConsultoria, clase: 'servicios-page__card--consultoria' },
  { titulo: 'Ingeniería de Transformación Energética', icono: iconIngenieria, clase: 'servicios-page__card--ingenieria' },
  { titulo: 'Mantenimiento y Soporte Post Venta', icono: iconMantenimiento, clase: 'servicios-page__card--mantenimiento' },
  { titulo: 'Venta de Repuestos Especializados', icono: iconRepuestos, clase: 'servicios-page__card--repuestos' },
  { titulo: 'Certificación y Gestión Legal', icono: iconCertificacion, clase: 'servicios-page__card--certificacion' },
  { titulo: 'Capacitación Operativa', icono: iconCapacitacion, clase: 'servicios-page__card--capacitacion' },
]
</script>

<template>
  <section class="servicios-page" aria-labelledby="servicios-page-titulo">
    <div class="servicios-page__background" aria-hidden="true"></div>

    <div class="servicios-page__content">
      <div class="servicios-page__intro">
        <h1 id="servicios-page-titulo">Servicios especializados en conversión a GNV<span>.</span></h1>
        <p>Soluciones integrales para la conversión y mantenimiento de unidades a GNV.</p>
        <RouterLink to="/contacto" class="servicios-page__cta">Hablar con un asesor <span aria-hidden="true">→</span></RouterLink>
      </div>

      <div class="servicios-page__grid">
        <article v-for="servicio in servicios" :key="servicio.titulo" class="servicios-page__card" :class="servicio.clase">
          <span class="servicios-page__icono" aria-hidden="true"><img :src="servicio.icono" alt="" /></span>
          <h2>{{ servicio.titulo }}</h2>
        </article>
      </div>
    </div>
  </section>
  <ServicioDescripcion />
  <ServiciosCta />
</template>

<style scoped>
.servicios-page {
  position: relative;
  min-height: 44.8rem;
  overflow: hidden;
  background: #213d16;
  color: var(--blanco);
}

.servicios-page__background {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(4 20 28 / 86%) 0%, rgb(30 67 23 / 82%) 48%, rgb(87 133 31 / 88%) 100%),
    linear-gradient(145deg, #0b2735, #537d20 72%);
}

.servicios-page__background::before {
  position: absolute;
  right: 33.6%;
  bottom: -14.4%;
  width: 44rem;
  height: 44rem;
  border: 0.12rem solid rgb(157 205 67 / 25%);
  border-radius: 50%;
  content: '';
  transform: rotate(-18deg);
}

.servicios-page__content {
  position: relative;
  display: grid;
  grid-template-columns: minmax(20rem, 0.9fr) minmax(30.4rem, 1fr);
  gap: clamp(1.6rem, 4vw, 4.8rem);
  max-width: 102.4rem;
  min-height: 44.8rem;
  margin: 0 auto;
  padding: clamp(2.56rem, 4.48vw, 5.12rem) 5.6rem;
  align-items: center;
}

.servicios-page__intro h1 {
  max-width: 36.8rem;
  margin: 0;
  font-size: clamp(2.4rem, 4.08vw, 4.6rem);
  font-weight: 700;
  line-height: 1.08;
}

.servicios-page__intro h1 span { color: #8fc63d; }

.servicios-page__intro p {
  max-width: 34.4rem;
  margin: clamp(2.4rem, 4.8vw, 4.8rem) 0 0;
  color: rgb(255 255 255 / 87%);
  font-size: clamp(0.96rem, 1.52vw, 1.6rem);
  line-height: 1.3;
}

.servicios-page__cta {
  display: inline-flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: clamp(1.6rem, 3.2vw, 3.2rem);
  padding: 1rem 1.6rem;
  border-radius: 0.72rem;
  background: var(--azul);
  color: var(--blanco);
  font-size: clamp(0.96rem, 1.44vw, 1.4rem);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 180ms ease, transform 180ms ease;
}

.servicios-page__cta:hover { background: var(--color-1); transform: translateY(-0.15rem); }
.servicios-page__cta span { font-size: 1.65em; line-height: 0.6; }

.servicios-page__grid {
  display: grid;
  width: 80%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.6rem;
  justify-self: center;
  /* Compensa el escalonamiento para que la grilla permanezca centrada. */
  transform: translateY(-1.84rem);
}

/* Mantiene la composición escalonada: la columna derecha queda más alta. */
.servicios-page__card:nth-child(odd) {
  transform: translateY(3.68rem);
}

.servicios-page__card {
  position: relative;
  display: flex;
  aspect-ratio: 1.15 / 1;
  min-width: 0;
  padding: clamp(0.8rem, 1.28vw, 1.28rem);
  align-items: flex-end;
  overflow: hidden;
  border-radius: 0.96rem;
  background: linear-gradient(145deg, #4e6b33, #182718);
}

.servicios-page__card::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(1 11 7 / 10%), rgb(0 0 0 / 76%));
  content: '';
}

.servicios-page__card--consultoria { background: linear-gradient(135deg, #7d9994, #233f4d); }
.servicios-page__card--ingenieria { background: linear-gradient(135deg, #506a45, #1a251e); }
.servicios-page__card--mantenimiento { background: linear-gradient(135deg, #66786d, #28362d); }
.servicios-page__card--repuestos { background: linear-gradient(135deg, #bd8830, #5a431a); }
.servicios-page__card--certificacion { background: linear-gradient(135deg, #4d87ab, #1c4050); }
.servicios-page__card--capacitacion { background: linear-gradient(135deg, #536c67, #1b2929); }

.servicios-page__icono {
  position: absolute;
  z-index: 1;
  top: 0.96rem;
  right: 0.96rem;
  display: grid;
  width: clamp(2.24rem, 2.88vw, 3.2rem);
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: transparent;
}

.servicios-page__icono img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.servicios-page__card h2 {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--blanco);
  font-size: clamp(0.832rem, 1.344vw, 1.504rem);
  font-weight: 600;
  line-height: 1.08;
}

@media (max-width: 1150px) {
  .servicios-page,
  .servicios-page__content { min-height: auto; }

  .servicios-page__content {
    grid-template-columns: 1fr;
    padding-inline: 1.6rem;
  }
}

@media (max-width: 620px) {
  .servicios-page__content { padding: 2.4rem 0.8rem; }
  .servicios-page__grid { width: 100%; grid-template-columns: 1fr; }
  .servicios-page__grid { transform: none; }
  .servicios-page__card { aspect-ratio: 1.35 / 1; }
  .servicios-page__card:nth-child(odd) { transform: none; }
}
</style>
