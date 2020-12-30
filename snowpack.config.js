/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-postcss'],
  install: [
    /* ... */
  ],
  installOptions: {
    NODE_ENV: true,
  },
  devOptions: {
    open: 'none',
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    '/api': 'http://localhost:3000',
  },
  alias: {
    /* ... */
  },
};
