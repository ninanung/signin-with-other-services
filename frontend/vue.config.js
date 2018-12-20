module.exports = {
  devServer: {
    proxy: {
      "/github": {
        target: "http://localhost:3000/github",
      },
      "/google": {
        target: "http://localhost:3000/google",
      },
      "/facebook": {
        target: "http://localhost:3000/facebook",
      }
    }
  }
}