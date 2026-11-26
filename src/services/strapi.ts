const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');
const API = `${STRAPI_URL}/api`;
// El proyecto actual utiliza la colección `blogs`. Cambia esta variable si el
// API ID de tu Collection Type tiene otro nombre.
const BLOG_COLLECTION = import.meta.env.VITE_STRAPI_BLOG_COLLECTION ?? 'blogs';

export type BlogContentBlock = {
    type: 'heading' | 'paragraph' | 'quote' | 'list';
    text: string;
    level?: number;
    items?: string[];
};

export type BlogArticle = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    publishedAt: string | null;
    image: string | null;
    images: string[];
    videoUrl: string | null;
    content: BlogContentBlock[];
    featured: boolean;
};

type StrapiPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};

type ArticlesResult = {
    articles: BlogArticle[];
    pagination: StrapiPagination;
};

/** Convierte una ruta de media de Strapi en una URL lista para el navegador. */
export function getStrapiAssetUrl(url: string): string {
    if (!url) return '';
    if (/^https?:\/\//i.test(url)) return url;
    return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

function getAssetUrl(url: unknown): string | null {
    if (typeof url !== 'string' || !url) return null;
    return getStrapiAssetUrl(url);
}

function isVideoFile(url: unknown, mime?: unknown): boolean {
    if (typeof mime === 'string' && mime.toLowerCase().startsWith('video/')) return true;
    if (typeof url !== 'string') return false;
    try {
        const parsed = new URL(url, STRAPI_URL);
        const host = parsed.hostname.replace(/^www\./i, '').toLowerCase();
        return /\.(?:mp4|m4v|mov|webm|ogv|ogg|m3u8)$/i.test(parsed.pathname)
            || host === 'youtu.be'
            || host === 'youtube.com' || host.endsWith('.youtube.com')
            || host === 'tiktok.com' || host.endsWith('.tiktok.com')
            || host === 'facebook.com' || host.endsWith('.facebook.com')
            || host === 'fb.watch';
    } catch {
        return /\.(?:mp4|m4v|mov|webm|ogv|ogg|m3u8)(?:[?#]|$)/i.test(url);
    }
}

function mediaUrls(value: unknown): string[] {
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        if (isVideoFile(trimmed)) return [];

        // También permite pegar en Strapi una URL o una lista JSON de URLs.
        try {
            const parsed: unknown = JSON.parse(trimmed);
            if (parsed !== value) return mediaUrls(parsed);
        } catch {
            return getAssetUrl(trimmed) ? [getAssetUrl(trimmed)!] : [];
        }
        return getAssetUrl(trimmed) ? [getAssetUrl(trimmed)!] : [];
    }

    if (Array.isArray(value)) return value.flatMap(mediaUrls);
    if (!value || typeof value !== 'object') return [];

    const entry = value as Record<string, any>;
    // Strapi v4 envuelve media en `data`/`attributes`; v5 suele devolverlo plano.
    if (entry.data !== undefined) return mediaUrls(entry.data);
    if (entry.attributes) return mediaUrls(entry.attributes);

    const url = entry.formats?.large?.url ?? entry.formats?.medium?.url ?? entry.url;
    if (isVideoFile(url, entry.mime ?? entry.mimeType)) return [];
    const assetUrl = getAssetUrl(url);
    return assetUrl ? [assetUrl] : [];
}

function getVideoAssetUrl(value: unknown): string | null {
    if (Array.isArray(value)) {
        for (const item of value) {
            const url = getVideoAssetUrl(item);
            if (url) return url;
        }
        return null;
    }
    if (typeof value === 'string') return isVideoFile(value) ? getAssetUrl(value) : null;
    if (!value || typeof value !== 'object') return null;

    const entry = value as Record<string, any>;
    if (entry.data !== undefined) return getVideoAssetUrl(entry.data);
    if (entry.attributes) return getVideoAssetUrl(entry.attributes);
    const url = entry.url ?? entry.href;
    return isVideoFile(url, entry.mime ?? entry.mimeType) ? getAssetUrl(url) : null;
}

function getVideoUrl(value: unknown): string | null {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (value && typeof value === 'object') {
        const media = value as Record<string, any>;
        const nested = media.data?.attributes ?? media.data ?? media.attributes ?? media;
        const url = nested.url ?? nested.href;
        return typeof url === 'string' && url.trim() ? url.trim() : null;
    }
    return null;
}

function plainText(value: unknown): string {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.map(plainText).filter(Boolean).join('');
    if (value && typeof value === 'object') {
        const item = value as Record<string, unknown>;
        return typeof item.text === 'string'
            ? item.text
            : plainText(item.children ?? item.content ?? '');
    }
    return '';
}

function normalizeContent(value: unknown): BlogContentBlock[] {
    if (typeof value === 'string') {
        return value.split(/\n{2,}/).map((text) => text.trim()).filter(Boolean)
            .map((text) => {
                // `textlargo` es texto plano: los párrafos breves que terminan
                // en pregunta o no tienen puntuación funcionan como subtítulos.
                const isHeading = text.length < 110 && (/[?¿]$/.test(text) || !/[.!]$/.test(text));
                return { type: isHeading ? 'heading' as const : 'paragraph' as const, text };
            });
    }

    if (!Array.isArray(value)) return [];

    return value.map((block) => {
        const item = (block ?? {}) as Record<string, unknown>;
        const sourceType = String(item.type ?? item.__component ?? '').toLowerCase();
        const isList = sourceType.includes('list');
        const isHeading = sourceType.includes('heading');
        const isQuote = sourceType.includes('quote');
        const children = Array.isArray(item.children) ? item.children : [];
        const items = isList ? children.map(plainText).filter(Boolean) : undefined;

        return {
            type: isList ? 'list' : isHeading ? 'heading' : isQuote ? 'quote' : 'paragraph',
            text: plainText(item),
            level: typeof item.level === 'number' ? item.level : 2,
            items,
        } as BlogContentBlock;
    }).filter((block) => block.text || block.items?.length);
}

function excerptFromContent(value: unknown): string {
    if (typeof value !== 'string') return '';
    const firstParagraph = value.split(/\n{2,}/).map((paragraph) => paragraph.trim()).find(Boolean) ?? '';
    return firstParagraph.length > 170 ? `${firstParagraph.slice(0, 167).trimEnd()}...` : firstParagraph;
}

function normalizeArticle(record: Record<string, any>): BlogArticle {
    // Strapi v4 devuelve los campos dentro de `attributes`; v5 los devuelve planos.
    const fields = record.attributes ?? record;
    const media = fields.media_urls
        ?? fields.mediaUrls
        ?? fields['media urls']
        ?? fields.imagenes
        ?? fields.imagen
        ?? fields.portada
        ?? fields.cover
        ?? fields.image;
    const images = mediaUrls(media);
    const image = images[0] ?? null;
    const title = String(fields.Title ?? fields.titulo ?? fields.title ?? 'Artículo sin título');
    const slug = String(fields.slug ?? fields.Slug ?? record.documentId ?? record.id);

    return {
        id: String(record.documentId ?? record.id ?? slug),
        slug,
        title,
        excerpt: String(
            fields.extracto
            ?? fields.descripcion
            ?? fields.excerpt
            ?? excerptFromContent(fields.textlargo ?? fields.contenido ?? fields.content ?? fields.body),
        ),
        category: String(fields.categoria ?? fields.category ?? 'Conversión'),
        author: String(fields.Autor ?? fields.autor ?? fields.author ?? 'TMD'),
        publishedAt: fields.fechaPublicacion ?? fields.publishedAt ?? null,
        image,
        images,
        videoUrl: getVideoUrl(fields.videoUrl ?? fields.VideoUrl ?? fields.video_url) ?? getVideoAssetUrl(media),
        content: normalizeContent(fields.textlargo ?? fields.contenido ?? fields.content ?? fields.body),
        featured: Boolean(fields.destacado ?? fields.featured),
    };
}

export async function getArticles(page = 1, pageSize = 6): Promise<ArticlesResult> {
    const query = new URLSearchParams({
        'populate': '*',
        'sort[0]': 'publishedAt:desc',
        'pagination[page]': String(page),
        'pagination[pageSize]': String(pageSize),
    });
    const response = await fetch(`${API}/${BLOG_COLLECTION}?${query}`);

    if (!response.ok) throw new Error('No se pudieron cargar los artículos del blog.');

    const result = await response.json();
    const pagination = result.meta?.pagination ?? { page, pageSize, pageCount: 1, total: 0 };
    return {
        articles: (result.data ?? []).map(normalizeArticle),
        pagination,
    };
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | null> {
    const query = new URLSearchParams({
        'populate': '*',
        'filters[slug][$eq]': slug,
    });
    const response = await fetch(`${API}/${BLOG_COLLECTION}?${query}`);

    if (!response.ok) throw new Error('No se pudo cargar el artículo.');

    const result = await response.json();
    const article = result.data?.[0];
    return article ? normalizeArticle(article) : null;
}

export type FormularioContacto = {
    Nombre: string;
    correo: string;
    Telefono: string;
    Numeroplaca?: string | null;
};

export async function crearFormularioContacto(formulario: FormularioContacto) {
    const response = await fetch(`${API}/forms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formulario }),
    });

    if (!response.ok) {
        const detalle = await response.json().catch(() => null);
        throw new Error(detalle?.error?.message ?? 'No se pudo enviar la solicitud.');
    }

    return response.json();
}


let logoRequest: Promise<string | null> | null = null;
let logoCache: string | null | undefined;

export function getLogos(): Promise<string | null> {
    if (logoCache !== undefined) return Promise.resolve(logoCache);
    if (logoRequest) return logoRequest;

    logoRequest = (async () => {
        const response = await fetch(`${API}/tmdlogos?populate=*`);

        if (!response.ok) {
            throw new Error("Error al obtener logo");
        }

        const data = await response.json();
        const url = data.data[0]?.tmd_logo?.url ?? null;
        if (url) logoCache = url;
        return url;
    })().finally(() => {
        logoRequest = null;
    });

    return logoRequest;
}

type StrapiImageFormat = {
    url?: string;
    width?: number;
};

type StrapiImage = {
    url?: string;
    width?: number;
    formats?: Record<string, StrapiImageFormat>;
};

function getImageSrcSet(image: StrapiImage | null | undefined): string | null {
    if (!image) return null;

    const variants = [...Object.values(image.formats ?? {}), image]
        .filter((variant): variant is StrapiImageFormat & { url: string; width: number } =>
            typeof variant.url === 'string' && typeof variant.width === 'number' && variant.width > 0,
        );
    const uniqueVariants = [...new Map(variants.map((variant) => [variant.width, variant])).values()]
        .sort((first, second) => first.width - second.width);

    return uniqueVariants.length
        ? uniqueVariants.map((variant) => `${getStrapiAssetUrl(variant.url)} ${variant.width}w`).join(', ')
        : null;
}

export async function getHero() {
    const query = new URLSearchParams();
    ['hero_back', 'hero_white'].forEach((field, index) => {
        query.set(`populate[${index}]`, field);
    });
    const response = await fetch(`${API}/heroes?${query}`);

    if (!response.ok) {
        throw new Error("Error al obtener hero");
    }

    const data = await response.json();
    const hero = data.data[0];
    const heroBack: StrapiImage | null = hero?.hero_back ?? null;
    return {
        heroBack: heroBack?.url ?? null,
        heroBackSrcSet: getImageSrcSet(heroBack),
        blancoFondo: hero?.hero_white?.url ?? null,
    };

}

const homeRequests = new Map<string, Promise<{
    beneficios: string[];
    flujo: string[];
    servicios: string[];
    motores: string[];
    marcas: string[];
    conversiones: string[];
}>>();

export function getHome(id: number | string) {
    const key = String(id);
    const cachedRequest = homeRequests.get(key);
    if (cachedRequest) return cachedRequest;

    const request = (async () => {
        const query = new URLSearchParams();
        ['Beneficios', 'flujo', 'servicios', 'motores', 'marcas', 'conversiones'].forEach((field, index) => {
            query.set(`populate[${index}]`, field);
        });
        const response = await fetch(`${API}/homes/${id}?${query}`);

        if (!response.ok) {
            throw new Error("Error al obtener beneficios del home");
        }

        const data = await response.json();
        const home = data.data ?? {};
        const ordenarImagenes = (imagenes: Array<{ name?: string; url?: string }>, orden: string[]) =>
            orden
                .map((nombre) => imagenes.find((imagen) => imagen.name === nombre)?.url ?? null)
                .filter((url): url is string => Boolean(url));

        return {
            beneficios: ordenarImagenes(home.Beneficios ?? [], ['1.webp', '2.webp', '3.webp', '4.webp']),
            flujo: ordenarImagenes(home.flujo ?? [], ['1.webp', '2.webp', '3.webp']),
            servicios: ordenarImagenes(home.servicios ?? [], ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']),
            // Conserva las posiciones para que una imagen faltante no cambie el motor asociado.
            motores: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png']
                .map((nombre) => (home.motores ?? []).find(
                    (imagen: { name?: string; url?: string }) => imagen.name === nombre,
                )?.url ?? ''),
            marcas: (home.marcas ?? [])
                .map((imagen: { url?: string }) => imagen.url ?? null)
                .filter((url: string | null): url is string => Boolean(url)),
            conversiones: ordenarImagenes(home.conversiones ?? [], ['4.png', '1.png', '6.png', '2.png', '3.png', '5.png']),
        };
    })().finally(() => {
        // Comparte solo la petición en curso; una visita posterior recibe datos recientes.
        homeRequests.delete(key);
    });

    homeRequests.set(key, request);
    return request;
}

export async function getServiceDescriptionImages() {
    const response = await fetch(`${API}/services?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener las imágenes de descripción de servicios");
    }

    const data = await response.json();
    const service = data.data?.[0] ?? {};
    const imagenes = service.Service_description ?? [];

    return ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']
        .map((nombre) => imagenes.find((imagen: { name?: string; url?: string }) => imagen.name === nombre)?.url ?? null)
        .filter((url: string | null): url is string => Boolean(url));
}

export async function getNosotrosHero(id: number | string) {
    const response = await fetch(`${API}/nosotros1/${id}?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener las imágenes de Nosotros");
    }

    const data = await response.json();
    // Strapi v4 devuelve el registro dentro de `attributes` y puede envolver
    // los medios en `data`; Strapi v5 suele devolverlos directamente.
    const record = data.data?.attributes ?? data.data ?? {};
    const normalizarImagenes = (value: any): Array<{ name?: string; url?: string }> => {
        if (Array.isArray(value)) return value.flatMap(normalizarImagenes);
        if (!value || typeof value !== 'object') return [];
        if (value.data !== undefined) return normalizarImagenes(value.data);
        if (value.attributes) return normalizarImagenes(value.attributes);
        return typeof value.url === 'string' ? [value] : [];
    };
    const imagenes = normalizarImagenes(record.Hero ?? record.hero ?? []);
    const ordenarImagenes = (orden: string[]) =>
        orden
            .map((nombre) => imagenes.find((imagen: { name?: string; url?: string }) => imagen.name === nombre)?.url ?? null)
            .filter((url: string | null): url is string => Boolean(url));
    const carros = imagenes.find((imagen: { name?: string }) => !/^\d+\.png$/i.test(imagen.name ?? ''));

    return {
        carros: carros?.url ?? null,
        marcas: ordenarImagenes(['1.png', '2.png', '3.png', '4.png', '5.png']),
    };
}

export async function getContactpage() {

    const response = await fetch(`${API}/contactopages?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener contactform");
    }

    const data = await response.json();
    const paginas = data.data ?? [];
    const contactform = paginas.find((pagina: { contactform?: Array<{ name?: string }> }) =>
        pagina.contactform?.some((imagen) => imagen.name === 'fondo_carro_rojo.webp'),
    ) ?? paginas[0];
    const imagenes = contactform?.contactform ?? [];
    const carroRojoPartido = imagenes.find((imagen: { name?: string }) =>
        imagen.name === 'carro_rojo_partido.webp'
    );
    const fondoCarroRojo = imagenes.find((imagen: { name?: string }) =>
        imagen.name === 'fondo_carro_rojo.webp'
    );

    return {
        carroRojoPartido: carroRojoPartido?.url ?? null,
        fondoCarroRojo: fondoCarroRojo?.url ?? null,
    };

}

/** Imágenes del mosaico inicial de contacto, en el orden definido en Strapi. */
export async function getContactHeroImages(): Promise<string[]> {
    const response = await fetch(`${API}/contactopages?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener las imágenes del hero de contacto");
    }

    const data = await response.json();
    const contactPage = (data.data ?? []).find(
        (page: { Herocontact?: Array<{ name?: string; url?: string }> }) =>
            Array.isArray(page.Herocontact) && page.Herocontact.length > 0,
    );
    const imagenes: Array<{ name?: string; url?: string }> = contactPage?.Herocontact ?? [];

    return ['1.webp', '2.webp', '3.webp', '4.webp']
        .map((nombre) => imagenes.find((imagen) => imagen.name === nombre)?.url)
        .filter((url): url is string => Boolean(url))
        .map(getStrapiAssetUrl);
}
