import create from 'zustand';
import { devtools } from 'zustand/middleware';

const BASE_URL = 'http://localhost:3000';

const handleResponse = async r => {
  const resdata = await r.json();
  if (r.status !== 200) {
    throw new Error(resdata);
  }
  return resdata;
};

const userStore = create(devtools(set => ({
  userData: {
    authenticated: false,
    username: null,
    isAdmin: false,
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
      set({ userData });
    }
  },

  logout: async () => {
    const res = await fetch(`${BASE_URL}/logout`, { method: 'POST' }).then(handleResponse);
    console.log(res);

    set({ userData: {
      authenticated: false,
      username: null,
      isAdmin: false,
    } });
  },

  setUser: (userData) => set({ userData }),

  me: async () => {
    const userData = await fetch(`${BASE_URL}/me`).then(handleResponse);
    if (userData) {
      console.log(userData);
      set({ userData });
    }
  },

})));

// const userStore = create();

export default userStore;
