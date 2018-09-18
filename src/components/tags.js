import React from 'react'
import { Link } from 'gatsby'
import kebabCase from "lodash/kebabCase";

class Tags extends React.Component {
  render() {
    const { tags } = this.props;
    return (
      tags.map(tag => (
        <span>
          &nbsp;
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </span>
      ))
    )
  }
}

export default Tags
