import React, { Component } from 'react';
import { Link } from 'react-router';

class PostsShow extends Component {
  render() {
    return (
      <div>
        <Link to="/" className="">Back to Posts</Link>
        Showinga post right here {this.props.params.id}.
      </div>
    );
  }
}

export default PostsShow;
