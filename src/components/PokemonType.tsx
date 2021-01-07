import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Chip from '@material-ui/core/Chip';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import GrainIcon from '@material-ui/icons/Grain';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import capitalize from '@material-ui/core/utils/capitalize';

interface PokemonTypeProps {
  type: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0.5),
    },
  })
);

const PokemonType: React.FC<PokemonTypeProps> = ({ type }) => {
  const classes = useStyles();
  let chipIcon: JSX.Element;

  switch (type) {
    case 'electric':
      chipIcon = <FlashOnIcon />;
      break;

    case 'fire':
      chipIcon = <WhatshotIcon />;
      break;

    case 'flying':
      chipIcon = <FlightTakeoffIcon />;
      break;

    case 'ground':
      chipIcon = <GrainIcon />;
      break;

    default:
      chipIcon = <HelpOutlineIcon />;
      break;
  }

  return <Chip className={classes.root} icon={chipIcon} label={capitalize(type)} color="primary" variant="outlined" />;
};

export default PokemonType;
