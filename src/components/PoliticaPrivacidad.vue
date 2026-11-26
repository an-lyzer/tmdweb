<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LegalLayout from './LegalLayout.vue'
</script>

<template>
  <LegalLayout title="Política de privacidad" description="Conoce qué datos solicitan nuestros formularios, para qué se utilizan y cómo ejercer tus derechos en Perú.">
    <section>
      <h2>1. Ámbito de esta política</h2>
      <p>Esta política se refiere a los datos proporcionados a TMD Gas a través de esta web y sus canales de contacto. Para consultas sobre privacidad, puedes comunicarte al <a href="tel:+51934215417">+51 934 215 417</a> o acudir a Av. Evitamiento 1980, Ate, Lima, Perú.</p>
      <p>El marco aplicable es la Ley N.° 29733, Ley de Protección de Datos Personales, y su <a href="https://www.gob.pe/institucion/anpd/normas-legales/6554453-16-2024-jus" target="_blank" rel="noopener noreferrer">Reglamento, aprobado por Decreto Supremo N.° 016-2024-JUS</a>.</p>
    </section>
    <section>
      <h2>2. Datos que nos proporcionas</h2>
      <p>Los formularios solicitan nombre, correo electrónico y teléfono como campos obligatorios para atender la solicitud. La placa del vehículo es opcional y permite orientar la evaluación. Si no facilitas los campos obligatorios, no podrás enviar el formulario; puedes consultar los demás <RouterLink to="/contacto">canales de atención</RouterLink>.</p>
      <p>Al comunicarte por teléfono o WhatsApp también puedes compartir información relacionada con tu consulta. Evita enviar datos sensibles o documentos que no sean necesarios para atenderla.</p>
    </section>
    <section>
      <h2>3. Finalidades y autorización</h2>
      <p>Los datos de la solicitud se destinan a responder consultas, contactar al interesado, coordinar evaluaciones técnicas y preparar la información o cotización solicitada. El tratamiento debe contar con tu consentimiento cuando sea exigible o con otra habilitación prevista por ley.</p>
      <p>La atención de una consulta no implica autorización para campañas publicitarias. Cualquier uso adicional que requiera consentimiento deberá informarse y autorizarse por separado. La sola navegación no equivale a otorgarlo.</p>
    </section>
    <section>
      <h2>4. Conservación y acceso</h2>
      <p>La conservación debe limitarse al tiempo necesario para atender la solicitud y, si se contrata un servicio, cumplir las obligaciones legales y atender las responsabilidades asociadas. Al concluir esas finalidades, corresponde suprimir o anonimizar los datos, salvo una obligación legal de conservación.</p>
      <p>El acceso debe limitarse al personal autorizado y a los proveedores tecnológicos que lo necesiten para prestar el servicio, con las obligaciones de confidencialidad y seguridad correspondientes. Las comunicaciones a autoridades proceden cuando exista una obligación legal.</p>
    </section>
    <section>
      <h2>5. Servicios externos y cookies</h2>
      <p>La web carga mapas y tipografías de Google e incluye enlaces a WhatsApp y redes sociales. Al cargar recursos externos o abrir esos enlaces, el proveedor puede recibir información técnica, como tu dirección IP, y aplicar su propia política de privacidad, incluso mediante infraestructura ubicada fuera del Perú.</p>
      <p>Puedes consultar la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de Google</a> y la <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de WhatsApp</a>. La configuración de tu navegador permite gestionar las cookies; restringirlas puede afectar funciones de terceros. Cualquier incorporación de cookies propias de analítica o publicidad deberá informarse y solicitar autorización cuando corresponda.</p>
    </section>
    <section>
      <h2>6. Tus derechos</h2>
      <p>Puedes solicitar acceso a tus datos, su rectificación, cancelación u oposición al tratamiento (derechos ARCO), así como revocar el consentimiento cuando corresponda. La revocación no afecta el tratamiento realizado lícitamente con anterioridad.</p>
      <p>Para presentar una solicitud, dirígete a nuestra dirección de atención indicando tu nombre, el derecho que deseas ejercer y un medio de respuesta. Se podrá solicitar la información necesaria para verificar tu identidad o representación. Puedes llamar previamente para coordinar la atención.</p>
      <p>Si no recibes atención o no estás conforme con la respuesta, puedes acudir a la <a href="https://www.gob.pe/9269" target="_blank" rel="noopener noreferrer">Autoridad Nacional de Protección de Datos Personales</a> conforme al procedimiento aplicable.</p>
    </section>
    <section>
      <h2>7. Actualizaciones</h2>
      <p>Los cambios se publicarán en esta página con su fecha de actualización. Si implican nuevas finalidades que requieran autorización, deberá solicitarse el consentimiento correspondiente antes de realizar ese tratamiento.</p>
    </section>
  </LegalLayout>
</template>
