import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { BASE_URL, handleResponse } from './tools';

const userStore = create(
  devtools((set) => ({
    userData: {},

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
        set({ userData });
      }
    },

    logout: async () => {
      const res = await fetch(`${BASE_URL}/logout`).then(handleResponse);
      console.log(res);

      set({ userData: {} });
    },

    setUser: (userData) => set({ userData }),

    me: async () => {
      const userData = await fetch(`${BASE_URL}/me`).then(handleResponse);
      if (userData) {
        set({ userData });
        return userData;
      }
    },
  })),
);

// const userStore = create();

export default userStore;
