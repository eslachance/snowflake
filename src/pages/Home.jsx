import React from 'react';

import Jumbotron from '../components/Jumbotron.js';
import postStore from '../store/postStore';

const SinglePost = (props) => {
  const { author, date, title, content } = props;
  return (
    <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-no-wrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="tracking-widest font-medium title-font text-white">{author}</span>
        <span className="mt-1 text-gray-600 text-sm">{date}</span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-white title-font mb-2">{title}</h2>
        <p className="leading-relaxed">{content}</p>
        <a className="text-purple-500 inline-flex items-center mt-4">Learn More
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const Home = () => {
  const posts = postStore(state => state.posts);

  return (
    <>
      <Jumbotron title="Latest Posts" subtext="Ehhhh What's Up, Doc?" />
      <section className="text-gray-500 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="-my-8">
            {posts &&
            <div>
              {posts.map(post => <SinglePost key={post.id} {...post}></SinglePost>)}
            </div>
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
