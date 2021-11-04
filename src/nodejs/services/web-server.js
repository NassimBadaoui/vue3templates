const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
const router = require('./dbRouter.js');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = initApp();
    httpServer = http.createServer(app);
    httpServer.listen(webServerConfig.port, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Serveur web sur localhost:${webServerConfig.port}`);
      resolve();
    });
  });
}

function initApp() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('combined'));
  app.use(cors());
  app.use('/api', router);
  return app;
}

module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
  
  module.exports.close = close;