import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';

const Greeting = () => {
  return (
    <div>Greeting</div>
  );
}

const blogPosts = () => {
  return (
    <div>
      List of blog posts - inline component
    </div>
  );
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="greet" component={Greeting} />
  </Route>
);
