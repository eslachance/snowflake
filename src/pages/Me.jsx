import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import Jumbotron from '../components/Jumbotron';
import SingleTextInput from '../components/SingleTextInput';
import PasswordInput from '../components/PasswordInput';

import userStore from '../store/userStore';
import postStore from '../store/postStore';

const PostListItem = ({ title, contents, ...props }) => {
  console.log(props);
  return (
    <div className="flex flex-wrap w-full border">
      <div className="p-3 sm:w-1/4 w-1/2">{title}</div>
      <div className="p-3 sm:w-1/4 w-1/2">{contents.slice(0, 100)}...</div>
      <div className="p-3 sm:w-1/4 w-1/2">
        <Link>View</Link> - <Link>Edit</Link> - <Link>Delete</Link>
      </div>
    </div>
  );
}

const Page = () => {
  const { userData } = userStore();
  console.log(userData);

  const { posts, getPosts } = postStore();
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleSubmit = () => {};

  return (
    <div styles={{ position: 'relative' }}>
      <Jumbotron title="My Account" subtext="Who the hell am I anyway?" />
      <div className="bg-gray-900 w-full mb-0 py-10 px-5 rounded-lg">
        <Formik
          initialValues={{
            username: '',
            displayName: '',
            password: '',
            ...userData,
          }}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <fieldset>
                <legend className="text-lg">Account Settings</legend>
                <SingleTextInput
                  name="username"
                  label="Your Username (read-only)"
                  readOnly
                />
                <SingleTextInput name="displayName" label="Display Name" />
                <PasswordInput name="password" />
                <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
                  <a onClick={handleSubmit}>Save</a>
                </button>
              </fieldset>
              <fieldset>
                <legend className="text-lg">Blog API</legend>
                <SingleTextInput name="apikey" label="Blog API Key" />
              </fieldset>
              <fieldset>
                <legend className="text-lg">Article Management</legend>
                <ul>
                  {posts && (
                    <div className="">
                      {Object.values(posts).map((post) => (
                        <PostListItem key={post.id} {...post} />
                      ))}
                    </div>
                  )}
                </ul>
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Page;
