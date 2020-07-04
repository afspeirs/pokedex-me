const packageJson = require('./package.json');

module.exports = {
  siteMetadata: {
    author: 'AFSpeirs',
    description: packageJson.description,
    title: 'PokedexMe',
    version: packageJson.version,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'PokedexMe',
        short_name: 'PokedexMe',
        description: packageJson.description,
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
