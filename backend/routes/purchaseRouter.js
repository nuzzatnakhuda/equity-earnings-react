const purchaseController = require('../controllers/purchaseController')
const verifyToken = require('../verification.js')

const router = require('express').Router()

router.get('/user/:id',verifyToken,purchaseController.userPurchase)
router.get('/user/:id/share/:share',verifyToken,purchaseController.userSharePurchase)
router.post('/addPurchase',verifyToken,purchaseController.addPurchase)
router.put('/:id',verifyToken,purchaseController.updatePurchase)
router.delete('/:id',verifyToken,purchaseController.deletePurchase)
router.get('/:id',verifyToken,purchaseController.getPurchase)

module.exports = router