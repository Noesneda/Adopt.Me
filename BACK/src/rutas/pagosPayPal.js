const express = require('express');
const router = express.Router();
const infoPagosPayPal = require('../controllers/pagoPayPalInfo');

router.post('/crear-orden', getOrden);

router.get('/capturar-orden', getCapturarOrden);

router.get('/cancelar-orden', getCancelarOrden);


module.exports = router;