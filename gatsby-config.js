require('dotenv').config({ path: '.env' });

const config = require('gatsby-plugin-config').default;

console.log(config);

const {
  npm_package_author_name: author,
  npm_package_description: description,
  npm_package_version: version,
} = config;

// const author = config.npm_package_author_name;
// const description = config.npm_package_description;
// const version = config.npm_package_version;

module.exports = {
  siteMetadata: {
    author,
    description,
    title: 'PokedexMe',
    version,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'PokedexMe',
        short_name: 'PokedexMe',
        description,
        start_url: '/',
        background_color: '#ee1515',
        theme_color: '#ee1515',
        display: 'standalone',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
  ],
};
