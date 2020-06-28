import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './navigation';
import theme from '../theme';
import '../styles/main.css';

const Layout = ({ children, maxWidth, navTitle }) => {
  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <Navigation title={navTitle} />
        <Container component="main" maxWidth={maxWidth}>
          {children}
        </Container>
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
