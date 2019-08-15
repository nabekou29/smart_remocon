module.exports = {
  env: {
    fireBaseApiKey: 'AIzaSyCNHcIPxmACC4GOje7tZZW3M-aUUSyd6sk',
    fireBaseMessagingSenderId: '398066115568',
  },
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/' },
    };
  },
};
