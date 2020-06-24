import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'gatsby';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import missingno from '../images/missingno.png';
import TypeChip from './type-chips';
import {
  card,
  cardAction,
  content,
  cover,
  details,
  flexAuto,
  typeContainer,
} from '../styles/card.styled';

const useStyles = makeStyles({
  card,
  cardAction,
  content,
  cover,
  details,
  flexAuto,
  typeContainer,
});

const PokemonCard = ({ species }) => {
  const classes = useStyles();
  const pokemon = species.varieties.find((variety) => variety.is_default);
  const types = pokemon.types.map((type) => type.type);
  // console.log(pokemon);

  return (
    <Card className={classes.card} component="li">
      <CardActionArea
        className={classes.cardAction}
        component={Link}
        to={`/pokemon/${species.name}`}
      >
        <div className={classes.details}>
          <CardContent className={clsx(classes.content, classes.flexAuto)}>
            <Typography variant="subtitle1" color="textSecondary">
              {`#${String(pokemon.id).padStart(3, '0')}`}
            </Typography>
            <Typography component="h5" variant="h5">
              {species.name}
            </Typography>
          </CardContent>
          <div className={classes.typeContainer}>
            <TypeChip types={types} />
          </div>
        </div>
        <CardMedia
          component="img"
          className={classes.cover}
          src={pokemon.sprites.front_default || missingno}
          alt={species.name}
        />
      </CardActionArea>
    </Card>
  );
};

PokemonCard.propTypes = {
  species: PropTypes.instanceOf(Object).isRequired,
};

export default PokemonCard;
