<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LegalLayout from './LegalLayout.vue'
</script>

<template>
  <LegalLayout title="Términos de servicio" description="Condiciones básicas para navegar por nuestra web, solicitar información y conocer nuestros servicios en Perú.">
    <section>
      <h2>1. Alcance del sitio</h2>
      <p>La web de TMD Gas presenta información sobre conversión vehicular a GNV, servicios relacionados y alternativas de financiamiento. Estas condiciones regulan el uso de la web; las condiciones de cada servicio se informan al cliente antes de su contratación.</p>
    </section>
    <section>
      <h2>2. Uso responsable</h2>
      <p>Utiliza el sitio de forma lícita y proporciona información veraz al contactarnos. No está permitido suplantar a otras personas, enviar contenido malicioso, intentar acceder sin autorización a los sistemas ni interferir con el funcionamiento de la web.</p>
    </section>
    <section>
      <h2>3. Consultas y evaluaciones</h2>
      <p>Enviar un formulario o iniciar una conversación no equivale a contratar un servicio, reservar una fecha ni obtener aprobación de financiamiento. Nuestro equipo deberá confirmar la recepción y coordinar la evaluación correspondiente.</p>
      <p>La viabilidad de una conversión depende de la evaluación técnica del vehículo. Las referencias a ahorro, rendimiento y beneficios dependen de las condiciones de cada unidad y de su uso.</p>
    </section>
    <section>
      <h2>4. Cotizaciones y contratación</h2>
      <p>Antes de contratar, revisa el alcance del trabajo, precio total, impuestos aplicables, forma de pago, plazos, garantías y condiciones de cancelación indicados en la cotización. Cualquier trabajo adicional requiere información y aceptación previa del cliente.</p>
      <p>El financiamiento está sujeto a los requisitos y a la evaluación de la entidad que lo otorgue. La información de esta web no constituye una aprobación de crédito.</p>
    </section>
    <section>
      <h2>5. Disponibilidad y enlaces</h2>
      <p>El sitio puede presentar interrupciones por mantenimiento o problemas técnicos. Los enlaces a plataformas externas permiten acceder a servicios con sus propias condiciones. Estas disposiciones no excluyen responsabilidades ni garantías que correspondan legalmente a TMD Gas.</p>
    </section>
    <section>
      <h2>6. Datos personales</h2>
      <p>Consulta nuestra <RouterLink to="/politica-de-privacidad">Política de privacidad</RouterLink> para conocer el uso de los datos de contacto y tus derechos. Navegar por la web no constituye por sí solo consentimiento para recibir publicidad.</p>
    </section>
    <section>
      <h2>7. Derechos del consumidor y cambios</h2>
      <p>Se aplica la legislación peruana, incluido el <a href="https://www.gob.pe/institucion/indecopi/normas-legales/1244218-29571" target="_blank" rel="noopener noreferrer">Código de Protección y Defensa del Consumidor, Ley N.° 29571</a>. Puedes comunicar una consulta o disconformidad por nuestros canales de atención, sin limitar tu derecho a acudir a Indecopi o a la autoridad competente.</p>
      <p>Las actualizaciones de estos términos se publicarán con su fecha de revisión y no modificarán retroactivamente las condiciones ya acordadas con un cliente.</p>
    </section>
  </LegalLayout>
</template>
