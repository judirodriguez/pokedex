const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonType = document.querySelector('.pokemon__type');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Llama a la API para obtener la información del Pokémon y devuelve los datos obtenidos.
const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

//traducciones de tipos de pokemon 
const typeTranslations = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
};


// Permite mostrar la información del Pokémon obtenida desde fetchPokemon
const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = 'Cargando...';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonWeight.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        const typeName = data.types[0].type.name;
        const typeTranslation = typeTranslations[typeName] || typeName;
        pokemonType.innerHTML = `Tipo: ${typeTranslation}`;
        pokemonWeight.innerHTML = `Peso: ${data.weight / 10} kg`;
        pokemonImage.src =
            data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'No encontrado :c';
        pokemonNumber.innerHTML = '';
        pokemonType.innerHTML = '';
        pokemonWeight.innerHTML = '';
    }
};

// Evita que recargue la página al hacer enter y llama a la función renderPokemon para mostrar los nuevos datos
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Pasa al Pokémon anterior si es mayor que 1
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Pasa al siguiente Pokémon incrementando en 1 el valor
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Cambia a mayuscula la primera letra de una cadena
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

renderPokemon(searchPokemon);