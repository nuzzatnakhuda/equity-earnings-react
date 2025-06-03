const salesController = require('../controllers/salesController')
const verifyToken = require('../verification.js')

const router = require('express').Router()

router.post('/addSales',verifyToken,salesController.addSales)
router.get('/:id',verifyToken,salesController.getSales)
router.get('/user/:id',verifyToken,salesController.userSales)
router.delete('/:id',verifyToken,salesController.deleteSales)
router.put('/:id',verifyToken,salesController.updateSales)

module.exports = router