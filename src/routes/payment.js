const express = require('express');
const { order, paymentVerify } = require('../controller/payment');

const router = express.Router()

router.post('/payment/order',order);
router.post('/payment/paymentVerify',paymentVerify)



module.exports = router;