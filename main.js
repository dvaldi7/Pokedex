const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const URL = "https://pokeapi.co/api/v2/pokemon/";


async function fetchAndDisplayPokemon() {
    listaPokemon.innerHTML = "";
    const pokemonPromises = [];

    for (let i = 1; i <= 151; i++) {

        pokemonPromises.push(fetch(URL + i).then(response => response.json()));
    }

    try {

        const allPokemonData = await Promise.all(pokemonPromises);

        allPokemonData.sort((a, b) => a.id - b.id);

        allPokemonData.forEach(pokemon => mostrarPokemon(pokemon));
    } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
    }
}

fetchAndDisplayPokemon();



botonesHeader.forEach(boton => boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    const pokemonPromises = [];
    for (let i = 1; i <= 151; i++) {

        pokemonPromises.push(fetch(URL + i).then(response => response.json()));
    }

    try {

        const allPokemonData = await Promise.all(pokemonPromises);

        allPokemonData.sort((a, b) => a.id - b.id);

        allPokemonData.forEach(data => {
            if (botonId === "ver-todos") {
                mostrarPokemon(data);
            } else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
            }
        });
    } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
    }
}));


function mostrarPokemon(poke) {

    let tipos = poke.types.map(type =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join("");

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    }
    else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    let pokeWeight = poke.weight.toString().split("");
    if (pokeWeight.length === 4) {
        pokeWeight = pokeWeight[0] + pokeWeight[1] + pokeWeight[2] + "," + pokeWeight[3];
    }
    else if (pokeWeight.length === 3) {
        pokeWeight = pokeWeight[0] + pokeWeight[1] + "," + pokeWeight[2];
    }

    let pokeHeight = poke.height.toString().split("");
    if (pokeHeight.length === 1) {
        pokeHeight = "0" + "," + pokeHeight[0];
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-img">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                 <p class="pokemon-id">#${pokeId}</p>
                 <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                 ${tipos}
            </div>
            <div class="pokemon-stats">
                 <p class="stat">${pokeHeight} m</p>
                 <p class="stat">${pokeWeight} Kg</p>
            </div>
        </div>
        `;
    listaPokemon.append(div);
}