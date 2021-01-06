import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PokemonResource from '@services/interfaces/pokemon/Pokemon';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    imageContainer: {
      padding: theme.spacing(8),
      display: 'flex',
      alignItems: 'center',
    },
    imageElement: {
      width: '100%',
    },
  })
);

const Pokemon: React.FC<PokemonResource> = ({ sprites, name }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <div className={classes.imageContainer}>
        <img className={classes.imageElement} src={sprites.other?.['official-artwork'].front_default} alt={name} />
      </div>
      <Typography>{name}</Typography>
    </Card>
  );
};

export default Pokemon;
