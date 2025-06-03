const shareController = require('../controllers/shareController')
const verifyToken = require('../verification.js')

const router = require('express').Router()

router.get('/user/:id',verifyToken,shareController.getShares)
router.get('/:id',verifyToken,shareController.getShareInfo)
router.post('/addShare',verifyToken,shareController.addShare)
router.put('/:id',verifyToken,shareController.updateShare)
router.delete('/:id',verifyToken,shareController.deleteShare)

module.exports = router