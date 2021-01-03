import React, { useEffect } from 'react';

import Jumbotron from '../components/Jumbotron';
import PostPreview from '../components/PostPreview';
import postStore from '../store/postStore';

const Home = () => {
  const { posts, getPosts } = postStore();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <>
      <Jumbotron title="Latest Posts" subtext="Ehhhh What's Up, Doc?" />
      <section className="text-gray-500 body-font overflow-hidden -my-12">
        <div className="container py-10 mx-auto">
          {posts && (
            <div>
              {Object.values(posts).map((post) => (
                <PostPreview key={post.id} {...post}></PostPreview>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
