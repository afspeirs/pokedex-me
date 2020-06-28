const description = 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.';
const version = '0.2.0';

module.exports = {
  siteMetadata: {
    author: 'AFSpeirs',
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
