const express = require ('express');
require ('../db.js');
const router = express.Router();
const InfoAnimalesPerdidos = require ('../controllers/animalesPerdidosInfo.js');

router.get ('/todos', getAnimalesPerdidos)
router.get ('/perro', getPerrosPerdidos);
router.get ('/gato', getGatosPerdidos);
router.get ('/tama',  getTamañoPerdidos);
router.put("/:id", putAnimalesPerdidos);
router.get ('/:id', getDetalleAnimalPerdido);
router.post ('/',  postAnimalesPerdidos);
router.get('/', getEstadoAnimalPerdido);


module.exports = router;
