<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LegalLayout from './LegalLayout.vue'
</script>

<template>
  <LegalLayout title="Aviso legal" description="Información sobre TMD Gas, el contenido de esta web y las reglas básicas para su uso.">
    <section>
      <h2>1. Información de contacto</h2>
      <p>Este sitio presenta los servicios de TMD Gas en Perú.</p>
      <ul>
        <li><strong>Nombre comercial:</strong> TMD Gas.</li>
        <li><strong>Dirección de atención:</strong> Av. Evitamiento 1980, Ate, Lima, Perú.</li>
        <li><strong>Teléfono:</strong> <a href="tel:+51934215417">+51 934 215 417</a>.</li>
        <li><strong>Atención en línea:</strong> <RouterLink to="/contacto">página de contacto</RouterLink>.</li>
      </ul>
    </section>
    <section>
      <h2>2. Finalidad de la información</h2>
      <p>Los contenidos describen nuestros servicios y facilitan el contacto con el equipo. Los artículos y materiales informativos no sustituyen una evaluación técnica del vehículo ni las condiciones específicas de una cotización.</p>
    </section>
    <section>
      <h2>3. Propiedad intelectual</h2>
      <p>Los textos, fotografías, diseños, logotipos y demás contenidos están protegidos por la normativa aplicable y pertenecen a sus respectivos titulares. Puedes consultar el sitio para uso personal; su reproducción o explotación comercial requiere la autorización correspondiente, salvo los usos permitidos por ley.</p>
      <p>Las marcas de vehículos, entidades y otros terceros que aparezcan en la web pertenecen a sus titulares. Su presencia no implica por sí sola una afiliación o respaldo comercial.</p>
    </section>
    <section>
      <h2>4. Sitios y servicios de terceros</h2>
      <p>La web incluye enlaces a redes sociales, WhatsApp y mapas externos. Al utilizarlos, revisa las condiciones y políticas del proveedor correspondiente. Si detectas un enlace incorrecto o un contenido que afecte tus derechos, comunícalo a nuestro equipo.</p>
    </section>
    <section>
      <h2>5. Consultas y reclamos</h2>
      <p>Puedes contactarnos para aclarar información de la web o comunicar una disconformidad con un servicio. Estos canales no sustituyen el Libro de Reclamaciones cuando corresponda ni condicionan tu derecho a acudir a <a href="https://www.gob.pe/indecopi" target="_blank" rel="noopener noreferrer">Indecopi</a> o a otras autoridades competentes.</p>
    </section>
    <section>
      <h2>6. Normativa y documentos relacionados</h2>
      <p>Este sitio se rige por la legislación peruana aplicable. Revisa también los <RouterLink to="/terminos-de-servicio">Términos de servicio</RouterLink> y la <RouterLink to="/politica-de-privacidad">Política de privacidad</RouterLink>. Ninguna disposición de estos documentos limita derechos irrenunciables reconocidos por ley.</p>
    </section>
  </LegalLayout>
</template>
