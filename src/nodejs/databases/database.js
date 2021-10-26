const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize() {
  if ( process.platform === "win32" ) {
    oracledb.initOracleClient({libDir: 'D:/ORACLE_DEV/instantclient_19_8'});
  }
  const pool = await oracledb.createPool(dbConfig.dimPool);
}

module.exports.initialize = initialize;

async function close() {
    await oracledb.getPool().close();
  }
  
module.exports.close = close;
  
function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      opts.outFormat = oracledb.OBJECT;
      opts.autoCommit = true;
      let conn;
      try {
        conn = await oracledb.getConnection();
        const result = await conn.execute(statement, binds, opts);
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        closeStatement(conn);
      }
    });
}

async function closeStatement(conn) {
  if (conn) { 
    try {
      await conn.close();
    } catch (err) {
      console.log(err);
    }
  }
}
  
module.exports.simpleExecute = simpleExecute;
