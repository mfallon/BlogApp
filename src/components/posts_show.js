import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
  componentWillMount() {
    // where will our post id come from?
    this.props.fetchPost(this.props.params.id);
  }
  // make use of context to navigate back to /
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(
        () => {
          this.context.router.push('/');       
        }
      );;
  }



  render() {
    const { post } = this.props;

    if(!post) {
      return (
        <div>
          <Link to="/" className="">Back to Posts</Link>
          <div>
            Post not found.
          </div>
        </div>
      );
    }

    return (
      <div>
        <Link to="/" className="">Back to Posts</Link>
        <button className="btn btn-danger pull-xs-right" type="submit" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
        <div>
          <h3>
          {post.title}
          </h3>
          <h6>Categories:
          {post.categories}
          </h6>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
