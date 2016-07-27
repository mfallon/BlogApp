import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  // use lifecycle method to fetch url whenever path changes
  componentWillMount() {
    // our connect function gives access to fetchPosts now
    this.props.fetchPosts();
  }


  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`posts/${post.id}`}>
          <strong>{post.title}</strong>
          <span className="pull-xs-right">{post.categories}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// now add in fetching our posts
function mapStateToProps(state) {
  return {
    posts: state.posts.all
  };
}

// usually our first argument to connect function is mapStateToProps. We don't have that right now so just map DispatchToProps. Add later.
// update: instead of padding in mapDispatchToProps, we can just provide the fechPosts in an object with key - provides a shortcut
// es6 pattern "Property Shorthand" : when object has key name that matches the object/function name that you are assigningue, no need to do { fetchPosts: fetchPosts }
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);

