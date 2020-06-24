import React from 'react';
import { Link } from 'gatsby';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Block as BlockIcon,
  Equalizer as EqualizerIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { listItem, listItemActive } from '../styles/list.styled';

const useStyles = makeStyles({
  listItem,
  listItemActive,
  pokeball: {
    transform: 'rotate(45deg)',
  },
});

const DrawerConent = () => {
  const classes = useStyles();

  return (
    <List component="nav">
      <ListItem
        button
        to="/"
        activeClassName={classes.listItemActive}
        className={classes.listItem}
        component={Link}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        to="/pokemon/"
        activeClassName={classes.listItemActive}
        className={classes.listItem}
        component={Link}
      >
        <ListItemIcon>
          <BlockIcon className={classes.pokeball} />
        </ListItemIcon>
        <ListItemText primary="Pokemon" />
      </ListItem>
      <ListItem
        button
        to="/types/"
        activeClassName={classes.listItemActive}
        className={classes.listItem}
        component={Link}
      >
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Types" />
      </ListItem>
    </List>
  );
};

export default DrawerConent;
