const { where } = require('sequelize')
const db = require('../models')

const Purchase = db.purchase
const Invested = db.invested
const Stock = db.stocks

//Add Purchase
const addPurchase = async (req, res) => {
    const purchase = await Purchase.create({
        pdate: req.body.pdate,
        user_id: req.body.user_id,
        share_id: req.body.share_id,
        qty: Number(req.body.qty),
        rate: Number(req.body.rate),
        brokerage: Number(req.body.brokerage),
        gstbrok: Number(req.body.gstbrok),
        security: Number(req.body.security),
        other: Number(req.body.other),
        net: Number(req.body.net),
        avg: Number(req.body.avg)
    })
    //Updating Invested Amt
    const invested = await Invested.findOne({
        where: { user_id: req.body.user_id }
    })
    const invest = await Invested.update({
        amt: invested.amt + purchase.net
    }, { where: { user_id: purchase.user_id } })

    //Stock Creation or Updation
    let stock = await Stock.findOne({
        where: {
            user_id: purchase.user_id,
            share_id: purchase.share_id
        }
    })
    if (stock) {
        if (stock.qty == 0) {
            stock = await Stock.update({
                qty: purchase.qty,
                cost: purchase.avg
            }, {
                where: {
                    user_id: purchase.user_id,
                    share_id: purchase.share_id
                }
            })
        }
        else {
            let cost = ((stock.qty * stock.cost) + (purchase.qty * purchase.avg)) / (stock.qty + purchase.qty)
            stock = await Stock.update({
                qty: stock.qty + purchase.qty,
                cost: cost
            }, {
                where: {
                    user_id: purchase.user_id,
                    share_id: purchase.share_id
                }
            })
        }
    }
    else {
        stock = await Stock.create({
            user_id: purchase.user_id,
            share_id: purchase.share_id,
            qty: purchase.qty,
            cost: purchase.avg
        })
    }
    res.status(200).send(purchase)
}

//Update Purchase
const updatePurchase = async (req, res) => {
    //Finding Purchase
    const oldpurchase = await Purchase.findOne({
        where: { id: req.params.id }
    })
    if (oldpurchase) {
        //Updating Purchase Table
        const purchase = await Purchase.update(req.body, {
            where: { id: req.params.id }
        })

        //Updating Invested Table
        const invested = await Invested.findOne({
            where: { user_id: req.body.user_id }
        })
        const invest = await Invested.update({
            amt: invested.amt + Number(req.body.net) - oldpurchase.net
        }, { where: { user_id: oldpurchase.user_id } })

        //Checking if the Same Share is Updated
        if (oldpurchase.share_id == req.body.share_id) {
            //Update Stock
            let stock = await Stock.findOne({
                where: {
                    user_id: req.body.user_id,
                    share_id: req.body.share_id
                }
            })
            let oldqty = stock.qty - oldpurchase.qty

            if (oldqty > 0) {
                let oldc = ((stock.qty * stock.cost) - (oldpurchase.qty * oldpurchase.avg)) / (stock.qty - oldpurchase.qty)
                stock = await Stock.update({
                    qty: stock.qty - oldpurchase.qty + Number(req.body.qty),
                    cost: ((oldqty * oldc) + (Number(req.body.qty) * Number(req.body.avg))) / (oldqty + Number(req.body.qty))
                }, {
                    where: {
                        user_id: oldpurchase.user_id,
                        share_id: req.body.share_id
                    }
                })
            }
            else {
                stock = await Stock.update({
                    qty: Number(req.body.qty),
                    cost: Number(req.body.avg)
                }, { where: { user_id: oldpurchase.user_id } })
            }
        }
        //Process to be done when the Share ID is updated
        else {
            //Finding Mistaken Share's Stock
            let oldstock = await Stock.findOne({
                where: {
                    user_id: req.body.user_id,
                    share_id: oldpurchase.share_id
                }
            })
            //Setting Mistaken Share's Stock to Previous Value
            oldstock = await Stock.update({
                qty: oldstock.qty - oldpurchase.qty,
                cost: ((oldstock.qty * oldstock.cost) - (oldpurchase.qty * oldpurchase.avg)) / (oldstock.qty - oldpurchase.qty)
            }, {
                where: {
                    user_id: req.body.user_id,
                    share_id: oldpurchase.share_id
                }
            })
            //Finding the Updated Share's Stock
            let stock = await Stock.findOne({
                where: {
                    user_id: req.body.user_id,
                    share_id: req.body.share_id
                }
            })
            //Checking if there is a record in Stock Table
            if (stock != null) {
                //Checking if the qty of the Stock is 0
                if (stock.qty == 0) {
                    //Updating Stock if it is Zero
                    stock = await Stock.update({
                        qty: Number(req.body.qty),
                        cost: Number(req.body.avg)
                    }, {
                        where: {
                            user_id: req.body.user_id,
                            share_id: req.body.share_id
                        }
                    })
                }
                else {
                    //Updating Stock if it is not 0
                    let cost = ((stock.qty * stock.cost) + (Number(req.body.qty) * Number(req.body.avg))) / (stock.qty + Number(req.body.qty))
                    stock = await Stock.update({
                        qty: stock.qty + req.body.qty,
                        cost: cost
                    }, {
                        where: {
                            user_id: req.body.user_id,
                            share_id: req.body.share_id
                        }
                    })

                }
            }
            //Creating a Record if No Record of Share Found
            else {
                stock = await Stock.create({
                    user_id: req.body.user_id,
                    share_id: req.body.share_id,
                    qty: req.body.qty,
                    cost: req.body.avg
                })

            }
        }
        res.status(200).send(purchase)
    }
    else {
        res.status(403).send({ 'message': 'No Data Found' })
    }
}

//Delete Purchase
const deletePurchase = async (req, res) => {
    const oldpurchase = await Purchase.findOne({
        where: { id: req.params.id }
    })
    if (oldpurchase) {
        //Updating Invested Table
        const invested = await Invested.findOne({
            where: { user_id: oldpurchase.user_id }
        })
        const invest = await Invested.update({
            amt: invested.amt - oldpurchase.net
        }, { where: { user_id: oldpurchase.user_id } })

        //Deleting Purchase
        await Purchase.destroy({
            where: { id: req.params.id }
        })

        let stock = await Stock.findOne({
            where: {
                user_id: oldpurchase.user_id,
                share_id: oldpurchase.share_id
            }
        })
        stock = await Stock.update({
            qty: stock.qty - oldpurchase.qty,
            cost: ((stock.qty * stock.cost) - (oldpurchase.qty * oldpurchase.avg)) / (stock.qty - oldpurchase.qty)
        }, {
            where: {
                user_id: oldpurchase.user_id,
                share_id: oldpurchase.share_id
            }
        })
        res.status(200).send({ 'message': 'Purchase Deleted' })
    }
    else {
        res.status(403).send({ 'message': 'No Record Found' })
    }
}

//Purchase Info
const getPurchase = async (req, res) => {
    const purchase = await Purchase.findOne({
        where: { id: req.params.id }
    })
    console.log(purchase)
    res.status(200).send(purchase)
}

//User Purchase
const userPurchase = async (req, res) => {
    const purchase = await Purchase.findAll({
        include: {
            model: db.shares,
            as: 'share',
            required: true
        },
        where: {
            user_id: req.params.id
        }
    })

    res.status(200).send(purchase)
}

//Share wise User Purchase
const userSharePurchase = async (req, res) => {
    const purchase = await Purchase.findAll({
        where: {
            user_id: req.params.id,
            share_id: req.params.share
        }
    })
    res.status(200).send(purchase)
}



module.exports = {
    addPurchase,
    updatePurchase,
    deletePurchase,
    getPurchase,
    userPurchase,
    userSharePurchase
}