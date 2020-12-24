import React from 'react';
// import { Field, Form, Formik } from 'formik';

import { useHistory, Redirect } from 'react-router-dom';

import userStore from '../store/userStore';
import postStore from '../store/postStore';

import Jumbotron from '../components/Jumbotron.js';

const LoginPage = () => {
  const user = userStore(state => state.userData);
  const { newPost } = postStore();
  const history = useHistory();

  // if (user && !user.authenticated) {
  //   console.log(user);
  //   return (
  //     <Redirect to="/" />
  //   );
  // }

  const badgeRadius = 4;

  function handleSubmit(data) {
    newPost(data)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        history.push('/');
      });
  }

  const commonClasses = `w-full bg-gray-800 rounded border border-gray-700 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 transition-colors duration-200 ease-in-out`;

  return (
    <div styles={{ position: 'relative' }}>
      <Jumbotron title="New Blog Post" subtext="A penny for your thoughts" />
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${commonClasses} leading-8`}
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${commonClasses} leading-8`}
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label htmlFor="message" className="leading-7 text-sm text-gray-400">Message</label>
              <textarea
                id="message"
                name="message"
                className={`${commonClasses} resize-none leading-6 h-32`}
              ></textarea>
            </div>
          </div>
          <div className="p-2 w-full">
            <button className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">Button</button>
          </div>
          <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
            <a className="text-purple-500">example@email.com</a>
            <p className="leading-normal my-5">49 Smith St.
              <br />Saint Cloud, MN 56301
            </p>
            <span className="inline-flex">
              <a className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-4 text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
