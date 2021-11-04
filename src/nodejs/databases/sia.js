const oracledb = require('oracledb');
const database = require('./database.js');

const SELECT_SQL = 
`SELECT UTIL, EQUIPE, HEURE FROM KIM_RESA`;

async function find(context) {
  let query = SELECT_SQL;
  const binds = {};
  if (context.conName) {
    binds.conName = context.conName;
    query += `\nWHERE UTIL = :util`;
  }
  const result = await database.simpleExecute(query, binds);
  return result.rows;
}

module.exports.find = find;

const INSERT_SQL =
  "INSERT INTO KIM_RESA(UTIL, EQUIPE)\n"+
  "VALUES (:util, :equipe)";
  /*"RETURNING UTIL INTO :conId";*/

async function create(conn) {
  const conDesc = Object.assign({}, conn); 
  const result = await database.simpleExecute(INSERT_SQL, conDesc);
  //conDesc.conId = result.outBinds.conId[0];
  return conDesc;
}

module.exports.create = create;

const UPDATE_SQL =
 "UPDATE KIM_RESA\n" +
 "  SET EQUIPE = :equipe\n" +
 "WHERE UTIL = :util";

async function update(conn) {
  const conDesc = Object.assign({}, conn);
  delete conDesc.creationDate;
  delete conDesc.updateDate;
  const result = await database.simpleExecute(UPDATE_SQL, conDesc);
  if (result.rowsAffected && result.rowsAffected === 1) {
    return conDesc;
  } else {
    return null;
  }
}

module.exports.update = update;

const DELETE_SQL =
 'DELETE FROM KIM_RESA WHERE UTIL = :util';

async function del(util) {
  const connDesc = {
    util: util
  };
  const result = await database.simpleExecute(DELETE_SQL, connDesc);
  return result.rowsAffected === 1;
}

module.exports.delete = del;