const db = require('../models')

const Share = db.shares

//Create a New Share
const addShare = async (req, res) => {
    let share = await Share.findOne({
        where: {
            user_id: req.body.user_id,
            name: req.body.name
        }
    })
    if (share == null) {
        share = await Share.create({
            user_id: req.body.user_id,
            name: req.body.name
        })
        res.status(200).send(share)
    }
    else {
        res.status(403).send({ 'message': 'This Share Already exists' })
    }
}

//Get all Shares
const getShares = async (req, res) => {
    const shares = await Share.findAll({
        where : {user_id : req.params.id}
    })
    if (shares)
        res.status(200).send(shares)
    else
        res.status(404).send({ 'message': 'No Such Data Found' })
}

//Get One Share
const getShareInfo = async (req, res) => {
    const share = await Share.findOne({
        where: { id: req.params.id }
    })
    res.status(200).send(share)
}

//Update Share
const updateShare = async (req, res) => {
    let share = await Share.findOne({
        where: { id: req.params.id }
    })
    if (share) {
        share = await Share.findOne({
            where: {
                user_id: req.body.user_id,
                name: req.body.name
            }
        })
        if (share == null) {
            share = await Share.update(req.body, {
                where: { id: req.params.id }
            })
            res.status(200).send(share)
        } else
            res.status(403).send({ 'message': 'This Share Already Exists' })
    }
    else
        res.status(403).send({ 'message': 'No Such Data Found' })
}

//Delete Share
const deleteShare = async (req, res) => {
    let share = await Share.findOne({
        where: { id: req.params.id }
    })
    if (share) {
        await Share.destroy({
            where: { id: req.params.id }
        })
        res.status(200).send('Share Deleted')
    } else
        res.status(403).send({ 'message': 'No Such Data Found' })
}

module.exports = {
    addShare,
    getShares,
    getShareInfo,
    updateShare,
    deleteShare
}