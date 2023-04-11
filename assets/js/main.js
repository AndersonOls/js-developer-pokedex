const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" type="button" data-bs-toggle="modal" data-bs-target="#modal${pokemon.name}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>

        <div class="modal fade" id="modal${pokemon.name}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content pokemon ${pokemon.type}">
            <div class="modal-header gap-3">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text">
                <div class="img d-flex flex-column justify-content-center align-items-center">
                    <img class="img-modal" src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Informações: </h5>
                    <hr>
                </div>
                <div class ="infos">
                    <p>Altura: ${pokemon.height / 10} m </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    `

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})