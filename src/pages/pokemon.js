import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PokemonCard from '../components/pokemon-card';
import { cardContainer } from '../styles/pages.styled';
import { list } from '../styles/list.styled';

const useStyles = makeStyles({
  cardContainer,
  list,
});

const PokemonPage = ({ data }) => {
  const classes = useStyles();
  const { species } = data;
  // console.log(species.nodes);

  return (
    <Layout maxWidth="xl">
      <SEO title="Pokemon" />

      <ul className={clsx(classes.cardContainer, classes.list)}>
        {species.nodes.map((pokemon) => (
          <PokemonCard key={pokemon.order} species={pokemon} />
        ))}
      </ul>
    </Layout>
  );
};

PokemonPage.propTypes = {
  data: PropTypes.shape({
    species: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          order: PropTypes.number,
          varieties: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              is_default: PropTypes.bool,
              name: PropTypes.string,
              sprites: PropTypes.shape({
                front_default: PropTypes.string,
              }),
              types: PropTypes.arrayOf(
                PropTypes.shape({
                  type: PropTypes.shape({
                    name: PropTypes.string,
                  }),
                }),
              ),
            }),
          ),
        }),
      ),
    }),
  }).isRequired,
};

export default PokemonPage;

export const pageQuery = graphql`
  query {
    species: allPokeapiPokemon {
      nodes {
        name
        order
        varieties {
          id
          is_default
          name
          sprites {
            front_default
          }
          types {
            type {
              name
            }
          }
        }
      }
    }
  }
`;
