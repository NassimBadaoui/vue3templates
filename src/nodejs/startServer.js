const webServer = require('./services/web-server.js');
const database = require('./databases/database.js');
const dbConfig = require('./config/database.js');

const defaultThreadPoolSize = 4;
process.env.UV_THREADPOOL_SIZE = dbConfig.dimPool.poolMax + defaultThreadPoolSize;

async function startup() {
  console.log("Lancement de l'application");
  initDataBase();  
  initWebServer();
}

async function initDataBase() {
  try {
    console.log('Initialisation des connexions aux bases');
    await database.initialize(); 
  } catch (err) {
    console.error(err);
    process.exit(1); 
  }
}

async function initWebServer() {
  try {
    console.log('Initialisation du serveur web');
    await webServer.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1); 
  }
}

async function shutdown(e) {
    let err = e;     
    console.log("Arrêt de l'application");
    err = closeWebServer() || e;
    err = closeDatabasAccess() || e;
    shutdownProcess(err);
  }
  
async function closeWebServer() {
  try {
    console.log("Arrêt du serveur web");
    await webServer.close();
  } catch (e) {
    console.log("Problème pendant l'arrêt du serveur web", e);
    return e;
  }
}

async function closeDatabasAccess() {
  try {
    console.log("Fermeture des connexions aux bases");
    await database.close(); 
  } catch (e) {
    console.log("Problème pendant la fermeture des connexions aux bases", e);
    return e;
  }
}

async function shutdownProcess(err) {
  console.log('Arrêt du processus');
  if (err) {
    process.exit(1); 
  } else {
    process.exit(0);
  }
}


startup();

process.on('SIGTERM', () => {
  console.log('SIGTERM reçu');
  shutdown();
});

process.on('SIGINT', () => {
  console.log('SIGINT reçu');
  shutdown();
});

process.on('uncaughtException', err => {
  console.log('Problème imprévu');
  console.error(err);
  shutdown(err);
});

