import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Jumbotron from '../components/Jumbotron.js';

import postStore from '../store/postStore';

const ShowPost = () => {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const { getPost } = postStore();
  useEffect(() => {
    getPost(id || '1').then(setPost);
  }, [getPost, id]);
  console.log(post);
  return (
    <div styles={{ position: 'relative' }}>
      <Jumbotron title={post.title} subtext={`Posted Date, by ${post.user}`} />
      <div className="flex flex-col bg-gray-900 text-center w-full mb-0 py-10">
        <p className="leading-relaxed">{post.contents}</p>
      </div>
    </div>
  );
};

export default ShowPost;
