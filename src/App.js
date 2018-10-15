import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndexLayout from '../src/layout/blogIndex';
import AdminIndex from './layout/adminIndex';
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={AdminIndex} />
          <Route path="/" component={IndexLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
