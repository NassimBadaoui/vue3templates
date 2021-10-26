const dimco = require('../databases/sia.js');
 
/**
 * @api {get} /dimco/:nom Demande les informations de la connexion
 * @apiVersion 1.0.0
 * @apiName GetConnection
 * @apiGroup dimco
 *
 * @apiParam {String} nom  Nom de la connexion.
 *
 * @apiSuccess {Object[]} connections  Liste des connexions répondant aux critères
 * @apiSuccess {Number} connections.ID_CO  Paramètres décrivant la connexion.
 * @apiSuccess {String} connections.NOM_CO  Nom de la connexion
 * @apiSuccess {String} connections.NOM_UTIL  Nom de connexion
 * @apiSuccess {String} connections.MDP_UTIL  Mot de passe de la connexion
 * @apiSuccess {String} connections.PILOTE  Driver de la connexion (Oracle, ..)
 * @apiSuccess {String} connections.URL_CO  Ligne de connexion
 * @apiSuccess {String} connections.SERVEUR_CO  Serveur de la connexion
 * @apiSuccess {String} connections.PORT_CO  Port de la connexion
 * @apiSuccess {String} connections.SERVICE_CO  Libellé du service de la connexion
 * @apiSuccess {String} connections.COMMENTAIRE  Commentaire de la connexion
 * @apiSuccess {String} connections.DATE_CREATION  Date de création de la connexion
 * @apiSuccess {String} connections.DATE_MAJ  Date de mise à jour de la connexion
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"ID_CO":12,"NOM_CO":"dim","NOM_UTIL":"dim","MDP_UTIL":"abcdef","PILOTE":"oracle.jdbc.driver.OracleDriver","URL_CO":"(DESCRIPTION =(ADDRESS_LIST = (LOAD_BALANCE = ON)(ADDRESS = (PROTOCOL = TCP)(HOST = vlp079chr.chrul.net)(PORT = 1521)))(CONNECT_DATA = (SERVICE_NAME = TRA_DIM_01_E)))","SERVEUR_CO":"vlp079chr.chrul.net","PORT_CO":"1521","SERVICE_CO":"TRA_DIM_01_E","COMMENTAIRE":null,"DATE_CREATION":null,"DATE_MAJ":"2020-11-18T13:24:06.000Z"}]
 *
 * @apiError ConnexionInconnue La connexion n'a pas été retrouvée.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ConnexionInconnue"
 *     }
 */
 async function get(req, res, next) {
  try {
    const context = {};
    context.conName = req.query.nom;
    const rows = await dimco.find(context);
    if (req.params.nom) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).send('ConnexionInconnue').end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;

function getConnectionFromRec(req) {
  const conDesc = {
    util: req.body.util,
    equipe: req.body.equipe,
    heure: req.body.heure, // "user" n'est pas utilisable ORA-01036
  };

  return conDesc;
}

/**
 * @api {post} /dimco/ Création d'une connexion
 * @apiVersion 1.0.0
 * @apiName PostConnection
 * @apiGroup dimco
 *
 * @apiParam {String} NOM_CO  Nom de la connexion
 * @apiParam {String} NOM_UTIL  Nom de connexion
 * @apiParam {String} MDP_UTIL  Mot de passe de la connexion
 * @apiParam {String} PILOTE  Driver de la connexion (Oracle, ..)
 * @apiParam {String} URL_CO  Ligne de connexion
 * @apiParam {String} SERVEUR_CO  Serveur de la connexion
 * @apiParam {String} PORT_CO  Port de la connexion
 * @apiParam {String} SERVICE_CO  Libellé du service de la connexion
 * @apiParam {String} COMMENTAIRE  Commentaire de la connexion
 * 
 * @apiSuccess {Object[]} connections  Liste des connexions répondant aux critères
 * @apiSuccess {Number} connections.ID_CO  Paramètres décrivant la connexion.
 * @apiSuccess {String} connections.NOM_CO  Nom de la connexion
 * @apiSuccess {String} connections.NOM_UTIL  Nom de connexion
 * @apiSuccess {String} connections.MDP_UTIL  Mot de passe de la connexion
 * @apiSuccess {String} connections.PILOTE  Driver de la connexion (Oracle, ..)
 * @apiSuccess {String} connections.URL_CO  Ligne de connexion
 * @apiSuccess {String} connections.SERVEUR_CO  Serveur de la connexion
 * @apiSuccess {String} connections.PORT_CO  Port de la connexion
 * @apiSuccess {String} connections.SERVICE_CO  Libellé du service de la connexion
 * @apiSuccess {String} connections.COMMENTAIRE  Commentaire de la connexion
 * @apiSuccess {String} connections.DATE_CREATION  Date de création de la connexion
 * @apiSuccess {String} connections.DATE_MAJ  Date de mise à jour de la connexion
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     [{"ID_CO":12,"NOM_CO":"dim","NOM_UTIL":"dim","MDP_UTIL":"abcdef","PILOTE":"oracle.jdbc.driver.OracleDriver","URL_CO":"(DESCRIPTION =(ADDRESS_LIST = (LOAD_BALANCE = ON)(ADDRESS = (PROTOCOL = TCP)(HOST = vlp079chr.chrul.net)(PORT = 1521)))(CONNECT_DATA = (SERVICE_NAME = TRA_DIM_01_E)))","SERVEUR_CO":"vlp079chr.chrul.net","PORT_CO":"1521","SERVICE_CO":"TRA_DIM_01_E","COMMENTAIRE":null,"DATE_CREATION":null,"DATE_MAJ":"2020-11-18T13:24:06.000Z"}]
 *
 */
async function post(req, res, next) {
  try {
    let conDesc = getConnectionFromRec(req);
    conDesc = await dimco.create(conDesc);
    res.status(201).json(conDesc);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

/**
 * @api {put} /dimco/ Mise à jour d'une connexion
 * @apiVersion 1.0.0
 * @apiName PutConnection
 * @apiGroup dimco
 *
 * @apiParam {Number} ID_CO  Paramètres décrivant la connexion.
 * @apiParam {String} NOM_CO  Nom de la connexion
 * @apiParam {String} NOM_UTIL  Nom de connexion
 * @apiParam {String} MDP_UTIL  Mot de passe de la connexion
 * @apiParam {String} PILOTE  Driver de la connexion (Oracle, ..)
 * @apiParam {String} URL_CO  Ligne de connexion
 * @apiParam {String} SERVEUR_CO  Serveur de la connexion
 * @apiParam {String} PORT_CO  Port de la connexion
 * @apiParam {String} SERVICE_CO  Libellé du service de la connexion
 * @apiParam {String} COMMENTAIRE  Commentaire de la connexion
 * 
 * @apiSuccess {Object[]} connections  Liste des connexions répondant aux critères
 * @apiSuccess {Number} connections.ID_CO  Paramètres décrivant la connexion.
 * @apiSuccess {String} connections.NOM_CO  Nom de la connexion
 * @apiSuccess {String} connections.NOM_UTIL  Nom de connexion
 * @apiSuccess {String} connections.MDP_UTIL  Mot de passe de la connexion
 * @apiSuccess {String} connections.PILOTE  Driver de la connexion (Oracle, ..)
 * @apiSuccess {String} connections.URL_CO  Ligne de connexion
 * @apiSuccess {String} connections.SERVEUR_CO  Serveur de la connexion
 * @apiSuccess {String} connections.PORT_CO  Port de la connexion
 * @apiSuccess {String} connections.SERVICE_CO  Libellé du service de la connexion
 * @apiSuccess {String} connections.COMMENTAIRE  Commentaire de la connexion
 * @apiSuccess {String} connections.DATE_CREATION  Date de création de la connexion
 * @apiSuccess {String} connections.DATE_MAJ  Date de mise à jour de la connexion
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"ID_CO":12,"NOM_CO":"dim","NOM_UTIL":"dim","MDP_UTIL":"abcdef","PILOTE":"oracle.jdbc.driver.OracleDriver","URL_CO":"(DESCRIPTION =(ADDRESS_LIST = (LOAD_BALANCE = ON)(ADDRESS = (PROTOCOL = TCP)(HOST = vlp079chr.chrul.net)(PORT = 1521)))(CONNECT_DATA = (SERVICE_NAME = TRA_DIM_01_E)))","SERVEUR_CO":"vlp079chr.chrul.net","PORT_CO":"1521","SERVICE_CO":"TRA_DIM_01_E","COMMENTAIRE":null,"DATE_CREATION":null,"DATE_MAJ":"2020-11-18T13:24:06.000Z"}]
 *
 */
async function put(req, res, next) {
  try {
    let conDesc = getConnectionFromRec(req);
    conDesc.conId = parseInt(req.body.id_co, 10);
    conDesc = await dimco.update(conDesc);
    if (conDesc !== null) {
      res.status(200).json(conDesc);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;

/**
 * @api {del} /dimco/:id_con Suppression d'une connexion
 * @apiVersion 1.0.0
 * @apiName DelConnection
 * @apiGroup dimco
 *
 * @apiParam {Number} id_co  Identifiant de la connexion.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
 async function del(req, res, next) { // delete est un mot réservé
  try {
    const conId = parseInt(req.query.id_co, 10);
    const success = await dimco.delete(conId);
    if (success) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;