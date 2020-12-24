import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.css';

// import Header from './components/Header';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import NewPost from './pages/NewPost';

const Home = () => {
  const thing = 'Test Page';
  return (
    <h1>{thing}</h1>
  );
};

function App(props) {
  return (

    <div className="App">
      {/* <Header {...props} /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/new" component={NewPost} /> */}
      </Switch>
    </div>
  );
}

export default App;
