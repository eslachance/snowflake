import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Post from './pages/Post';
import Admin from './pages/Admin';
import Me from './pages/Me';

function App(props) {
  return (
    <div className="App">
      <Header {...props} />
      <section className="text-gray-500 body-font">
        <div className="container px-5 py-10 mx-auto">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={NewPost} />
            <Route path="/post/:id" component={Post} />
            <Route path="/me" component={Me} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </section>
    </div>
  );
}

export default App;
