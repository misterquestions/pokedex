import MultipleError from './MultipleError';
import Pokemon from './pokemon/Pokemon';

type GetAllPokemons = MultipleError & {
  pokemons?: Array<Pokemon>;
  newOffset?: number | null;
};

export default GetAllPokemons;
