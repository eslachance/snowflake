import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'tailwindcss/dist/tailwind.css';

import App from './App.jsx';

import userStore from './store/userStore';
const { me, setUser } = userStore.getState();
me().then((user) => {
  // console.log('USER HERE, USER HAS CHANGED');
  // console.log(user);
  if (user?.isLoaded) {
    setUser(user);
  } else {
    // logout();
    // history.push('/');
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
