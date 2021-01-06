import Pokemon from './pokemon/Pokemon';
import SingleError from './SingleError';

type GetSpecificPokemon = SingleError & { pokemon?: Pokemon };

export default GetSpecificPokemon;
