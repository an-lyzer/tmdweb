<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { crearFormularioContacto, getContactpage, getLogos, getStrapiAssetUrl } from '../services/strapi.ts'
import SolicitudConfirmacion from './SolicitudConfirmacion.vue'

const logoUrl = ref('')
const carroRojoPartidoUrl = ref('')
const fondoCarroRojoUrl = ref('')
const enviado = ref(false)
const cargando = ref(false)
const errorEnvio = ref('')

onMounted(async () => {
  try {
    const [logo, contactform] = await Promise.all([getLogos(), getContactpage()])

    if (logo) logoUrl.value = getStrapiAssetUrl(logo)
    if (contactform.carroRojoPartido) carroRojoPartidoUrl.value = getStrapiAssetUrl(contactform.carroRojoPartido)
    if (contactform.fondoCarroRojo) fondoCarroRojoUrl.value = getStrapiAssetUrl(contactform.fondoCarroRojo)
  } catch (error) {
    console.error(error)
  }
})

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
  <section class="formcontacto2" aria-labelledby="formcontacto2-titulo">
    <div
      class="formcontacto2__fondo"
      :class="{ 'formcontacto2__fondo--con-imagen': fondoCarroRojoUrl }"
      :style="fondoCarroRojoUrl ? { backgroundImage: `url(${fondoCarroRojoUrl})` } : undefined"
      aria-hidden="true"
    >
    </div>

    <div class="formcontacto2__tarjeta">
      <div class="formcontacto2__formulario">
        <img v-if="logoUrl" :src="logoUrl" alt="TMD Gas" class="formcontacto2__logo" />
        <h2 id="formcontacto2-titulo">Solicita una evaluación gratuita<span>.</span></h2>
        <p>
          Completa el formulario y uno de nuestros especialistas evaluará tu unidad para brindarte
          la mejor alternativa de conversión y financiamiento, sin compromiso.
        </p>

        <form @submit.prevent="enviarFormulario">
          <label>Nombre*<input name="nombre" type="text" placeholder="Ingresa tu nombre" required autocomplete="name" /></label>
          <label>Correo*<input name="correo" type="email" placeholder="Ingresa tu correo" required autocomplete="email" /></label>
          <label>Teléfono*<input name="telefono" type="tel" placeholder="Ingresa tu teléfono" required autocomplete="tel" inputmode="numeric" minlength="9" /></label>
          <label>Nro de placa<input name="placa" type="text" placeholder="Ingresa la placa del vehículo a convertir" /></label>
          <button type="submit" :disabled="cargando">{{ cargando ? 'Enviando...' : 'Enviar' }}</button>
          <p v-if="errorEnvio" class="formcontacto2__mensaje formcontacto2__mensaje--error" role="alert">{{ errorEnvio }}</p>
        </form>
      </div>

      <div class="formcontacto2__imagen">
        <img v-if="carroRojoPartidoUrl" :src="carroRojoPartidoUrl" alt="Bus convertido por TMD Gas" />
      </div>
    </div>
    <SolicitudConfirmacion v-if="enviado" @cerrar="enviado = false" />
  </section>
</template>

<style scoped>
.formcontacto2 {
  position: relative;
  display: grid;
  min-height: 67.5rem;
  place-items: center;
  overflow: hidden;
  padding: 5rem 7rem;
  background: #8fb4e0;
}

.formcontacto2__fondo {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #8eb4e1, #416a75);
  background-position: center;
  background-size: cover;
  color: rgb(255 255 255 / 65%);
  font-size: 0.95rem;
}

.formcontacto2__fondo--con-imagen::after {
  position: absolute;
  inset: 0;
  background: rgb(20 35 43 / 18%);
  content: '';
}

.formcontacto2__tarjeta {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(100%, 101rem);
  min-height: 57.5rem;
  grid-template-columns: minmax(26rem, 1fr) minmax(28rem, 1.05fr);
  gap: clamp(2.5rem, 6vw, 7rem);
  padding: clamp(2.5rem, 5vw, 5rem);
  border-radius: 1.8rem;
  background: var(--blanco);
  overflow: hidden;
}

.formcontacto2__formulario {
  display: flex;
  max-width: 42rem;
  min-width: 0;
  flex-direction: column;
}

.formcontacto2__logo {
  display: block;
  width: 3rem;
  height: auto;
  margin-bottom: clamp(1.25rem, 2vw, 2rem);
  object-fit: contain;
}

.formcontacto2 h2 {
  max-width: 38rem;
  margin: 0;
  color: #0b0b0b;
  font-size: clamp(2.3rem, 3.7vw, 4rem);
  font-weight: 500;
  line-height: 1.08;
}

.formcontacto2 h2 span { color: #80aa31; }

.formcontacto2__formulario > p {
  max-width: 40rem;
  margin: clamp(1.5rem, 3vw, 2.5rem) 0;
  color: #767676;
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.38;
}

.formcontacto2 form {
  display: grid;
  gap: 1.25rem;
}

.formcontacto2 label {
  display: grid;
  gap: 0.65rem;
  color: #151515;
  font-size: 1rem;
  font-weight: 500;
}

.formcontacto2 input {
  width: 100%;
  height: 4rem;
  padding: 0 1.25rem;
  border: 0.1rem solid transparent;
  border-radius: 0.75rem;
  outline: none;
  background: #e8f2d4;
  color: #333;
  font: inherit;
}

.formcontacto2 input::placeholder { color: #899183; opacity: 1; }
.formcontacto2 input:focus { border-color: #80aa31; }

.formcontacto2 button {
  height: 4rem;
  margin-top: 0.75rem;
  border: 0;
  border-radius: 0.75rem;
  background: var(--azul);
  color: var(--blanco);
  cursor: pointer;
  font: inherit;
  font-size: 1.4rem;
  font-weight: 500;
  transition: background-color 220ms ease;
}

.formcontacto2 button:hover { background: var(--color-2); }
.formcontacto2__mensaje { margin: 0; color: #537c21; font-size: 0.95rem; }
.formcontacto2__mensaje--error { color: #b42318; }
.formcontacto2 button:disabled { cursor: wait; opacity: 0.7; }

.formcontacto2__imagen {
  display: grid;
  min-width: 0;
  min-height: 0;
  height: 100%;
  place-items: center;
  overflow: hidden;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #a6c1e1, #687f95);
  color: rgb(255 255 255 / 78%);
  font-size: 0.95rem;
  text-align: center;
}

.formcontacto2__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1050px) {
  .formcontacto2 {
    height: auto;
    min-height: 0;
    padding: 4rem 2rem;
  }

  .formcontacto2__tarjeta {
    height: auto;
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .formcontacto2__formulario { max-width: none; }
  .formcontacto2__imagen { min-height: 28rem; }
}

@media (max-width: 560px) {
  .formcontacto2 {
    padding: 2.5rem 0.75rem;
  }

  .formcontacto2__tarjeta {
    gap: 2rem;
    padding: 2rem 1.1rem 1.1rem;
    border-radius: 1.25rem;
  }

  .formcontacto2__logo {
    width: 2.5rem;
  }

  .formcontacto2 h2 {
    font-size: clamp(2rem, 10vw, 2.75rem);
  }

  .formcontacto2__formulario > p {
    margin: 1.25rem 0 1.75rem;
    font-size: 0.95rem;
  }

  .formcontacto2 form {
    gap: 1rem;
  }

  .formcontacto2 input,
  .formcontacto2 button {
    height: 3.5rem;
  }

  .formcontacto2 button {
    font-size: 1.1rem;
  }

  .formcontacto2__imagen {
    min-height: 16rem;
    aspect-ratio: 1.15 / 1;
  }
}
</style>
