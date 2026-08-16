<script setup lang="ts">
import phone from '../assets/phone.png'
import mail from '../assets/mail.png'
import gps from '../assets/gps.png'
import motor1 from '../assets/motor1.PNG'
import logobus from '../assets/buslogo.png'
import FormContacto2 from './formcontacto2.vue'
import MapaLocacion from './mapalocacion.vue'
import Siguenos from './siguenos.vue'

const fotos = [
  { clase: 'contacto__foto--motor-azul', imagen: motor1, alt: 'Motor para conversión a GNV' },
  { clase: 'contacto__foto--camion', imagen: '', alt: 'Camión en taller TMD Gas' },
  { clase: 'contacto__foto--tanques', imagen: '', alt: 'Tanques de GNV' },
  { clase: 'contacto__foto--taller', imagen: '', alt: 'Conversión de buses en taller' },
]
</script>

<template>
  <section class="contacto" aria-labelledby="contacto-titulo">
    <div class="contacto__contenido">
      <div class="contacto__informacion">
        <p class="contacto__eyebrow">Conecta con nosotros</p>
        <h1 id="contacto-titulo">
          Tu próxima conversión comienza
          <span class="contacto__titulo-final">aquí <img :src="logobus" alt="" class="contacto__bus" /></span>
        </h1>
        <h6 class="contacto__descripcion">
          En TMD te acompañamos en cada etapa de tu conversión. Contáctanos y recibe la orientación
          que necesitas para tomar la mejor decisión.
        </h6>

        <div class="contacto__datos">
          <article class="contacto__dato">
            <img :src="phone" alt="" />
            <div><h5>Teléfono</h5><p>Siempre atentos a tu llamada.</p><strong>+51 971030423</strong></div>
          </article>
          <article class="contacto__dato">
            <img :src="mail" alt="" />
            <div><h5>Email</h5><p>Estamos a un correo de distancia.</p><strong>ventas@tmd.com</strong></div>
          </article>
          <article class="contacto__dato">
            <img :src="gps" alt="" />
            <div><h5>Almacén locación</h5><p>Te esperamos en nuestras instalaciones.</p><strong>Av. Evitamiento 1980. Ate-Lima</strong></div>
          </article>
          <article class="contacto__dato">
            <span class="contacto__clock" aria-hidden="true">◷</span>
            <div><h5>Horario de atención</h5><p>Estamos listos para atenderte.</p><strong>Lun-Sab de 6am-7pm</strong></div>
          </article>
        </div>
      </div>

      <div class="contacto__mosaico">
        <figure v-for="foto in fotos" :key="foto.clase" class="contacto__foto" :class="foto.clase">
          <img v-if="foto.imagen" :src="foto.imagen" :alt="foto.alt" />
          <span v-else aria-hidden="true">Imagen próximamente</span>
        </figure>
      </div>
    </div>
  </section>
  <FormContacto2 />
  <MapaLocacion />
  <Siguenos />
</template>

<style scoped>
.contacto {
  max-width: 128rem;
  margin: 0 auto;
  padding: clamp(2rem, 3vw, 3rem) 7rem clamp(2.5rem, 4vw, 4rem);
  color: #090909;
}

.contacto__contenido {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44.0625rem;
  gap: 1.875rem;
  align-items: start;
}

.contacto__informacion {
  height: auto;
}

.contacto__eyebrow {
  margin: 0 0 3rem;
  font-size: clamp(1rem, 1.45vw, 1.35rem);
  font-weight: 600;
}

.contacto h1 {
  max-width: 55rem;
  margin: 0;
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.26;
  text-transform: uppercase;
}

.contacto__titulo-final {
  white-space: nowrap;
}

.contacto__bus {
  display: inline-block;
  width: 3.3331rem;
  height: 3.9581rem;
  margin-left: 0.35rem;
  object-fit: contain;
  vertical-align: -0.15em;
}

.contacto__descripcion {
  max-width: 46rem;
  margin: 3rem 0 0;
  font-size: var(--text-h6);
  font-weight: 400;
  line-height: 1.35;
}

.contacto__datos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 2rem;
  row-gap: 3rem;
  margin-top: 3.125rem;
  padding-top: 0;
}

.contacto__dato {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
}

.contacto__dato > img,
.contacto__clock {
  width: clamp(2.2rem, 3.2vw, 3rem);
  height: clamp(2.2rem, 3.2vw, 3rem);
  flex: 0 0 auto;
  object-fit: contain;
}

.contacto__clock {
  display: grid;
  place-items: center;
  color: #80aa31;
  font-size: clamp(2.6rem, 3.4vw, 3.25rem);
  line-height: 1;
}

.contacto__dato h5,
.contacto__dato p,
.contacto__dato strong {
  margin: 0;
}

.contacto__dato h5 {
  font-size: var(--text-h5);
  font-weight: 600;
  line-height: 1.26;
}

.contacto__dato p {
  margin-top: 1.25rem;
  font-size: var(--text-p);
  line-height: 1.25;
  font-weight: 400;
  opacity: 0.7;
}

.contacto__dato strong {
  display: block;
  margin-top: 1.55rem;
  font-size: var(--text-h6);
  font-weight: 500;
  line-height: 1.2;
}

.contacto__mosaico {
  position: relative;
  width: 37.9375rem;
  height: 45.25rem;
  margin-bottom: 7.3125rem;
  justify-self: end;
  transform: scale(1.16145);
  transform-origin: top right;
}

.contacto__foto {
  position: absolute;
  display: grid;
  margin: 0;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #dbe5d4, #b8cba6);
  color: #537c21;
  font-size: 0.85rem;
  text-align: center;
}

.contacto__foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Medidas del diseño original: 343×307, 251×357, 190×233 y 405×354 px. */
.contacto__foto--motor-azul {
  top: 3.125rem;
  left: 0;
  width: 21.4375rem;
  height: 19.1875rem;
}

.contacto__foto--camion {
  top: 0;
  left: 22.25rem;
  width: 15.6875rem;
  height: 22.3125rem;
}

.contacto__foto--tanques {
  top: 23.125rem;
  left: 0;
  width: 11.875rem;
  height: 14.5625rem;
}

.contacto__foto--taller {
  top: 23.125rem;
  left: 12.6875rem;
  width: 25.3125rem;
  height: 22.125rem;
}

@media (max-width: 1300px) {
  .contacto__contenido {
    grid-template-columns: 1fr;
  }

  .contacto__mosaico {
    display: grid;
    width: 100%;
    height: auto;
    min-height: 40rem;
    margin-bottom: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    justify-self: stretch;
    transform: none;
  }

  .contacto__informacion {
    height: auto;
  }

  .contacto__datos {
    margin-top: 3rem;
    padding-top: 0;
  }

  .contacto__foto,
  .contacto__foto--motor-azul,
  .contacto__foto--camion,
  .contacto__foto--tanques,
  .contacto__foto--taller {
    position: static;
    width: auto;
    height: auto;
  }
}

@media (max-width: 720px) {
  .contacto {
    padding-inline: 2rem;
  }
}

@media (max-width: 520px) {
  .contacto {
    padding-inline: 1rem;
  }

  .contacto__datos,
  .contacto__mosaico {
    grid-template-columns: 1fr;
  }

  .contacto__mosaico {
    grid-template-rows: none;
    min-height: 0;
  }

  .contacto__foto,
  .contacto__foto--motor-azul,
  .contacto__foto--camion,
  .contacto__foto--tanques,
  .contacto__foto--taller {
    grid-area: auto;
    aspect-ratio: 1.25 / 1;
  }
}
</style>
