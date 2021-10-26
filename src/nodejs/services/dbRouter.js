const express = require('express');
const router = new express.Router();
const dimco = require('../controllers/sia.js');


router.route('/sia/') 
  .get(dimco.get)
  .post(dimco.post)
  .put(dimco.put)
  .delete(dimco.delete);


module.exports = router;
