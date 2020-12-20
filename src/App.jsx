import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from "./components/Header.js";
import Login from "./pages/Login.js";

const Home = () => {
  return (<h1>HOME</h1>)
}

function App(props) {
  return (
    
    <div className="App">
      <Header {...props} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
    </Switch>
    </div>
  );
}

export default App;
