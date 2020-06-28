# PokedexMe

[![Netlify Status](https://api.netlify.com/api/v1/badges/cfc72934-dc51-48e1-8e71-9d1ee57706a0/deploy-status)](https://app.netlify.com/sites/pokedex-me/deploys)
![GitHub package.json version](https://img.shields.io/github/package-json/v/afspeirs/pokedex-me)
[![LICENSE](https://img.shields.io/github/license/afspeirs/pokedex-me)](LICENSE)

View information about Pokemon with this PWA

## Configuration

Create a `.env` file with the following variables:

```plaintext
GATSBY_POKEMON_LIMIT=50
```

The Pokemon Limit variable will limit how many pokemon are requested from [PokeAPI](https://pokeapi.co/). If this variable does not exist it will try a get them all.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Your site is now running at `http://localhost:8000`!

_Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

Save your changes and the browser will update in real time!

### `npm run build`

Builds the app for production to the `public` folder.
