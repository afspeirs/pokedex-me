import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TypeCard from '../components/type-card';
import { cardContainer } from '../styles/pages.styled';
import { list } from '../styles/list.styled';

const useStyles = makeStyles({
  cardContainer,
  list,
});

const TypesPage = ({ data }) => {
  const classes = useStyles();
  const { types } = data;
  // console.log(types);

  return (
    <Layout maxWidth="xl">
      <SEO title="Pokemon" />

      <ul className={clsx(classes.cardContainer, classes.list)}>
        {types.nodes.map((type) => (
          <TypeCard key={type.name} type={type} />
        ))}
      </ul>
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
