module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  },
  env: {
    apiUrl: process.env.API_URL || "http://localhost:8080"
  }
};
