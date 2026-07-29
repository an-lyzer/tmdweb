<script setup lang="ts">
const motorImage = new URL('../assets/motor1.PNG', import.meta.url).href

const featuredArticles = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    category: 'Conversión',
    title: '¿Cómo funciona la conversión de diésel a GNV?',
    description:
        'Conoce las etapas del proceso y los beneficios de adaptar tu unidad para operar con gas natural.',
    image: motorImage,
}))

const sidebarArticles = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    date: 'Agosto 17 2026',
    title: index < 2 ? 'Llegan los nuevos motores Weichai' : 'Nuevos miembros con CAPECHI',
    image: motorImage,
}))
</script>

<template>
    <section class="blog">
        <div class="buscador">
            <span class="buscador__badge">Blog</span>

            <h1>Descubre nuestras últimas noticias</h1>

            <p>
                Descubre los logros y avances que nos diferencian. Desde
                conversiones hasta mejoras en nuestros servicios.
            </p>

            <form class="buscador__form" action="#" method="get">
                <label class="sr-only" for="search-articles">Buscar artículos</label>

                <div class="buscador__field">
                    <span class="buscador__icon" aria-hidden="true">⌕</span>
                    <input id="search-articles" type="search" placeholder="Buscar artículos..." />
                </div>

                <button type="submit">Buscar</button>
            </form>
        </div>

        <div class="main-blog">
            <div class="articulos">
                <div class="main-blog__title">
                    <h2>Conocimiento que impulsa tu negocio.</h2>
                    <span class="main-blog__line" aria-hidden="true"></span>
                </div>

                <div class="articulos__grid">
                    <article v-for="article in featuredArticles" :key="article.id" class="article-card">
                        <img class="article-card__image" :src="article.image" :alt="article.title" />

                        <div class="article-card__overlay">
                            <span class="article-card__category">{{ article.category }}</span>
                            <h3>{{ article.title }}</h3>
                            <p>{{ article.description }}</p>
                        </div>
                    </article>
                </div>

                <button class="articulos__more" type="button">
                    <span aria-hidden="true">⟳</span>
                    Cargar más
                </button>
            </div>

            <aside class="articulos destacados">
                <section class="sidebar-section">
                    <div class="sidebar-section__title">
                        <h3>Artículos Destacados</h3>
                        <span aria-hidden="true"></span>
                    </div>

                    <article v-for="article in sidebarArticles.slice(0, 3)" :key="article.id" class="sidebar-card">
                        <img class="sidebar-card__image" :src="article.image" :alt="article.title" />

                        <div class="sidebar-card__content">
                            <span>{{ article.date }}</span>
                            <h4>{{ article.title }}</h4>
                        </div>
                    </article>
                </section>

                <section class="sidebar-section">
                    <div class="sidebar-section__title">
                        <h3>Lo último</h3>
                        <span aria-hidden="true"></span>
                    </div>

                    <article v-for="article in sidebarArticles.slice(2)" :key="article.id" class="sidebar-card">
                        <img class="sidebar-card__image" :src="article.image" :alt="article.title" />

                        <div class="sidebar-card__content">
                            <span>{{ article.date }}</span>
                            <h4>{{ article.title }}</h4>
                        </div>
                    </article>
                </section>
            </aside>
        </div>
    </section>
</template>

<style scoped>
.blog {
    min-height: calc(100vh - 7rem);
    padding: 2.5rem 1.5rem 4rem;
    background: #fbfbf7;
}

.main-blog {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 2rem;
    align-items: start;
    width: min(100%, 1240px);
    margin: 3.5rem auto 0;
}

.buscador {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
}

.buscador__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 1rem;
    border-radius: 999px;
    background: #dff0be;
    color: var(--negro);
    font-family: "Inter", system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1;
}

.buscador h1 {
    max-width: 14ch;
    margin: 0;
    color: #333634;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    line-height: 0.98;
    letter-spacing: -0.04em;
}

.buscador p {
    max-width: 62rem;
    margin: 0;
    color: #505450;
    font-size: clamp(1.1rem, 1.3vw, 1.55rem);
    line-height: 1.45;
}

.buscador__form {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: min(100%, 760px);
    margin-top: 0.5rem;
}

.buscador__field {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    flex: 1;
    min-width: 0;
    padding: 0.9rem 1.2rem;
    border: 2px solid #d0d0cb;
    border-radius: 0.75rem;
    background: var(--blanco);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02);
}

.buscador__icon {
    color: #c2c2bd;
    font-size: 1.4rem;
    line-height: 1;
}

.buscador__field input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--negro);
    font-size: 1rem;
}

.buscador__field input::placeholder {
    color: #c2c2bd;
    font-weight: 600;
}

.buscador__form button {
    border: 0;
    border-radius: 0.75rem;
    padding: 0.95rem 1.6rem;
    background: var(--azul);
    color: var(--blanco);
    font-family: "Inter", system-ui, sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease;
    box-shadow: 0 0.5rem 1rem rgba(71, 143, 201, 0.22);
}

.buscador__form button:hover {
    transform: translateY(-1px);
    box-shadow: 0 0.75rem 1.35rem rgba(71, 143, 201, 0.28);
}

.articulos {
    min-width: 0;
}

.main-blog__title {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.main-blog__title h2 {
    margin: 0;
    color: #393d39;
    font-size: clamp(1.8rem, 2vw, 2.8rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    white-space: nowrap;
}

.main-blog__line {
    flex: 1;
    height: 1px;
    background: #d7dacd;
}

.articulos__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.article-card {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    min-height: 360px;
    background: #2d2d2d;
}

.article-card__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.6) 100%);
}

.article-card__overlay {
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding: 1rem;
    color: var(--blanco);
}

.article-card__category {
    align-self: flex-start;
    padding: 0.4rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.95);
    color: #333634;
    font-family: "Inter", system-ui, sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
}

.article-card__overlay h3 {
    margin: 0;
    font-size: 1.35rem;
    line-height: 1.15;
}

.article-card__overlay p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.92);
}

.articulos__more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem auto 0;
    padding: 0.65rem 1rem;
    border: 0;
    border-radius: 0.65rem;
    background: #dfeebc;
    color: #4a4f46;
    font-family: "Inter", system-ui, sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
}

.articulos.destacados {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
}

.sidebar-section__title {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 1rem;
}

.sidebar-section__title h3 {
    margin: 0;
    color: #393d39;
    font-size: 1.15rem;
    line-height: 1;
    white-space: nowrap;
}

.sidebar-section__title span {
    flex: 1;
    height: 1px;
    background: #d7dacd;
}

.sidebar-card {
    display: grid;
    grid-template-columns: 84px 1fr;
    gap: 0.85rem;
    align-items: center;
    margin-bottom: 1.1rem;
}

.sidebar-card__image {
    width: 84px;
    height: 84px;
    border-radius: 0.7rem;
    object-fit: cover;
}

.sidebar-card__content span {
    display: block;
    margin-bottom: 0.3rem;
    color: #6f726b;
    font-size: 0.92rem;
}

.sidebar-card__content h4 {
    margin: 0;
    color: #303330;
    font-size: 1rem;
    line-height: 1.35;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

@media (max-width: 768px) {
    .buscador__form {
        flex-direction: column;
        align-items: stretch;
    }

    .buscador__form button {
        width: 100%;
    }

    .buscador h1 {
        max-width: none;
    }

    .main-blog {
        grid-template-columns: 1fr;
    }

    .articulos__grid {
        grid-template-columns: 1fr;
    }

    .main-blog__title {
        flex-wrap: wrap;
    }
}
</style>
