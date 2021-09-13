module.exports = {
    // options...
    devServer: {
          proxy: 'http://vlp042chr/',
          port: 3000
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
     }
  }