import React from 'react';

import Jumbotron from '../components/Jumbotron.js';
import postStore from '../store/postStore';

const Home = () => {
  const posts = postStore(state => state.posts);

  return (
    <>
      <Jumbotron title="Latest Posts" subtext="Ehhhh What's Up, Doc?" />
      {posts &&
        <div>
          {posts.map(post => <div key={post.id}>{post.title}</div>)}
        </div>
      }
    </>
  );
};

export default Home;
