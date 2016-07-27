import React, { Component, PropTypes } from 'react';
// works almost exactly like react connect
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  // to navigate through our app programmatically (i.e. without a Link)
  // we need access to our router
  // normally we don't want to be accessing context, but only when it's to do with router
  // this allows us to search the parent hierarchy for an object 'router' and access it
  static contextTypes = {
    router: PropTypes.object
  };

  // because we want access to router, our own handler for handleSubmit
  onSubmit(props) {
    // this context is bound to caller
    this.props.createPost(props)
      .then(() => {
        // as createPost returns a promise, we can chain success code on here
        // blog post created, navigate user to the index
        // this is now available through this.context
        this.context.router.push('/');
      });;
  }

  render() {
    // react-form is injecting props into this compponetn through this.props
    const {fields: {title, categories, content}, handleSubmit} = this.props;

    // handleSubmit function should accept an action creator so we can intercept the submit and perform validation
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <h3>
          Create a new Post
        </h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>
            Title
          </label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            { title.touched ? title.error : '' }
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>
            Categories 
          </label>
          <input type="text" className="form-control" {...categories}/>
          <div className="text-help">
            { categories.touched ? categories.error : '' }
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>
            Content 
          </label>
          <input type="textarea" className="form-control" {...content}/>
          <div className="text-help">
            { content.touched ? content.error : '' }
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger" >Cancel</Link>

      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter a username';
  }

  if(!values.categories) {
    errors.categories = 'Enter some categories ';
  }

  if(!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}
// note similarty of signature to react connect
// note that this initialisign object is what redux-form will use a template to the global state object
// i.e.: 
// state = {
//   form: {
//    PostsNewForm: {
//      // ...fields
//    }
//   }
// }

// as behavior is so similar, we can use it as we do connect
// redux-form has one additional argument
// connect: (mapStateToProps, mapDispatchToProps)
// reduxForm: (formConfig, mapStateToProps, mapDispatchToProps)

// we can use the createPost action shorthand here instead of mapDispathcToProps

export default reduxForm({
  form: 'PostsNewForm', // value is some unique string 
  fields: ['title', 'categories', 'content'], // the field values we expect from the form
  validate
}, null, { createPost })(PostsNew);

