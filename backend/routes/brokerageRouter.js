const brokerageController = require('../controllers/brokerageController')
const verifyToken = require('../verification.js')

const router = require('express').Router()

router.post('/addBrokerage',verifyToken,brokerageController.addBrokerage)
router.get('/:id',verifyToken,brokerageController.getBrok)
router.put('/:id',verifyToken,brokerageController.updateBrokerage)
router.delete('/:id',verifyToken,brokerageController.deleteBrokerage)
router.get('/user/:id',verifyToken,brokerageController.userBrok)


module.exports = router