<script setup lang="ts">
import fise from '../assets/FISE.png'
import calidda from '../assets/calidda.png'


</script>

<template>
  <section class="financiacion" aria-labelledby="financiacion-titulo">
    <div class="financiacion__layout">
      <div class="financiacion__intro">
        <h2 id="financiacion-titulo">Financiamiento que se paga con el ahorro generado<span>.</span></h2>
        <p>Opciones de financiamiento respaldadas y evaluadas por:</p>
        <div class="financiacion__logos">
          <img :src="fise" alt="Fondo de Inclusión Social Energético - FISE" />
          <img :src="calidda" alt="Cálidda" />
        </div>
      </div>

      <article class="financiacion__card financiacion__card--uno">
        <span class="financiacion__numero">1</span>
        <div>
          <h3>Hasta <br>S/ 200,000</h3>
          <p>de financiamiento para tu <br>conversión sin afectar el flujo <br>de tu negocio.</p>
        </div>
      </article>

      <article class="financiacion__card financiacion__card--dos">
        <span class="financiacion__numero">2</span>
        <div>
          <h3>0% interés y <br>sin cuota inicial</h3>
          <p>Obtén mayor flexibilidad <br>financiera para transformar tu <br>unidad</p>
        </div>
      </article>

      <article class="financiacion__card financiacion__card--tres">
        <span class="financiacion__numero">3</span>
        <div>
          <h3>Hasta 60 <br>Meses</h3>
          <p>De plazos flexibles para que tu <br>inversión se adapte a tu <br>operación.</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.financiacion {
  background: #10180b;
  color: var(--blanco);
}

.financiacion__layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(2rem, 6vw, 6rem);
  row-gap: 10rem;
  max-width: 112rem;
  margin: 0 auto;
  padding: clamp(4rem, 7vw, 7rem) 7rem;
}

.financiacion__intro {
  align-self: start;
}

.financiacion__intro h2 {
  max-width: 39rem;
  margin: 0;
  font-size: clamp(2.25rem, 4vw, 4.5rem);
  font-weight: 700;
  line-height: 1.18;
}

.financiacion__intro h2 span {
  color: #7eaa31;
}

.financiacion__intro > p {
  margin: 4.375rem 0 0;
  color: #d5d8d0;
  font-size: clamp(1rem, 1.45vw, 1.4rem);
}

.financiacion__logos {
  display: flex;
  gap: 0.4rem;
  width: fit-content;
  max-width: 100%;
  margin-top: 0.85rem;
  overflow: hidden;
  border: 0.4rem solid #82af35;
  border-radius: 1.35rem;
  background: #82af35;
}

.financiacion__logos img {
  display: block;
  width: auto;
  max-width: 50%;
  height: clamp(3.5rem, 5vw, 4.75rem);
  padding: 0.35rem 0.5rem;
  border-radius: 1rem;
  background: var(--blanco);
  object-fit: contain;
}

.financiacion__card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: clamp(1rem, 2vw, 2rem);
  row-gap: 0;
  align-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 22.5rem;
  padding: clamp(2rem, 4vw, 4.5rem);
  border-radius: 1.5rem;
  background: var(--blanco);
  color: #050505;
}

.financiacion__card > div {
  display: contents;
}

.financiacion__numero {
  display: grid;
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  width: 3.3125rem;
  aspect-ratio: 1;
  place-items: center;
  border-radius: 50%;
  background: #7eaa31;
  color: var(--blanco);
  font-size: clamp(1.5rem, 2.4vw, 2.4rem);
  font-weight: 600;
}

.financiacion__card h3 {
  grid-column: 2;
  grid-row: 1;
  margin: 0;
  font-size: clamp(2rem, 3.6vw, 4rem);
  font-weight: 700;
  line-height: 1.13;
}

.financiacion__card p {
  grid-column: 2;
  grid-row: 2;
  max-width: 29rem;
  margin: clamp(1.75rem, 3vw, 3.5rem) 0 0;
  font-size: clamp(1.15rem, 1.75vw, 1.7rem);
  line-height: 1.2;
}

.financiacion__card--dos {
  grid-column: 1;
  /* Compensa el espacio de la segunda fila: inicia al terminar la tarjeta 1. */
  margin-top: -10rem;
}

.financiacion__card--tres {
  grid-column: 2;
}

@media (max-width: 900px) {
  .financiacion__layout {
    column-gap: 2rem;
    padding-inline: 2rem;
  }

  .financiacion__intro > p {
    margin-top: 2.5rem;
  }
}

@media (max-width: 680px) {
  .financiacion__layout {
    grid-template-columns: 1fr;
    row-gap: 2rem;
    padding-inline: 1rem;
  }

  .financiacion__card,
  .financiacion__card--dos,
  .financiacion__card--tres {
    grid-column: auto;
    width: 100%;
    height: auto;
    min-height: 17rem;
  }

  .financiacion__card--dos {
    margin-top: 0;
  }

  .financiacion__intro > p {
    margin-top: 2rem;
  }

  .financiacion__card p {
    margin-top: 1.25rem;
  }
}
</style>
