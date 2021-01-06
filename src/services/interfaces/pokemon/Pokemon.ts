/* eslint-disable camelcase */
import PokemonSprites from '../sprite/PokemonSprites';
import PokemonTypeResource from '../type/PokemonTypeResource';

export default interface Pokemon {
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  sprites: PokemonSprites;
  types: Array<PokemonTypeResource>;
  weight: number;
}
