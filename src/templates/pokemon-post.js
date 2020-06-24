import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TypeChip from '../components/type-chips';
import { padding } from '../styles/pages.styled';
import { imageContainer } from '../styles/images.styled';
import { capitaliseFirstLetter } from '../utils';

const useStyles = makeStyles({
  imageContainer,
  padding,
});

const PokemonPostTemplate = ({ data }) => {
  const classes = useStyles();
  const { species } = data;
  console.log(species);

  const name = capitaliseFirstLetter(species.name);
  const pokemon = species.varieties.find((variety) => variety.is_default);
  const types = pokemon.types.map((type) => type.type);
  const flavorTextEntry = species.flavor_text_entries
    .filter((entry) => entry.language.name === 'en')
    .slice(-1)[0];

  return (
    <Layout title={name}>
      <SEO
        title={name}
        description={flavorTextEntry.flavor_text}
      />

      <main className={classes.padding}>
        <div className={classes.imageContainer}>
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </div>

        {/* {pokemon.sprites && (
          <img
            src={pokemon.sprites.front_default}
            alt={name}
            width="96"
            height="96"
          />
        )} */}

        <Typography variant="subtitle1" color="textSecondary">
          {`#${String(pokemon.id).padStart(3, '0')}`}
        </Typography>
        <Typography component="h5" variant="h5">
          {name}
        </Typography>

        <TypeChip types={types} />

        <Typography variant="body2">
          {flavorTextEntry.flavor_text}
        </Typography>
      </main>
    </Layout>
  );
};

PokemonPostTemplate.propTypes = {
  data: PropTypes.shape({
    species: PropTypes.shape({
      name: PropTypes.string,
      flavor_text_entries: PropTypes.arrayOf(
        PropTypes.shape({
          flavor_text: PropTypes.string,
          language: PropTypes.shape({
            name: PropTypes.string,
          }),
          version: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
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
  }).isRequired,
};

export default PokemonPostTemplate;

export const pageQuery = graphql`
  query PokemonPostBySlug($slug: String!) {
    species: pokeapiPokemon(name: {eq: $slug}) {
      name
      flavor_text_entries {
        flavor_text
        language {
          name
        }
        version {
          name
        }
      }
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
`;
