import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chip: {
    cursor: 'inherit',
    color: '#ffffff',
    marginRight: 8,
    textTransform: 'capitalize',
  },
});

const TypeChips = ({ types }) => {
  const classes = useStyles();
  const sortedTypes = types.sort((a, b) => a.slot - b.slot);

  return (
    <>
      {sortedTypes.map((type) => (
        <Chip
          key={type.name}
          className={clsx(classes.chip, type.name)}
          label={type.name}
        />
      ))}
    </>
  );
};

TypeChips.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default TypeChips;
