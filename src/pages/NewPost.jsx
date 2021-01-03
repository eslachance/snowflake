import React from 'react';
import { Field, Form, Formik } from 'formik';

import { Redirect } from 'react-router-dom';

import userStore from '../store/userStore';
import postStore from '../store/postStore';

import Jumbotron from '../components/Jumbotron.js';

const NewPostPage = () => {
  const user = userStore((state) => state.userData);
  const { newPost } = postStore();
  // const history = useHistory();

  if (!user?.isAdmin) {
    return <Redirect to="/" />;
  }

  function handleSubmit(data) {
    newPost(data)
      .then((postData) => {
        if (postData?.id) {
          alert(`Post ${postData.id} posted.`);
          history.push(`/post/${postData.id}`);
        } else {
          console.log(postData, postData.err);
        }
      })
      .catch((err) => {
        console.error('FORM ERROR: ', err);
        //history.push('/');
      });
  }

  const commonClasses = `w-full bg-gray-800 rounded border border-gray-700 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 transition-colors duration-200 ease-in-out`;

  return (
    <div styles={{ position: 'relative' }}>
      <Jumbotron title="New Blog Post" subtext="A penny for your thoughts" />
      <Formik
        initialValues={{ title: '', contents: '' }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <Field type="text" name="title" placeholder="Post Title">
                      {({ field }) => (
                        <label
                          htmlFor="title"
                          className="leading-7 text-sm text-gray-400"
                        >
                          Post Title
                          <input
                            {...field}
                            type="text"
                            id="title"
                            name="title"
                            className={`${commonClasses} leading-8`}
                          />
                        </label>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <Field
                      type="text"
                      name="contents"
                      placeholder="Write Your Content Here"
                    >
                      {({ field }) => (
                        <label
                          htmlFor="contents"
                          className="leading-7 text-sm text-gray-400"
                        >
                          Post Content
                          <textarea
                            {...field}
                            id="contents"
                            name="contents"
                            className={`${commonClasses} resize-none leading-6 h-32`}
                          ></textarea>
                        </label>
                      )}
                    </Field>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                  >
                    Post Now!
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPostPage;
