import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles';

import Navigation from './navigation';
import theme from '../theme';
import { root, scroller } from '../styles/pages.styled';
import '../styles/main.css';

const useStyles = makeStyles((t) => ({
  navigationSpacer: t.mixins.toolbar,
  root,
  scroller,
}));

const Layout = ({ children, maxWidth, navTitle }) => {
  const classes = useStyles();
  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <div className={classes.root}>
          <Navigation title={navTitle} />
          <div className={classes.navigationSpacer} />

          <Container
            className={classes.scroller}
            component="main"
            maxWidth={maxWidth}
          >
            {children}
          </Container>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  maxWidth: 'md',
  navTitle: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  navTitle: PropTypes.string,
};

export default Layout;
