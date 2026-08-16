<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHero } from '../services/strapi.ts'
import pathlineasverdes from '../assets/pathlineasverdes.png'
import LogosCarros from './logoscarros.vue'
import Beneficios from './beneficios.vue'
import ProcesoConversion from './procesoconversion.vue'
import Servicios from './Servicios.vue'
import Motores from './Motores.vue'
import Marcas from './Marcas.vue'
import Financiacion from './Financiacion.vue'
import Galeria from './Galeria.vue'
import FormContacto from './formcontacto.vue'

const heroUrl = ref<string>('')
const heroItemsUrl = ref<string>('')
const blancoFondoUrl = ref<string>('')

onMounted(async () => {
     try {
        const hero = await getHero();

        if (hero.heroBack) {
            heroUrl.value = `http://localhost:1337${hero.heroBack}`;
        }

        if (hero.heroItems) {
            heroItemsUrl.value = `http://localhost:1337${hero.heroItems}`;
        }

        if (hero.blancoFondo) {
            blancoFondoUrl.value = `http://localhost:1337${hero.blancoFondo}`;
        }

    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <section class="home">
        <div class ="hero">
        <img v-if="heroUrl" :src="heroUrl" alt="Hero Image" class="hero-image" />
        <img v-if="blancoFondoUrl" :src="blancoFondoUrl" alt="" class="blanco-fondo" />
        <img v-if="heroItemsUrl" :src="heroItemsUrl" alt="Hero item" class="hero-item" />
        <img :src="pathlineasverdes" alt="Líneas decorativas verdes" class="pathlineasverdes" />
        </div>
        <div class="content">
            <LogosCarros />
            <Beneficios />
            <ProcesoConversion />
            <Servicios />
            <Motores />
            <Marcas />
            <Financiacion />
            <Galeria />
            <FormContacto />
        </div>
    
    </section>
</template>

<style scoped>
.home {
}

.hero {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.hero-item {
    position: absolute;
    inset: 0;
    width: 88%;
    height: 88%;
    object-fit: contain;
    z-index: 3;
    pointer-events: none;
    margin: auto;
    display: block;
}

.blanco-fondo {
    position: absolute;
    top: 0;
    left: 0;
   
    height: 70%;
    width: 70%;
    object-fit: contain;
    object-position: top left;
    z-index: 2;
    pointer-events: none;
}

.pathlineasverdes {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 2;
    pointer-events: none;
}

.content {
    position: relative;
    z-index: 2;
    padding: 0rem;
    color: var(--blanco);

}

.content h1 {
    margin-bottom: 1rem;
    color: var(--blanco);
}

.content p {
    color: var(--negro);
    font-size: var(--text-p);
}
</style>
