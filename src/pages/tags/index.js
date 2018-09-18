import React from "react";
import { Link, graphql } from 'gatsby'
import Helmet from "react-helmet";

// Utilities
import kebabCase from "lodash/kebabCase";

// Components
import Layout from '../../components/layout'

class TagsPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const siteDescription = this.props.data.site.siteMetadata.description;
    const group = this.props.data.allMarkdownRemark.group;

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'es' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <h1>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default TagsPage;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
