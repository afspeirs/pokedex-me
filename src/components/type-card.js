import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'gatsby';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  card,
  cardAction,
  content,
} from '../styles/card.styled';

const useStyles = makeStyles((theme) => ({
  card: {
    ...card,
    color: theme.palette.background.default,
  },
  cardAction,
  content,
}));

const TypeCard = ({ type }) => {
  const classes = useStyles();
  // console.log(type);

  return (
    <Card className={clsx(classes.card, type.name)} component="li">
      <CardActionArea
        className={classes.cardAction}
        component={Link}
        to={`/types/${type.name}`}
      >
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h4">
            {type.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

TypeCard.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default TypeCard;
