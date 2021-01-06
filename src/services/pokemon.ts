import axios from 'axios';
import GetAllPokemons from './interfaces/GetAllPokemons';
import GetSpecificPokemon from './interfaces/GetSpecificPokemon';
import Pokemon from './interfaces/pokemon/Pokemon';
import QueryMultipleResources from './interfaces/QueryMultipleResources';

const POKEMON_API_URL = process.env.NEXT_PUBLIC_POKEMON_API_URL || '';

const queryResourceFromUrl = async <T>(resourceUrl: string): Promise<T> => {
  const { data, status, statusText } = await axios.get<T>(resourceUrl);

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data;
};

const queryMultipleResources = async (
  resourceName: string,
  limit?: number,
  offset?: number
): Promise<QueryMultipleResources> => {
  const requestURL = new URL(resourceName, POKEMON_API_URL);

  if (limit) {
    requestURL.searchParams.append('limit', limit.toString());
  }

  if (offset) {
    requestURL.searchParams.append('offset', offset.toString());
  }

  const result = await queryResourceFromUrl<QueryMultipleResources>(requestURL.toString());

  return result;
};

export const getSpecificPokemon = async (pokemonId: number): Promise<GetSpecificPokemon> => {
  let response: GetSpecificPokemon;

  try {
    const requestURL = new URL(`/pokemon/${pokemonId}`, POKEMON_API_URL);
    const pokemon = await queryResourceFromUrl<Pokemon>(requestURL.toString());

    response = { pokemon };
  } catch (err) {
    response = { errorMessage: err };
  }

  return response;
};

export const sortPokemonsArray = (pokemons: Array<Pokemon>): Array<Pokemon> =>
  pokemons.sort((a, b) => (a.order < b.order ? -1 : 1));

export const getAllPokemons = async (limit: number, offset: number): Promise<GetAllPokemons> => {
  let response: GetAllPokemons = { newOffset: -1, pokemons: [], errorMessages: [] };

  try {
    console.log({ limit, offset });
    const { next, results } = await queryMultipleResources('pokemon', limit, offset);
    const pokemons = new Array<Pokemon>();

    // Try to fetch data of each pokemon and add it to the response
    await Promise.all(
      results.map(
        async (resource): Promise<Pokemon | null> => {
          let pokemon: Pokemon | null = null;

          try {
            pokemon = await queryResourceFromUrl<Pokemon>(resource.url);

            if (pokemon) {
              pokemons.push(pokemon);
            }
          } catch (err) {
            response.errorMessages.push(`Failed fetching pokemon ${resource.name}`);
          }

          return pokemon;
        }
      )
    );

    response.pokemons = sortPokemonsArray(pokemons);

    // If there's a next query add the offset
    if (next) {
      const nextURL = new URL(next);
      const nextURLOffset = nextURL.searchParams.get('offset');

      if (nextURLOffset) {
        response.newOffset = parseInt(nextURLOffset, 10);
      }
    }
  } catch (err) {
    response.errorMessages.push(`${err}`);
  }

  return response;
};
