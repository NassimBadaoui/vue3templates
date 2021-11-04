const express = require('express');
const router = new express.Router();
const sia = require('../controllers/sia.js');


router.route('/sia/') 
  .get(sia.get)
  .post(sia.post)
  .put(sia.put)
  .delete(sia.delete);


module.exports = router;
