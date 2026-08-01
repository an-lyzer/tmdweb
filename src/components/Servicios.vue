<script setup lang="ts">
const servicios = [
  {
    titulo: 'Consultoría y Diagnóstico Técnico',
    descripcion: 'Evaluamos tu flota y determinamos la mejor solución para optimizar costos y rendimiento con tecnología GNV.',
    imagen: '',
  },
  {
    titulo: 'Ingeniería de Transformación Energética',
    descripcion: 'Diseñamos e implementamos sistemas de conversión a GNV con altos estándares de seguridad y rendimiento.',
    imagen: '',
  },
  {
    titulo: 'Mantenimiento y Soporte Post Venta',
    descripcion: 'Acompañamiento técnico integral para asegurar la operación continua de tu flota.',
    imagen: '',
  },
  {
    titulo: 'Venta de Repuestos Especializados',
    descripcion: 'Componentes originales y de alta calidad para máxima durabilidad y rendimiento.',
    imagen: '',
  },
  {
    titulo: 'Certificación y Gestión Legal',
    descripcion: 'Gestionamos toda la documentación y certificaciones requeridas para circular.',
    imagen: '',
  },
  {
    titulo: 'Capacitación Operativa',
    descripcion: 'Capacitamos el personal y monitoreamos el desempeño de la flota en tiempo real.',
    imagen: '',
  },
]
</script>

<template>
  <section class="servicios" aria-labelledby="servicios-titulo">
    <header class="servicios__header">
      <h2 id="servicios-titulo">Todo lo que necesitas en un solo lugar</h2>
      <p>Transformamos tu gasto de combustible en inversión para tu crecimiento.</p>
    </header>

    <div class="servicios__grid">
      <article v-for="servicio in servicios" :key="servicio.titulo" class="servicios__card">
        <div class="servicios__media">
          <img v-if="servicio.imagen" :src="servicio.imagen" :alt="servicio.titulo" />
          <span v-else aria-hidden="true">Imagen próximamente</span>
        </div>

        <div class="servicios__body">
          <h3>{{ servicio.titulo }}</h3>
          <p>{{ servicio.descripcion }}</p>
          <a class="servicios__link" href="#contacto">
            Saber más <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.servicios {
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(2rem, 4.5vw, 4.5rem) 7rem;
  color: var(--negro);
}

.servicios__header {
  margin-bottom: clamp(2rem, 4vw, 4rem);
  text-align: center;
}

.servicios__header h2 {
  margin: 0;
  color: var(--color-3, #537c21);
  font-size: clamp(2rem, 3.8vw, 3.75rem);
  font-weight: 700;
  line-height: 1.15;
}

.servicios__header p {
  margin: clamp(0.65rem, 1.4vw, 1.25rem) 0 0;
  color: #394F18;
  opacity: 0.6;
  font-size: clamp(1rem, 1.6vw, 1.55rem);
}

.servicios__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

.servicios__card {
  display: flex;
  min-width: 0;
  min-height: 100%;
  flex-direction: column;
  overflow: hidden;
  border: 0.2rem solid #e2e9da;
  border-radius: 0.8rem;
  background: var(--blanco);
}

.servicios__media {
  display: grid;
  aspect-ratio: 1.25 / 1;
  place-items: center;
  overflow: hidden;
  margin: clamp(0.75rem, 1.2vw, 1rem);
  margin-bottom: 0;
  border-radius: 0.45rem;
  background: linear-gradient(135deg, #dfe8d4, #a7c77c);
  color: #527a24;
  font-size: 0.85rem;
}

.servicios__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.servicios__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: clamp(1rem, 1.8vw, 1.45rem);
}

.servicios__body h3 {
  margin: 0;
  color: #30332e;
  font-size: clamp(1.15rem, 1.7vw, 1.65rem);
  font-weight: 600;
  line-height: 1.15;
}

.servicios__body p {
  margin: clamp(1rem, 1.6vw, 1.35rem) 0;
  color: #3f433d;
  font-size: clamp(0.95rem, 1.35vw, 1.25rem);
  line-height: 1.22;
}

.servicios__link {
  display: inline-flex;
  width: fit-content;
  gap: 0.45rem;
  align-items: center;
  margin-top: auto;
  color: #78a832;
  font-size: clamp(1rem, 1.45vw, 1.35rem);
  font-weight: 600;
  text-decoration: none;
}

.servicios__link span {
  font-size: 1.55em;
  font-weight: 400;
  line-height: 0.7;
  transition: transform 160ms ease;
}

.servicios__link:hover span {
  transform: translateX(0.25rem);
}

@media (max-width: 900px) {
  .servicios {
    padding-inline: 2rem;
  }

  .servicios__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 580px) {
  .servicios {
    padding-inline: 1rem;
  }

  .servicios__grid {
    grid-template-columns: 1fr;
  }

  .servicios__media {
    aspect-ratio: 1.45 / 1;
  }
}
</style>
