import { getSpecificPokemon } from '@services/pokemon';
import { GetServerSideProps, NextPage } from 'next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import capitalize from '@material-ui/core/utils/capitalize';
import PokemonSprites from '@components/PokemonSprites';
import PokemonType from '@components/PokemonType';
import GetSpecificPokemon from '@services/interfaces/GetSpecificPokemon';

export const getServerSideProps: GetServerSideProps<GetSpecificPokemon> = async (context) => {
  const pokemonId = context.query.id as string;
  const pokemon = await getSpecificPokemon(pokemonId);

  return {
    props: pokemon,
  };
};

const SpecificPokemnon: NextPage<GetSpecificPokemon> = ({ errorMessage, pokemon }) => {
  if (pokemon) {
    return (
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid container item xs={12} md={3} spacing={2}>
            <Grid item xs={6} md={12}>
              <PokemonSprites name="Normal" front={pokemon.sprites.front_default} back={pokemon.sprites.back_default} />
            </Grid>
            <Grid item xs={6} md={12}>
              <PokemonSprites name="Shiny" front={pokemon.sprites.front_shiny} back={pokemon.sprites.back_shiny} />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={9} spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">Pokedex Number</Typography>
              <Typography>{pokemon.order}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">Name</Typography>
              <Typography>{capitalize(pokemon.name)}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">Height</Typography>
              <Typography>{pokemon.height}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">Weight</Typography>
              <Typography>{pokemon.weight}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Types</Typography>
              {pokemon.types.map((pokemonType) => (
                <PokemonType key={pokemonType.type.name} type={pokemonType.type.name} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box mt={3}>
      <Alert severity="error">{errorMessage}</Alert>
    </Box>
  );
};

export default SpecificPokemnon;
