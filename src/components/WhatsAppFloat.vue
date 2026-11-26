<script setup lang="ts">
import whatsappIcon from '../assets/iconowhatsgrande.webp'
</script>

<template>
  <a
    class="whatsapp-float"
    href="https://wa.me/51934215417"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escríbenos por WhatsApp al 934 215 417"
  >
    <img :src="whatsappIcon" alt="WhatsApp" />
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  z-index: 2147483647;
  right: 1.25rem;
  right: calc(1.25rem + env(safe-area-inset-right, 0px));
  bottom: 1.25rem;
  bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
  display: grid;
  width: 4rem;
  height: 4rem;
  padding: 0.24rem;
  place-items: center;
  overflow: visible;
  border: 0.2rem solid var(--blanco);
  border-radius: 50%;
  background: #25d366;
  box-shadow: 0 0.5rem 1.4rem rgb(0 0 0 / 28%);
  line-height: 0;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.whatsapp-float:hover {
  transform: translateZ(0) scale(1.08);
  box-shadow: 0 0.7rem 1.8rem rgb(0 0 0 / 32%);
}

.whatsapp-float:focus-visible {
  outline: 0.2rem solid var(--blanco);
  outline-offset: 0.2rem;
}

.whatsapp-float img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 768px) {
  .whatsapp-float {
    right: 0.9rem;
    right: calc(0.9rem + env(safe-area-inset-right, 0px));
    bottom: 1rem;
    bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
    width: 3.5rem;
    height: 3.5rem;
  }
}

@media (max-width: 380px), (max-height: 500px) {
  .whatsapp-float {
    right: 0.75rem;
    right: calc(0.75rem + env(safe-area-inset-right, 0px));
    bottom: 0.75rem;
    bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
    width: 3.15rem;
    height: 3.15rem;
  }
}
</style>
