import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
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
  listLarge: {
    flex: 1,
  },
  listItem,
  listItemActive,
  pokeball: {
    transform: 'rotate(45deg)',
  },
});

const DrawerConent = () => {
  const classes = useStyles();
  const data = useStaticQuery(
    graphql`
      query SiteVersionQuery {
        site {
          siteMetadata {
            version
          }
        }
      }
    `,
  );

  return (
    <>
      <List component="nav" className={classes.listLarge}>
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

      <List>
        <ListItem>
          <ListItemText primary="App version:" />
          <ListItemSecondaryAction>
            {`v${data.site.siteMetadata.version}`}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </>
  );
};

export default DrawerConent;
