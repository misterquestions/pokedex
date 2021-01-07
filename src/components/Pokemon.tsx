import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import PokemonResource from '@services/interfaces/pokemon/Pokemon';
import { capitalize } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      cursor: 'pointer',
    },
    imageContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    imageElement: {
      width: '100%',
    },
  })
);

const Pokemon: React.FC<PokemonResource> = ({ id, sprites, name }) => {
  const classes = useStyles();

  return (
    <Link href={`/pokemon/${id}`}>
      <Card className={classes.root} elevation={3}>
        <div className={classes.imageContainer}>
          <img className={classes.imageElement} src={sprites.other?.['official-artwork'].front_default} alt={name} />
        </div>
        <Typography variant="subtitle1">{capitalize(name)}</Typography>
      </Card>
    </Link>
  );
};

export default Pokemon;
