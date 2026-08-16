<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getLogos } from '../services/strapi.ts'


const logoUrl = ref<string>('')

onMounted(async () => {
    try {
        const logo = await getLogos();

        if (logo) {
            logoUrl.value = `http://localhost:1337${logo}`;
        }
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <header class="site-header">
        <RouterLink class="site-header__brand" to="/" aria-label="TMD Gas">
            <img class="site-header__logo" :src="logoUrl" alt="TMD Gas" />
        </RouterLink>

        <nav class="site-header__nav" aria-label="Navegación principal">
            <RouterLink class="site-header__link" to="/">
                <h6>Inicio</h6>
            </RouterLink>
            <RouterLink class="site-header__link" to="/servicios">
                <h6>Servicios</h6>
                
            </RouterLink>
            <RouterLink class="site-header__link" to="/nosotros">
                <h6>Nosotros</h6>
            </RouterLink>
            <RouterLink class="site-header__link" to="/blog">
                <h6>Blog</h6>
            </RouterLink>
        </nav>

        <RouterLink class="buttonheader" to="/contacto">
            <h5>Asesoría gratuita</h5>
        </RouterLink>
    </header>
</template>

<style scoped>
.site-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    position: absolute;
    /* Coincide con la altura de la barra superior para alinear ambos headers. */
    top: 3.5rem;
    left: 0;
    right: 0;
    width: 100%;
    margin: 0;
    padding: 0.8rem 5.6rem;
    box-sizing: border-box;
    z-index: 100;
    background: transparent;
    font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.site-header__brand {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
}

.site-header__logo {
    display: block;
    width: 4.8rem;
    height: auto;
    object-fit: contain;
}

.site-header__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1.6rem, 4vw, 2.8rem);
    flex-wrap: wrap;
}

.site-header__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--negro);
    text-decoration: none;
    transition: opacity 200ms ease;

}

.site-header__link:hover {
    opacity: 0.7;
}

.site-header__link h6 {
    
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.3px;
     
}
.site-header__link:hover h6 {
    transition: color 0.3s ease;
    color: var(--color-3);
}

.site-header__link--dropdown {
    padding-right: 0.16rem;
}

.site-header__chevron {
    font-size: 0.85rem;
    line-height: 1;
    transform: translateY(-0.1rem);
}

.buttonheader {
    border: 0;
    border-radius: 0.64rem;
    width: 13.45rem;
    /* 237px */
    height: 3rem;
    /* 60px */
    padding: 0 0;
    background-color: var(--azul);
    color: var(--blanco);
    cursor: pointer;
    transition: all 200ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    text-decoration: none;
}

.buttonheader:hover {
    transition: background-color 0.3s ease, transform 0.3s ease;
     transform: scale(1.03);
    background-color: hsl(83.89, 54.07%, 40.98%);
}

.buttonheader:active {
    transform: translateY(0);
}

.buttonheader h5 {
    font-size: 1.3824rem;
    font-weight: 550;
    line-height: 1;
    letter-spacing: -0.3px;
    margin: 0;
    padding: 0;
    display: block;
}

@media (max-width: 1024px) {
    .site-header {
        gap: 1.6rem;
        padding: 0.72rem 2rem;
    }

    .site-header__logo {
        width: 4rem;
    }

    .site-header__nav {
        gap: 1.6rem;
    }
}

@media (max-width: 768px) {
    .site-header {
        grid-template-columns: auto 1fr auto;
        gap: 1.2rem;
        padding: 0.64rem 1.2rem;
    }

    .site-header__nav {
        gap: 1.2rem;
    }

    .site-header__link h6 {
        font-size: 0.95rem;
    }

    .site-header__logo {
        width: 3.6rem;
    }
}

@media (max-width: 680px) {
    .site-header {
        top: auto;
        position: relative;
    }
}

@media (max-width: 600px) {
    .site-header {
        grid-template-columns: 1fr;
        gap: 0.8rem;
        padding: 0.8rem;
        text-align: center;
    }

    .site-header__nav {
        order: 3;
        gap: 0.96rem;
    }

    .site-header__cta {
        order: 2;
        width: 100%;
    }

    .buttonheader {
        order: 2;
    }

    .site-header__logo {
        width: 3.2rem;
    }

    .site-header__link h6 {
        font-size: 0.9rem;
    }

    .buttonheader h5 {
        font-size: 0.8rem;
    }
}
</style>
