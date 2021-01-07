import { POKEMON_API_URL, getAllPokemons, getSpecificPokemon } from './pokemon';

describe('pokemon service', () => {
  it('should have the poke api url', () => {
    expect(POKEMON_API_URL).toBeDefined();
    expect(POKEMON_API_URL.length).toBeGreaterThan(0);
  });

  it('should fetch pokemons', async () => {
    const result = await getAllPokemons(35, 0);

    expect(result).toBeDefined();
    expect(result.pokemons.length).toBeGreaterThan(0);
  });

  it('should fetch a Pikachu', async () => {
    const result = await getSpecificPokemon('pikachu');

    expect(result).toBeDefined();
    expect(result.pokemon).toBeDefined();
    expect(result.pokemon?.name).toBe('pikachu');
  });
});
