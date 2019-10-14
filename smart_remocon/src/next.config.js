module.exports = {
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/remocon?id=:id': { page: '/' },
    };
  },
};
