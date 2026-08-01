<script setup lang="ts">
import facebookIcon from '../assets/facebook.png'
import gpsIcon from '../assets/gps.png'
import linkedinIcon from '../assets/linkedin.png'
import mailIcon from '../assets/mail.png'
import phoneIcon from '../assets/phone.png'
import tiktokIcon from '../assets/tiktok.png'
import whatsappIcon from '../assets/whatsapplogo.png'
</script>

<template>
  <aside class="header-top" aria-label="Datos de contacto y redes sociales">
    <div class="header-top__content">
      <address class="header-top__contact">
        <a class="header-top__item" href="https://maps.google.com/?q=Av.+Evitamiento+1980,+Ate,+Lima" target="_blank" rel="noopener noreferrer">
          <img :src="gpsIcon" alt="" aria-hidden="true" />
          <span>Av. Evitamiento 1980 - Ate - Lima</span>
        </a>
        <a class="header-top__item" href="tel:+51923573697">
          <img :src="phoneIcon" alt="" aria-hidden="true" />
          <span>+51 923 573 697</span>
        </a>
        <a class="header-top__item" href="mailto:ventas@tmd.com">
          <img :src="mailIcon" alt="" aria-hidden="true" />
          <span>ventas@tmd.com</span>
        </a>
      </address>

      <nav class="header-top__social" aria-label="Redes sociales">
        <a href="#" aria-label="TikTok"><img :src="tiktokIcon" alt="" /></a>
        <a href="#" aria-label="Facebook"><img :src="facebookIcon" alt="" /></a>
        <a href="#" aria-label="LinkedIn"><img :src="linkedinIcon" alt="" /></a>
        <a href="#" aria-label="WhatsApp"><img :src="whatsappIcon" alt="" /></a>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.header-top {
  position: relative;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  background: var(--blanco);
  color: var(--negro);
  font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  z-index: 200;
}

.header-top__content {
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  padding: 0.65rem clamp(1.5rem, 8vw, 10.25rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.header-top__contact,
.header-top__social,
.header-top__item {
  display: flex;
  align-items: center;
}

.header-top__contact {
  gap: clamp(1.25rem, 2.2vw, 2.75rem);
  font-style: normal;
}

.header-top__item {
  gap: 0.55rem;
  color: inherit;
  font-size: 1.1rem;
  font-weight: 400;
  white-space: nowrap;
}

.header-top img {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
}

.header-top__social {
  gap: 1rem;
  flex-shrink: 0;
}

.header-top__social a {
  display: grid;
  place-items: center;
}

.header-top__social img {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 900px) {
  .header-top__content {
    padding-inline: 1.5rem;
  }

  .header-top__contact {
    gap: 1rem;
  }

  .header-top__item {
    font-size: 0.9rem;
  }
}

@media (max-width: 680px) {
  .header-top__content {
    flex-direction: column;
    gap: 0.75rem;
  }

  .header-top__contact {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
