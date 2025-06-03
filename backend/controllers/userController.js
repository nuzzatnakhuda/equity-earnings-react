const db = require('../models')
const jwt = require('jsonwebtoken')
const { Op, Sequelize } = require('sequelize')

const User = db.users
const Invested = db.invested
const Stock = db.stocks
const Sales = db.sales
const secretKey = "qwerty"

// Create User
const addUser = async (req, res) => {
    let user = await User.findOne({
        where: { username: req.body.username }
    })
    if (user == null) {
        const user = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        const invest = Invested.create({
            user_id: user.id,
            amt: 0
        })
        res.status(200).send(user)
    }
    else {
        res.status(403).send({ 'message': 'Sorry The login id already exists' })
    }
}

//Find All USers
const getUsers = async (req, res) => {
    const users = await User.findAll({})
    if (users)
        res.status(200).send(users)
    else
        res.status(403).send({ 'message': 'No Data Found' })
}

// Get Single User Info
const getUserInfo = async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } })
    if (user)
        res.status(200).send(user)
    else
        res.status(403).send({ 'message': 'No Such User' })
}

// Update User Info
const updateUSer = async (req, res) => {
    let check = await User.findOne({
        where: { id: req.params.id }
    })
    if (check) {
        check = await User.findOne({
            where: { username: req.body.username }
        })
        if (check == null) {
            const user = await User.update(req.body, { where: { id: req.params.id } })
            res.status(200).send(user)
        } else
            res.status(403).send({ 'message': 'Username already exists' })
    }
    else {
        res.status(403).send({ 'message': 'No Such Record Found' })
    }

}

//Delete Product
const deleteUser = async (req, res) => {
    const check = await User.findOne({
        where: { id: req.params.id }
    })
    if (check) {
        await User.destroy({ where: { id: req.params.id } })
        await Invested.destroy({ where: { user_id: req.params.id } })
        res.status(200).send('Product Deleted')
    }
    else {
        res.status(403).send({ 'message': 'No Such Record Found' })
    }
}

//Get Invested Amount
const userInvest = async (req, res) => {
    const invested = await Invested.findOne({
        where: { user_id: req.params.id }
    })
    if (invested)
        res.status(200).send(invested)
    else
        res.status(403).send({ 'message': 'Something went wrong' })
}


//User Stock
const userStock = async (req, res) => {
    const stock = await Stock.findAll({
        include: {
            model: db.shares,
            required: true
        },
        where: { user_id: req.params.id }
    })

    console.log(stock);
    res.status(200).send(stock)
}

//User Login
const login = async (req, res) => {
    console.log(req);
    const user = await User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })

    if (!user)
        res.status(404).send({ 'message': 'User Not Found' })
    else {
        const token = jwt.sign({ user_id: user.id }, secretKey, { expiresIn: '1h' })
        res.send({ "token": token, "id": user.id })
    }
}

//All Profit
const getTotalProfit = async (req, res) => {
    const total = await Sales.findAll({
        attributes: [
            'user_id',
            [db.sequelize.fn('sum', db.sequelize.col('profit')), 'total_profit']
        ],
        where: { user_id: req.params.id }
    })
    res.status(200).send(total)  

}

//Stock greater than 0
const getStock = async (req, res) => {
    const stock = await Stock.findAll({
        include: {
            model: db.shares,
            as: 'share',
            required: true
        },
        where: {
            user_id: req.params.id,
            qty: { [Op.gt]: 0 }
        }
    })
    if (stock)
        res.status(200).send(stock)
    else
        res.status(404).send({ "message": "No Data Found" })
}

module.exports = {
    addUser,
    getUsers,
    getUserInfo,
    updateUSer,
    deleteUser,
    userInvest,
    userStock,
    login,
    getTotalProfit,
    getStock,
    secretKey
}