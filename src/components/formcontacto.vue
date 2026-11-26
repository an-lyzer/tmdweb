<script setup lang="ts">
import { ref } from 'vue'
import { crearFormularioContacto } from '../services/strapi.ts'
import SolicitudConfirmacion from './SolicitudConfirmacion.vue'
import phone from '../assets/phone.webp'
import mail from '../assets/mail.webp'
import gps from '../assets/gps.webp'

const enviado = ref(false)
const cargando = ref(false)
const errorEnvio = ref('')

async function enviarFormulario(event: SubmitEvent) {
  const formulario = event.currentTarget
  if (!(formulario instanceof HTMLFormElement)) return

  enviado.value = false
  errorEnvio.value = ''

  const datos = new FormData(formulario)
  const telefono = String(datos.get('telefono') ?? '').trim()

  if (telefono.replace(/\D/g, '').length < 9) {
    errorEnvio.value = 'El número de teléfono debe tener al menos 9 dígitos.'
    return
  }

  cargando.value = true
  try {
    await crearFormularioContacto({
      Nombre: String(datos.get('nombre') ?? '').trim(),
      correo: String(datos.get('correo') ?? '').trim(),
      Telefono: telefono,
      Numeroplaca: String(datos.get('placa') ?? '').trim() || null,
    })
    formulario.reset()
    enviado.value = true
  } catch (error) {
    errorEnvio.value = error instanceof Error ? error.message : 'No se pudo enviar la solicitud.'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <section id="contacto" class="formcontacto" aria-labelledby="formcontacto-titulo">
    <h2 id="formcontacto-titulo">
      Solicita una evaluación<br />técnica <span>GRATIS.</span>
    </h2>

    <div class="formcontacto__contenido">
      <div class="formcontacto__mapa">
        <iframe
          title="Ubicación de TMD Gas"
          src="https://www.google.com/maps?q=Av.+Evitamiento+1980,+Ate,+Lima&output=embed"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <form class="formcontacto__form" @submit.prevent="enviarFormulario">
        <label>
          <span>Nombre*</span>
          <input name="nombre" type="text" required autocomplete="name" placeholder=" " />
        </label>
        <label>
          <span>Correo*</span>
          <input name="correo" type="email" required autocomplete="email" placeholder=" " />
        </label>
        <label>
          <span>Teléfono*</span>
          <input name="telefono" type="tel" required autocomplete="tel" inputmode="numeric" minlength="9" placeholder=" " />
        </label>
        <label>
          <span>Número de placa</span>
          <input name="placa" type="text" autocomplete="off" placeholder=" " />
        </label>
        <button type="submit" :disabled="cargando">{{ cargando ? 'Enviando...' : 'Enviar' }}</button>
        <p v-if="errorEnvio" class="formcontacto__mensaje formcontacto__mensaje--error" role="alert">{{ errorEnvio }}</p>
      </form>
    </div>

    <div class="formcontacto__datos">
      <a href="tel:+51934215417" class="formcontacto__dato">
        <img :src="phone" alt="" />
        <span><strong>Llamar a</strong>+51 934 215 417</span>
      </a>
      <!-- <a href="mailto:ventas@tmd.com" class="formcontacto__dato">
        <img :src="mail" alt="" />
        <span><strong>Email</strong>ventas@tmd.com</span>
      </a> -->
      <address class="formcontacto__dato">
        <img :src="gps" alt="" />
        <span><strong>Lugar</strong>Av. Evitamiento 1980 – Ate – Lima</span>
      </address>
    </div>
    <SolicitudConfirmacion v-if="enviado" @cerrar="enviado = false" />
  </section>
</template>

<style scoped>
.formcontacto {
  max-width: 112rem;
  margin: 0 auto;
  padding: 2.5rem 7rem 5.8rem;
  color: #3a561c;
}

.formcontacto h2 {
  margin: 0 0 3rem;
  font-size: clamp(2.5rem, 4.8vw, 5rem);
  font-weight: 600;
  line-height: 1.1;
}

.formcontacto h2 span {
  color: #80aa31;
}

.formcontacto__contenido {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 7vw, 8rem);
  align-items: stretch;
}

.formcontacto__mapa,
.formcontacto__form {
  height: 30rem;
}

.formcontacto__mapa {
  overflow: hidden;
  background: #e9eee4;
}

.formcontacto__mapa iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.formcontacto__form {
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr)) minmax(0, 1fr);
  gap: clamp(1rem, 1.8vw, 1.45rem);
}

.formcontacto__form label {
  position: relative;
}

.formcontacto__form label span {
  position: absolute;
  top: 50%;
  left: clamp(1.25rem, 2vw, 1.8rem);
  color: #74776d;
  opacity: 0.6;
  font-size: clamp(1.05rem, 1.7vw, 1.55rem);
  pointer-events: none;
  transform: translateY(-50%);
  transition: opacity 150ms ease;
}

.formcontacto__form input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1.35rem clamp(1.25rem, 2vw, 1.8rem) 0.35rem;
  border: 0.1rem solid transparent;
  border-radius: 1.35rem;
  outline: none;
  background: #f2f7e9;
  color: #333;
  font: inherit;
  font-size: clamp(1rem, 1.5vw, 1.35rem);
}

.formcontacto__form input:focus {
  border-color: #80aa31;
}

.formcontacto__form label:focus-within span,
.formcontacto__form label:has(input:not(:placeholder-shown)) span {
  opacity: 0;
}

.formcontacto__form button {
  min-height: 0;
  margin-top: 0;
  border: 0;
  border-radius: 1.35rem;
  background: #2e5d88;
  color: var(--blanco);
  cursor: pointer;
  font: inherit;
  font-size: clamp(1.3rem, 2vw, 2rem);
  font-weight: 500;
  transition: background-color 150ms ease, transform 150ms ease;
}

.formcontacto__form button:hover {
  background: #244e75;
  transform: translateY(-0.1rem);
}

.formcontacto__mensaje {
  margin: 0;
  color: #537c21;
  font-size: 0.95rem;
}

.formcontacto__mensaje--error { color: #b42318; }

.formcontacto__form button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.formcontacto__datos {
  display: grid;
  grid-template-columns: repeat(3, max-content);
  gap: clamp(2rem, 6vw, 7rem);
  justify-content: center;
  margin-top: 4rem;
}

.formcontacto__dato {
  display: flex;
  gap: 0.9rem;
  align-items: center;
  color: #757575;
  font-size: clamp(0.95rem, 1.25vw, 1.25rem);
  font-style: normal;
  text-decoration: none;
}

.formcontacto__dato img {
  width: clamp(2.75rem, 4vw, 4rem);
  height: clamp(2.75rem, 4vw, 4rem);
  object-fit: contain;
}

.formcontacto__dato span {
  display: grid;
  gap: 0.15rem;
}

.formcontacto__dato strong {
  color: #2b2d2a;
  font-size: clamp(1.25rem, 1.8vw, 1.85rem);
  font-weight: 500;
}

@media (max-width: 900px) {
  .formcontacto {
    padding-inline: 2rem;
  }

  .formcontacto__contenido {
    gap: 2.5rem;
  }

  .formcontacto__mapa,
  .formcontacto__form {
    height: 25rem;
  }

  .formcontacto__datos {
    grid-template-columns: 1fr;
    justify-content: start;
  }
}

@media (max-width: 640px) {
  .formcontacto {
    padding-inline: 1rem;
  }

  .formcontacto__contenido {
    grid-template-columns: 1fr;
  }

  .formcontacto__mapa,
  .formcontacto__form {
    height: auto;
  }

  .formcontacto__mapa {
    aspect-ratio: 1.2 / 1;
  }

  .formcontacto__form {
    grid-template-rows: none;
  }

  .formcontacto__form input {
    height: 4.5rem;
  }

  .formcontacto__form button {
    min-height: 4.5rem;
  }

  .formcontacto__datos {
    gap: 1.5rem;
  }
}
</style>
