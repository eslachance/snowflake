import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import userStore from '../store/userStore';

const { me } = userStore.getState();
me();

const Header = () => {
  const history = useHistory();

  const user = userStore((state) => state.userData);
  const logout = userStore((state) => state.logout);

  console.log(user);

  const handleLogout = () => {
    logout().then(() => {
      history.push('/');
    });
  };

  return (
    <header className="text-gray-500 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">Snowflake</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user?.authenticated && (
            <>
              <Link className="mr-5 hover:text-white" to="/new">
                New Post
              </Link>
              <a className="mr-5 hover:text-white">Admin</a>
              <a className="mr-5 hover:text-white">{user.username}</a>
            </>
          )}
        </nav>
        {user?.authenticated ? (
          <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            <a onClick={handleLogout}>Logout</a>
          </button>
        ) : (
          <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
