import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

interface PokemonSpritesProps {
  name: string;
  front: string;
  back: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    name: {
      marginTop: theme.spacing(1),
    },
    sprites: {
      display: 'flex',
    },
  })
);

const PokemonSprites: React.FC<PokemonSpritesProps> = ({ name, front, back }) => {
  const classes = useStyles();

  return (
    <Card elevation={2}>
      <div className={classes.root}>
        <Typography className={classes.name}>{name}</Typography>
        <div className={classes.sprites}>
          <img src={front} alt={`${name} front`} />
          <img src={back} alt={`${name} back`} />
        </div>
      </div>
    </Card>
  );
};

export default PokemonSprites;
