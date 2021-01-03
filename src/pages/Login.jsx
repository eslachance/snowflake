import React from 'react'; // , { useState }
import { Field, Form, Formik } from 'formik';

import { useHistory } from 'react-router-dom'; // , Redirect

import userStore from '../store/userStore';

import Jumbotron from '../components/Jumbotron.js';

const LoginPage = () => {
  // const user = userStore((state) => state.userData);
  const login = userStore((state) => state.login);
  const history = useHistory();

  //   if (user.authenticated) {
  //     // console.log(user);
  //     return (
  //       <Redirect to="/" />
  //     );
  //   }

  function handleSubmit(data) {
    login(data)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.log('ERROR LOGGING IN: ', err);
      });
  }
  return (
    <>
      <Jumbotron
        title="Identification"
        subtext="Now who the heck might you be, stranger?"
      />
      <div className="container px-5 py-5 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">
            Administrative Login
          </h1>
          <p className="leading-relaxed mt-4">
            Currently, there is no user-registration or comments. So... later,
            nerds!
          </p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-white text-lg font-medium title-font mb-5">
            Admin Login
          </h2>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="relative mb-4">
                  <Field type="text" name="username" placeholder="Username">
                    {({ field, form }) => (
                      <>
                        <label
                          htmlFor="username"
                          className="leading-7 text-sm text-gray-400"
                        >
                          Username
                        </label>
                        <input
                          {...field}
                          type="text"
                          id="username"
                          name="username"
                          className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <div>{form.errors.name}</div>
                      </>
                    )}
                  </Field>
                </div>
                <div className="relative mb-4">
                  <Field name="password" placeholder="password">
                    {({ field, form }) => (
                      <>
                        <label
                          htmlFor="password"
                          className="leading-7 text-sm text-gray-400"
                        >
                          Password
                        </label>
                        <input
                          {...field}
                          type="password"
                          id="password"
                          name="password"
                          className="w-full bg-gray-700 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <div>{form.errors.name}</div>
                      </>
                    )}
                  </Field>
                </div>
                <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-xs text-gray-600 mt-3">
            I mean, you probably don&apos;t belong here.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
