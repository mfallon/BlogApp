import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
  // use lifecycle method to fetch url whenever path changes
  componentWillMount() {
    // our connect function gives access to fetchPosts now
    this.props.fetchPosts();
  }

  render() {
    return (
      <div>List of Blog Posts</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

// usually our first argument to connect function is mapStateToProps. We don't have that right now so just map DispatchToProps. Add later.
// update: instead of padding in mapDispatchToProps, we can just provide the fechPosts in an object with key - provides a shortcut
// es6 pattern "Property Shorthand" : when object has key name that matches the object/function name that you are assigningue, no need to do { fetchPosts: fetchPosts }
export default connect(null, { fetchPosts })(PostsIndex);

