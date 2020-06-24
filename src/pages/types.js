import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TypeCard from '../components/type-card';
import { cardContainer, padding } from '../styles/pages.styled';

const useStyles = makeStyles({
  cardContainer,
  padding,
});

const TypesPage = ({ data }) => {
  const classes = useStyles();
  const { types } = data;
  // console.log(types);

  return (
    <Layout>
      <SEO title="Pokemon" />

      <main className={clsx(classes.cardContainer, classes.padding)}>
        {types.nodes.map((type) => (
          <TypeCard key={type.name} type={type} />
        ))}
      </main>
    </Layout>
  );
};

TypesPage.propTypes = {
  data: PropTypes.shape({
    types: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export default TypesPage;

export const pageQuery = graphql`
  query {
    types: allPokeapiTypes {
      nodes {
        name
      }
    }
  }
`;
