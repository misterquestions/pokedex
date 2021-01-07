import { GetStaticProps, NextPage } from 'next';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import React from 'react';
import debounce from 'lodash.debounce';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import GetAllPokemons from '@services/interfaces/GetAllPokemons';
import { getAllPokemons } from '@services/pokemon';
import Pokemon from '@components/Pokemon';

export const getStaticProps: GetStaticProps<GetAllPokemons> = async () => {
  const props = await getAllPokemons(35, 0);

  return {
    props,
  };
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    loadingContainer: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const IndexPage: NextPage<GetAllPokemons> = ({
  errorMessages: initialErrorMessages,
  pokemons: initialPokemons,
  newOffset: initialOffset,
}) => {
  const [errorMessages, setErrorMessages] = React.useState(initialErrorMessages);
  const [pokemons, setPokemons] = React.useState(initialPokemons);
  const [loadOffset, setLoadOffset] = React.useState(initialOffset);
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const classes = useStyles();

  React.useEffect(() => {
    const handleScroll = debounce(async () => {
      if (loadingStatus || loadOffset === -1) return;

      if (containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
        // Display loading spinner
        setLoadingStatus(true);

        // Actual fetch process
        const result = await getAllPokemons(35, loadOffset);

        setErrorMessages([...errorMessages, ...result.errorMessages]);
        setPokemons([...pokemons, ...result.pokemons]);
        setLoadOffset(result.newOffset);

        // Remove loading spinner
        setLoadingStatus(false);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingStatus, errorMessages, pokemons, loadOffset]);

  return (
    <Container ref={containerRef}>
      {errorMessages.map((message) => (
        <Alert key={message} severity="error">
          {message}
        </Alert>
      ))}
      <Grid className={classes.root} container spacing={2}>
        {pokemons?.map((pokemon) => (
          <Grid item key={pokemon.name} xs={6} md={4} lg={3}>
            <Pokemon {...pokemon} />
          </Grid>
        ))}
        {loadingStatus && (
          <Grid item xs={6} md={4} lg={3}>
            <div className={classes.loadingContainer}>
              <CircularProgress />
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default IndexPage;
