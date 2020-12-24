import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { BASE_URL, handleResponse } from './tools';

const userStore = create(
  devtools((set) => ({
    userData: {
      loaded: false,
    },

    login: async ({ username, password }) => {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }).then(handleResponse);

      if (res) {
        const userData = await fetch(`${BASE_URL}/me`).then(handleResponse);
        console.log(userData);
        set({ userData, loaded: true });
      }
    },

    logout: async () => {
      const res = await fetch(`${BASE_URL}/logout`).then(handleResponse);
      console.log(res);

      set({
        userData: {
          authenticated: false,
          username: null,
          isAdmin: false,
          loaded: true,
        },
      });
    },

    setUser: (userData) => set({ userData }),

    me: async () => {
      const userData = await fetch(`${BASE_URL}/me`).then(handleResponse);
      if (userData) {
        console.log(userData);
        set({ userData, loaded: true });
      }
    },
  })),
);

// const userStore = create();

export default userStore;
