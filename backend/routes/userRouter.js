const userController = require('../controllers/userController')
const verifyToken = require('../verification.js')

const router = require('express').Router()

router.get('/',userController.getUsers)
router.get('/:id',verifyToken,userController.getUserInfo)
router.post('/addUser',userController.addUser)
router.put('/:id',verifyToken,userController.updateUSer)
router.delete('/:id',verifyToken,userController.deleteUser)
router.get('/invested/:id',verifyToken,userController.userInvest)
router.get('/stock/:id',verifyToken,userController.userStock)
router.post('/login',userController.login)
router.get('/userStock/:id',verifyToken,userController.getStock)
router.get('/profit/:id',verifyToken,userController.getTotalProfit)

module.exports = router