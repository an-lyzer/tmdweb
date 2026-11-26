<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emit = defineEmits<{ cerrar: [] }>()
const dialogo = ref<HTMLDialogElement | null>(null)

onMounted(() => {
  dialogo.value?.showModal()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialogo"
      class="solicitud-confirmacion"
      aria-label="Confirmación de solicitud"
      aria-describedby="solicitud-confirmacion-mensaje"
      @close="emit('cerrar')"
    >
      <p id="solicitud-confirmacion-mensaje">
        ¡Gracias por escribirnos! Recibimos tu solicitud y pronto nos pondremos en contacto contigo para ayudarte.
      </p>
      <button type="button" autofocus @click="dialogo?.close()">Entendido</button>
    </dialog>
  </Teleport>
</template>

<style scoped>
.solicitud-confirmacion {
  box-sizing: border-box;
  width: min(28rem, calc(100% - 2rem));
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: clamp(1.5rem, 5vw, 2.5rem);
  overflow-y: auto;
  border: 0;
  border-radius: 1.25rem;
  background: #fff;
  color: #3a561c;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 20%);
  text-align: center;
}

.solicitud-confirmacion::backdrop {
  background: rgb(0 0 0 / 50%);
}

.solicitud-confirmacion p {
  margin: 0 0 1.5rem;
  font-size: clamp(1.1rem, 4vw, 1.35rem);
  line-height: 1.5;
}

.solicitud-confirmacion button {
  width: 100%;
  min-height: 3rem;
  padding: 0.75rem 1.5rem;
  border: 0;
  border-radius: 0.75rem;
  background: #2e5d88;
  color: #fff;
  cursor: pointer;
  font: inherit;
}

.solicitud-confirmacion button:hover {
  background: #244e75;
}

.solicitud-confirmacion button:focus-visible {
  outline: 3px solid #80aa31;
  outline-offset: 3px;
}
</style>
