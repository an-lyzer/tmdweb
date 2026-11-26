<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHome, getStrapiAssetUrl } from '../services/strapi.ts'

const beneficios = [
  { titulo: 'Líderes en el mercado' },
  { titulo: 'Seguridad y Garantía' },
  { titulo: 'Soporte Técnico' },
  { titulo: 'Financiamiento*' },
]

const imagenesBeneficios = ref<string[]>([])

onMounted(async () => {
  try {
    const home = await getHome('u98yq7h5klflg2qhaiyv6j8y')
    imagenesBeneficios.value = home.beneficios.map(getStrapiAssetUrl)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <section class="beneficios" aria-labelledby="beneficios-titulo">
    <div class="beneficios__intro">
      <h2 id="beneficios-titulo">Beneficios de convertir a gas con TMD GAS</h2>
      <p>
        Ahorra más en combustible, reduce emisiones y aumenta la rentabilidad de tus operaciones
        con una conversión a GNV.
      </p>
      <a class="beneficios__cta" href="#contacto">Cotizar</a>
    </div>

    <div class="beneficios__content">
      <div class="beneficios__grid">
        <article
          v-for="(beneficio, index) in beneficios"
          :key="beneficio.titulo"
          class="beneficios__card"
          :class="{ 'beneficios__card--tercero': index === 2 }"
        >
          <div class="beneficios__media">
            <img v-if="imagenesBeneficios[index]" :src="imagenesBeneficios[index]" :alt="beneficio.titulo" loading="lazy" decoding="async" />
          </div>
          <h3>{{ beneficio.titulo }}</h3>
        </article>
      </div>
      <p class="beneficios__nota">*Financiamiento otorgado por Calidda y FISE previa evaluación</p>
    </div>
  </section>
</template>

<style scoped>
.beneficios {
  display: grid;
  grid-template-columns: minmax(16rem, 0.85fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 7rem);
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 4rem) 7rem;
  color: var(--negro);
}

.beneficios__intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.beneficios__intro h2 {
  margin: 0;
  color: var(--color-3, #537c21);
  font-size: clamp(2.35rem, 4.8vw, 5.5rem);
  font-weight: 700;
  line-height: 1.26;
}

.beneficios__intro p {
  max-width: 38rem;
  margin: clamp(1.25rem, 2vw, 2.25rem) 0;
  color: --negro;
  font-size: clamp(1rem, 1.45vw, 1.5rem);
  line-height: 1.65;
}

.beneficios__cta {
  display: grid;
  width: min(100%, 25rem);
  min-height: 4.75rem;
  padding: 0.75rem 1.5rem;
  place-items: center;
  border-radius: 1.25rem;
  background: var(--azul);
  color: var(--blanco);
  font-size: clamp(1.35rem, 2vw, 2.25rem);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 160ms ease, transform 160ms ease;
}

.beneficios__cta:hover {
  background: var(--color-2);
  transform: translateY(-0.125rem);
}

.beneficios__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2.2vw, 2.75rem);
}

.beneficios__card {
  overflow: hidden;
  border: 0.35rem solid #b3dd73;
  border-radius: 1.35rem;
  background: var(--blanco);
  box-shadow: 0 0.5rem 1.1rem rgb(34 75 11 / 20%);
}

.beneficios__media {
  display: grid;
  aspect-ratio: 1.25 / 1;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #eaf4dc, #cfe6aa);
  color: #537c21;
  font-size: 0.9rem;
}

.beneficios__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.beneficios__card--tercero .beneficios__media {
  background: var(--blanco);
}

.beneficios__card--tercero .beneficios__media img {
  object-fit: cover;
  object-position: center;
  transform: scale(1.35);
}

.beneficios__card h3 {
  margin: 0;
  padding: 0.65rem 0.8rem;
  color: #3d5b1e;
  font-size: var(--text-h6);
  font-weight: 600;
  line-height: 1.1;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.035em;
}

.beneficios__nota {
  margin: clamp(1rem, 1.5vw, 1.5rem) 0 0;
  color: #303030;
  font-size: clamp(0.78rem, 1.1vw, 1.1rem);
}

@media (max-width: 900px) {
  .beneficios {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-inline: 2rem;
  }

  .beneficios__intro {
    align-items: center;
    text-align: center;
  }

  .beneficios__cta {
    width: min(100%, 18rem);
    min-height: 3.75rem;
    padding: 0.6rem 1.25rem;
    border-radius: 1rem;
    font-size: 1.25rem;
  }
}

@media (max-width: 560px) {
  .beneficios {
    padding-inline: 1rem;
  }

  .beneficios__grid {
    grid-template-columns: 1fr;
  }

  .beneficios__cta {
    width: min(75%, 13rem);
    min-height: 3.25rem;
    padding: 0.5rem 1rem;
    border-radius: 0.85rem;
    font-size: 1.05rem;
  }

}
</style>
