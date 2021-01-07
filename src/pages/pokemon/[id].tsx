import { getSpecificPokemon } from '@services/pokemon';
import { GetServerSideProps, NextPage } from 'next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import GetSpecificPokemon from '@services/interfaces/GetSpecificPokemon';

export const getServerSideProps: GetServerSideProps<GetSpecificPokemon> = async (context) => {
  const pokemonId = context.query.id as string;
  const pokemon = await getSpecificPokemon(pokemonId);

  return {
    props: pokemon,
  };
};

const useStyles = makeStyles((theme) =>
  createStyles({
    error: {
      marginTop: theme.spacing(2),
    },
  })
);

const SpecificPokemnon: NextPage<GetSpecificPokemon> = ({ errorMessage, pokemon }) => {
  const classes = useStyles();

  if (pokemon) {
    return <Grid container>Hello</Grid>;
  }

  return (
    <Alert className={classes.error} severity="error">
      {errorMessage}
    </Alert>
  );
};

export default SpecificPokemnon;
