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
            <RouterLink class="site-header__link site-header__link--dropdown" to="/servicios">
                <h6>Servicios</h6>
                <span class="site-header__chevron" aria-hidden="true">⌄</span>
            </RouterLink>
            <RouterLink class="site-header__link" to="/nosotros">
                <h6>Nosotros</h6>
            </RouterLink>
            <RouterLink class="site-header__link" to="/blog">
                <h6>Blog</h6>
            </RouterLink>
        </nav>

        <RouterLink class="buttonheader" to="/contacto">
            <h5>Contáctanos</h5>
        </RouterLink>
    </header>
</template>

<style scoped>
.site-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    position: relative;
    width: 100%;
    margin: 0;
    padding: 1rem 7rem;
    box-sizing: border-box;
    z-index: 100;
    background: var(--blanco);
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
    width: 6rem;
    height: auto;
    object-fit: contain;
}

.site-header__nav {
    display: grid;
    place-items: center;
    text-align: center;
    gap: clamp(2rem, 5vw, 3.5rem);
    flex-wrap: wrap;
}

.site-header__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--blanco);
    text-decoration: none;
    transition: opacity 200ms ease;

}

.site-header__link:hover {
    opacity: 0.7;
}

.site-header__link h6 {
    font-size: 1.05rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.3px;
}

.site-header__link--dropdown {
    padding-right: 0.2rem;
}

.site-header__chevron {
    font-size: 0.85rem;
    line-height: 1;
    transform: translateY(-0.1rem);
}

.buttonheader {
    border: 0;
    border-radius: 1rem;
    width: 14.8125rem;
    /* 237px */
    height: 3.75rem;
    /* 60px */
    padding: 0 0;
    background-color: hsl(204.09, 54.15%, 50.39%);
    color: hsl(0, 0%, 100%);
    cursor: pointer;
    transition: all 200ms ease;

    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Montserrat, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    text-decoration: none;
}

.buttonheader:hover {
    transform: translateY(-2px);
    background-color: hsl(83.89, 54.07%, 40.98%);
}

.buttonheader:active {
    transform: translateY(0);
}

.buttonheader h5 {
    width: 100%;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.3px;
}

@media (max-width: 1024px) {
    .site-header {
        gap: 2rem;
        padding: 0.9rem 2.5rem;
    }

    .site-header__logo {
        width: 5rem;
    }

    .site-header__nav {
        gap: 2rem;
    }
}

@media (max-width: 768px) {
    .site-header {
        grid-template-columns: auto 1fr auto;
        gap: 1.5rem;
        padding: 0.8rem 1.5rem;
    }

    .site-header__nav {
        gap: 1.5rem;
    }

    .site-header__link h6 {
        font-size: 0.95rem;
    }

    .site-header__logo {
        width: 4.5rem;
    }
}

@media (max-width: 600px) {
    .site-header {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
    }

    .site-header__nav {
        order: 3;
        gap: 1.2rem;
    }

    .site-header__cta {
        order: 2;
        width: 100%;
    }

    .site-header__logo {
        width: 4rem;
    }

    .site-header__link h6 {
        font-size: 0.9rem;
    }

    .site-header__cta h5 {
        font-size: 1rem;
    }
}
</style>
