<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getContactpage, getLogos } from '../services/strapi.ts'

const logoUrl = ref('')
const carroRojoPartidoUrl = ref('')
const fondoCarroRojoUrl = ref('')
const enviado = ref(false)

onMounted(async () => {
  try {
    const [logo, contactform] = await Promise.all([getLogos(), getContactpage()])

    if (logo) logoUrl.value = `http://localhost:1337${logo}`
    if (contactform.carroRojoPartido) carroRojoPartidoUrl.value = `http://localhost:1337${contactform.carroRojoPartido}`
    if (contactform.fondoCarroRojo) fondoCarroRojoUrl.value = `http://localhost:1337${contactform.fondoCarroRojo}`
  } catch (error) {
    console.error(error)
  }
})

function enviarFormulario() {
  enviado.value = true
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
      <span v-if="!fondoCarroRojoUrl">Imagen de fondo próximamente</span>
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
          <label>Teléfono*<input name="telefono" type="tel" placeholder="Ingresa tu teléfono" required autocomplete="tel" /></label>
          <label>Nro de placa<input name="placa" type="text" placeholder="Ingresa la placa del vehículo a convertir" /></label>
          <button type="submit">Enviar</button>
          <p v-if="enviado" class="formcontacto2__mensaje" role="status">Recibimos tu solicitud. Pronto te contactaremos.</p>
        </form>
      </div>

      <div class="formcontacto2__imagen">
        <img v-if="carroRojoPartidoUrl" :src="carroRojoPartidoUrl" alt="Bus convertido por TMD Gas" />
        <span v-else aria-hidden="true">Imagen de vehículo próximamente</span>
      </div>
    </div>
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
    padding: 4rem 2rem;
  }

  .formcontacto2__tarjeta {
    height: auto;
    grid-template-columns: 1fr;
  }

  .formcontacto2__formulario { max-width: none; }
  .formcontacto2__imagen { min-height: 28rem; }
}

@media (max-width: 560px) {
  .formcontacto2 { padding-inline: 1rem; }
  .formcontacto2__tarjeta { padding: 2rem 1.25rem; }
  .formcontacto2__imagen { min-height: 20rem; }
}
</style>
