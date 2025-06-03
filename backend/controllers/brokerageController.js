const db = require('../models')

const Brokerage = db.brokerage
const User = db.users

//Add Brokerage
const addBrokerage = async (req, res) => {
    const userId = req.body.user_id;
    
    // If user_id is not present in the session, handle accordingly
    if (!userId) {
        return res.status(403).send({ 'message': 'User not authenticated' });
    }

    let brok = await Brokerage.findOne({
        where: {
            user_id: userId,
            perc: req.body.perc
        }
    })
    if (brok == null) {
        brok = await Brokerage.create({
            user_id: userId,
            perc: req.body.perc
        })
        res.status(200).send(brok)
    } else {
        res.status(403).send({ 'message': 'Already Exists' })
    }
}


//update Brokerage
const updateBrokerage = async (req, res) => {
    let brok = await Brokerage.findOne({
        where: { id: req.params.id }
    })
    if (brok) {
        brok = await Brokerage.findOne({
            where: {
                user_id: req.body.user_id,
                perc: req.body.perc
            }
        })
        if (brok == null) {
            const brok = await Brokerage.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).send(brok)
        }
        else
            res.status(403).send({ 'message': 'Already Exists' })
    } else
        res.status(404).send({ 'message': 'No Such Data Found' })
}

//Delete Brokerage
const deleteBrokerage = async (req, res) => {
    let brok = Brokerage.findOne({
        where: { id: req.params.id }
    })
    if (brok) {
        await Brokerage.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send('Brokerage Deleted')
    } else
        res.status(404).send({ 'message': 'No Such Data Found' })
}

//UserWise Brokerage
const userBrok = async (req, res) => {
    const brok = await Brokerage.findAll({
        where: {
            user_id: req.params.id
        }
    })
    res.status(200).send(brok)
}

//Find One Brokerage
const getBrok = async (req, res) => {
    const brok = await Brokerage.findOne({
        where: {
            id: req.params.id
        }
    })
    if (brok)
        res.status(200).send(brok)
    else
        res.status(404).send({ 'message': 'No Such Data Found' })
}
module.exports = {
    addBrokerage,
    updateBrokerage,
    deleteBrokerage,
    getBrok,
    userBrok
}