import React from 'react';
import { Link } from 'gatsby';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { marginRight, padding } from '../styles/pages.styled';

const useStyles = makeStyles({
  marginRight,
  padding,
});

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO />

      <main className={classes.padding}>
        <Button
          className={classes.marginRight}
          color="primary"
          component={Link}
          size="large"
          to="/pokemon/"
          variant="contained"
        >
          Pokemon
        </Button>
        <Button
          className={classes.marginRight}
          color="primary"
          component={Link}
          size="large"
          to="/types/"
          variant="contained"
        >
          Types
        </Button>
      </main>
    </Layout>
  );
};

export default IndexPage;
