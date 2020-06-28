import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/layout';
import SEO from '../components/seo';
import TypeChip from '../components/type-chips';
import { padding } from '../styles/pages.styled';
import { capitaliseFirstLetter } from '../utils';

const useStyles = makeStyles({
  padding,
});

const TypePostTemplate = ({ data }) => {
  const classes = useStyles();
  const { type } = data;
  console.log(type);

  const name = capitaliseFirstLetter(type.name);

  return (
    <Layout navTitle={name}>
      <SEO
        title={name}
        // description={post.excerpt}
      />

      <div className={classes.padding}>
        <Typography component="h5" variant="h5">
          {name}
        </Typography>

        {type.damage_relations.double_damage_from.length !== 0 && (
          <>
            <h4>Double damage from</h4>
            <TypeChip types={type.damage_relations.double_damage_from} />
          </>
        )}
        {type.damage_relations.double_damage_to.length !== 0 && (
          <>
            <h4>Double damage to</h4>
            <TypeChip types={type.damage_relations.double_damage_to} />
          </>
        )}
        {type.damage_relations.half_damage_from.length !== 0 && (
          <>
            <h4>Half damage from</h4>
            <TypeChip types={type.damage_relations.half_damage_from} />
          </>
        )}
        {type.damage_relations.half_damage_to.length !== 0 && (
          <>
            <h4>Half damage to</h4>
            <TypeChip types={type.damage_relations.half_damage_to} />
          </>
        )}
        {type.damage_relations.no_damage_from.length !== 0 && (
          <>
            <h4>No damage from</h4>
            <TypeChip types={type.damage_relations.no_damage_from} />
          </>
        )}
        {type.damage_relations.no_damage_to.length !== 0 && (
          <>
            <h4>No damage to</h4>
            <TypeChip types={type.damage_relations.no_damage_to} />
          </>
        )}
      </div>
    </Layout>
  );
};

TypePostTemplate.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.shape({
      name: PropTypes.string,
      damage_relations: PropTypes.shape({
        double_damage_from: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
        double_damage_to: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
        half_damage_from: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
        half_damage_to: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
        no_damage_from: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
        no_damage_to: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }),
        ),
      }),
    }),
  }).isRequired,
};

export default TypePostTemplate;

export const pageQuery = graphql`
  query TypePostBySlug($slug: String!) {
    type: pokeapiTypes(name: {eq: $slug}) {
      name
      damage_relations {
        double_damage_from {
          name
        }
        double_damage_to {
          name
        }
        half_damage_from {
          name
        }
        half_damage_to {
          name
        }
        no_damage_from {
          name
        }
        no_damage_to {
          name
        }
      }
    }
  }
`;
