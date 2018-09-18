import React from "react";
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

// Components
import Layout from '../components/layout'

class TagsTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const siteDescription = this.props.data.site.siteMetadata.description;
    const { tag } = this.props.pageContext;
    const { edges, totalCount } = this.props.data.allMarkdownRemark;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } con el tag "${tag}"`;

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'es' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${tag} | ${siteTitle}`}
        />
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            );
          })}
        </ul>
        {/*
          This links to a page that does not yet exist.
          We'll come back to it!
        */}
        <Link to="/tags">Todos los tags</Link>
      </Layout>
    );
  }
}

export default TagsTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
