/* eslint-disable camelcase */
import PokemonDreamWorldSprite from './PokemonDreamWorldSprite';
import PokemonOfficialArtworkSprite from './PokemonOfficialArtworkSprite';

export default interface PokemonOtherSprites {
  dream_world?: PokemonDreamWorldSprite;
  'official-artwork': PokemonOfficialArtworkSprite;
}
