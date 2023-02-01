module.exports = [
  {
    method: 'GET',
    path: "/repos", // localhost:1337//github-project/repos
    handler: 'getReposControllers.index',
    config: {
      policies: [],
      auth:false
    },
  },
];
