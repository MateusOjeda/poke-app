const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}/`;
const getPokemonImgUrl = id =>`https://cdn.traction.one/pokedex/pokemon/${id}.png`;

const generateHTML = (pokemons) => {
    return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name);

        accumulator += `
            <li class="card ${types[0]}">
                <img class="card-image" src="${getPokemonImgUrl(pokemon.id)}" />
                <h2>${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(" | ")}</p>
            </li>`;
        return accumulator;
    }, '');
}

const fetchPokemon = async () => {
    let pokemonPromises = []
    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then((r) => r.json()))
    }

    let pokemons = await Promise.all(pokemonPromises);

    return pokemons
};

const insertHTML = (pokeInnerHTML) => {
    const ul = document.querySelector('[data-js="pokedex"]');

    ul.innerHTML = pokeInnerHTML;
}

const buildPage = async () => {
    let pokemons = await fetchPokemon();

    pokeInnerHTML = generateHTML(pokemons);

    insertHTML(pokeInnerHTML);
}

buildPage();
