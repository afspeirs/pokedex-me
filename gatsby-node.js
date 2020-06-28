/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require('axios');
const createNodeHelpers = require('gatsby-node-helpers').default;
const path = require('path');
require('dotenv').config({ path: '.env' });

const get = (endpoint, url = 'https://pokeapi.co/api/v2') => axios.get(`${url}${endpoint}`);

const getPokemonData = (array) => Promise.all(
  array.map(async (url) => {
    const { data: pokemon } = await get(url, '');
    const { data: evolutionChain } = await get(pokemon.evolution_chain.url, '');
    const varieties = await Promise.all(
      pokemon.varieties.map(async ({ pokemon: { name: variety } }) => {
        const { data } = await get(`/pokemon/${variety}`);
        return data;
      }),
    );

    return {
      ...pokemon,
      evolution_chain: evolutionChain,
      varieties,
    };
  }),
);

const getTypesData = (array) => Promise.all(
  array.map(async (url) => {
    const { data: type } = await get(url, '');
    return type;
  }),
);

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;
  const { createNodeFactory } = createNodeHelpers({ typePrefix: 'Pokeapi' });
  const preparePokemonNode = createNodeFactory('Pokemon');
  const prepareTypeNode = createNodeFactory('Types');

  const limit = process.env.GATSBY_POKEMON_LIMIT || 1000;

  // Get all our pokemon data
  const { data: allPokemonInfo } = await get(`/pokemon-species?limit=${limit}`);
  const allPokemon = allPokemonInfo.results.map((pokemon) => pokemon.url);
  const allPokemonData = await getPokemonData(allPokemon);

  // Get all our type data
  const { data: allTypesInfo } = await get('/type');
  const allTypes = allTypesInfo.results.map((p) => p.url);
  const allTypesData = await getTypesData(allTypes);

  // Process data into nodes using our helper.
  allPokemonData.forEach((pokemon) => createNode(preparePokemonNode(pokemon)));
  allTypesData.forEach((Type) => createNode(prepareTypeNode(Type)));
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pokemonPostTemplate = path.resolve('src/templates/pokemon-post.js');
  const typePostTemplate = path.resolve('src/templates/type-post.js');

  const result = await graphql(`
    {
      species: allPokeapiPokemon {
        nodes {
          name
        }
      }
      types: allPokeapiTypes {
        nodes {
          name
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Create pokemon post pages.
  result.data.species.nodes.forEach((node) => {
    createPage({
      component: pokemonPostTemplate,
      path: `/pokemon/${node.name}/`,
      context: {
        slug: node.name,
      },
    });
  });
  // Create type post pages.
  result.data.types.nodes.forEach((node) => {
    createPage({
      component: typePostTemplate,
      path: `/types/${node.name}/`,
      context: {
        slug: node.name,
      },
    });
  });
};
