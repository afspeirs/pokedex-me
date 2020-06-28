const activeColor = 'rgba(0, 0, 0, 0.15)';

export const list = {
  margin: 0,
  padding: 0,
};

export const listItem = {
  '&:hover, &.active': {
    backgroundColor: activeColor,
  },
};

export const listItemActive = {
  backgroundColor: activeColor,
};

export const pokeball = {
  transform: 'rotate(45deg)',
};
