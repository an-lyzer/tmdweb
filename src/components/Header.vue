<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getLogos, getStrapiAssetUrl } from '../services/strapi.ts'


const logoUrl = ref<string>('')
const menuAbierto = ref(false)

onMounted(async () => {
    try {
        const logo = await getLogos()
        if (logo) logoUrl.value = getStrapiAssetUrl(logo)
    } catch (error) {
        console.error(error)
    }
})

function alternarMenu() {
    menuAbierto.value = !menuAbierto.value
}

function cerrarMenu() {
    menuAbierto.value = false
}

</script>

<template>
    <header class="site-header">
        <RouterLink class="site-header__brand" to="/" aria-label="TMD Gas">
            <img class="site-header__logo" :src="logoUrl" alt="TMD Gas" />
        </RouterLink>

        <button
            class="site-header__toggle"
            type="button"
            aria-label="Abrir menú de navegación"
            aria-controls="menu-principal"
            :aria-expanded="menuAbierto"
            @click="alternarMenu"
        >
            <span></span><span></span><span></span>
        </button>

        <div id="menu-principal" class="site-header__menu" :class="{ 'site-header__menu--abierto': menuAbierto }">
            <nav class="site-header__nav" aria-label="Navegación principal">
                <RouterLink class="site-header__link" to="/" @click="cerrarMenu"><h6>Inicio</h6></RouterLink>
                <RouterLink class="site-header__link" to="/servicios" @click="cerrarMenu"><h6>Servicios</h6></RouterLink>
                <RouterLink class="site-header__link" to="/nosotros" @click="cerrarMenu"><h6>Nosotros</h6></RouterLink>
                <RouterLink class="site-header__link" to="/blog" @click="cerrarMenu"><h6>Blog</h6></RouterLink>
            </nav>

            <RouterLink class="buttonheader" to="/contacto" @click="cerrarMenu">
                <h5>Asesoría gratuita</h5>
            </RouterLink>
        </div>
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

.site-header__menu {
    display: contents;
}

.site-header__toggle {
    display: none;
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
        grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
        gap: 1rem;
        padding: 0.64rem 1.2rem;
        background: transparent;
    }

    .site-header__brand {
        grid-column: 2;
        grid-row: 1;
        justify-self: center;
    }

    .site-header__toggle {
        display: grid;
        grid-column: 3;
        grid-row: 1;
        width: 2.75rem;
        height: 2.75rem;
        padding: 0.65rem;
        place-content: center;
        gap: 0.3rem;
        border: 0;
        border-radius: 0.65rem;
        background: transparent;
        cursor: pointer;
        justify-self: end;
    }

    .site-header__toggle span {
        display: block;
        width: 1.35rem;
        height: 0.13rem;
        border-radius: 999px;
        background: var(--negro);
        transition: transform 180ms ease, opacity 180ms ease;
    }

    .site-header__toggle[aria-expanded="true"] span:first-child {
        transform: translateY(0.43rem) rotate(45deg);
    }

    .site-header__toggle[aria-expanded="true"] span:nth-child(2) {
        opacity: 0;
    }

    .site-header__toggle[aria-expanded="true"] span:last-child {
        transform: translateY(-0.43rem) rotate(-45deg);
    }

    .site-header__menu {
        position: absolute;
        top: calc(100% + 0.5rem);
        right: 1.2rem;
        left: 1.2rem;
        display: flex;
        width: auto;
        padding: 1.25rem;
        flex-direction: column;
        gap: 1.25rem;
        border: 1px solid rgb(0 0 0 / 8%);
        border-radius: 1rem;
        background: rgb(255 255 255 / 96%);
        box-shadow: 0 1rem 2.5rem rgb(0 0 0 / 18%);
        backdrop-filter: blur(0.75rem);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        clip-path: inset(0 0 0 100% round 1rem);
        transition: clip-path 240ms ease, opacity 180ms ease, visibility 240ms;
    }

    .site-header__menu--abierto {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        clip-path: inset(0 round 1rem);
    }

    .site-header__nav {
        width: 100%;
        flex-direction: column;
        gap: 0;
        align-items: stretch;
    }

    .site-header__link {
        width: 100%;
        padding: 0.85rem 0.5rem;
        justify-content: center;
    }

    .site-header__link h6 {
        font-size: 1rem;
    }

    .site-header__logo {
        width: 3.6rem;
    }

    .buttonheader {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .site-header {
        top: 2.65rem;
        position: absolute;
    }
}

@media (max-width: 600px) {
    .site-header {
        padding: 0.65rem 1rem;
    }

    .site-header__logo {
        width: 3.2rem;
    }

    .buttonheader h5 {
        font-size: 1rem;
    }

    .site-header__menu {
        right: 1rem;
        left: 1rem;
        width: auto;
    }
}
</style>
