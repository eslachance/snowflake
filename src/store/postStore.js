import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { BASE_URL, handleResponse } from './tools';

const postStore = create(
  devtools((set, get) => ({
    posts: {},
    getPosts: async () => {
      const posts = await fetch(`${BASE_URL}/posts`).then(handleResponse);
      if (posts) {
        console.log(posts);
        set({ posts });
      }
    },
    getPost: async (id) => {
      if (!get().posts[id]) {
        const post = await fetch(`${BASE_URL}/post/${id}`).then(handleResponse);
        set({
          posts: {
            ...get().posts,
            [post.id]: post,
          },
        });
      }
      return get().posts[id];
    },
    newPost: async (data) => {
      const res = await fetch(`${BASE_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(handleResponse);
      return res;
    },
  })),
);

export default postStore;
