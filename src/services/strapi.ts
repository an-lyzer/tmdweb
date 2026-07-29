const API = "http://localhost:1337/api";


export async function getLogos() {
    const response = await fetch(`${API}/tmdlogos?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener logo");
    }

    const data = await response.json();

    return data.data[0]?.tmd_logo?.url ?? null;
}

export async function getHero() {

    const response = await fetch(`${API}/heroes?populate=*`);

    if (!response.ok) {
        throw new Error("Error al obtener hero");
    }

    const data = await response.json();
    const hero = data.data[0];
    return {
        heroBack: hero?.hero_back?.url ?? null,
        heroItems: hero?.hero_items?.url ?? null,
        blancoFondo: hero?.hero_white?.url ?? null,
    };

}
