import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './navigation';
import theme from '../theme';
import '../styles/main.css';

const Layout = ({ children, title }) => {
  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <StylesProvider injectFirst>
        <Navigation title={title} />

        {children}
      </StylesProvider>
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  title: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Layout;
