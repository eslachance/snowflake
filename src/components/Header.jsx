import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import userStore from '../store/userStore';

const Header = () => {
  const history = useHistory();

  const user = userStore(state => state.userData); // state => state.nuts
  const logout = userStore(state => state.logout);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">SnowFlake</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">New</a>
          <a className="mr-5 hover:text-white">Admin</a>
          <a className="mr-5 hover:text-white">{user.username}</a>
        </nav>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Logout
        </button>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
