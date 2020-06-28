import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import {
  AppBar,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import DrawerContent from './drawer-content';
import {
  drawer,
  drawerPaper,
  menuButton,
  titleArea,
} from '../styles/navigation.styled';

const useStyles = makeStyles({
  drawer,
  drawerPaper,
  menuButton,
  titleArea,
});

const Navigation = ({ title }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const data = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.titleArea}>
            {title || data.site.siteMetadata.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        variant="temporary"
        anchor="left"
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerContent />
      </SwipeableDrawer>
    </>
  );
};

Navigation.defaultProps = {
  title: '',
};

Navigation.propTypes = {
  title: PropTypes.string,
};

export default Navigation;
