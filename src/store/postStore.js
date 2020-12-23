import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { BASE_URL, handleResponse } from './tools';

const postStore = create(devtools(set => ({
  posts: [],
  getPosts: async () => {
    const posts = await fetch(`${BASE_URL}/posts`).then(handleResponse);
    if (posts) {
      console.log(posts);
      set({ posts });
    }
  },
  newPost: async (data) => {
    const res = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(handleResponse);
    console.log(res);
  },
})));

export default postStore;
