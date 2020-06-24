/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require('axios');
const createNodeHelpers = require('gatsby-node-helpers').default;
const path = require('path');

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
  const prepareEvolutionNode = createNodeFactory('Evolution');
  const preparePokemonNode = createNodeFactory('Pokemon');
  const prepareTypeNode = createNodeFactory('Types');

  // Get all our pokemon data
  const { data: allPokemonInfo } = await get('/pokemon-species?limit=1000');
  // const allPokemon = allPokemonInfo.results.map((p) => p.url);
  const allPokemon = allPokemonInfo.results.map((p) => p.url).slice(0, 151);
  const allPokemonData = await getPokemonData(allPokemon);

  // Get all our type data
  const { data: allTypesInfo } = await get('/type');
  const allTypes = allTypesInfo.results.map((p) => p.url);
  const allTypesData = await getTypesData(allTypes);

  // Process data for each pokemon into Gatsby node format
  const processPokemon = (pokemon) => {
    // Create the "Pokemon" node for given pokemon
    const pokemonNode = preparePokemonNode(pokemon);

    // Set up each evolution as a node
    const evolutionNodes = prepareEvolutionNode(pokemon.evolution_chain);
    createNode(evolutionNodes);
    // Attach an array of "Evolution" node ids to 'evolution_chain___NODE' in the Pokémon
    pokemonNode.evolution_chain___NODE = evolutionNodes.id;

    return pokemonNode;
  };

  // Process data for each type into Gatsby node format
  const processType = (type) => {
    // Create the "Type" node for given pokemon
    const typeNode = prepareTypeNode(type);
    return typeNode;
  };

  // Process data into nodes using our helper.
  allPokemonData.forEach((pokemon) => createNode(processPokemon(pokemon)));
  allTypesData.forEach((Type) => createNode(processType(Type)));
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
