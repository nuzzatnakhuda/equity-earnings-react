const { where } = require('sequelize')
const db = require('../models')

const Sales = db.sales
const Invested = db.invested
const Stock = db.stocks

//Add Sales
const addSales = async (req, res) => {
    let stock = await Stock.findOne({
        where: {
            user_id: req.body.user_id,
            share_id: req.body.share_id
        }
    })
    if ((stock.qty - Number(req.body.qty)) < 0) {
        res.status(403).send({ 'message': "Invalid Sales QTY" })
    }
    else{
    const sales = await Sales.create({
        sdate: req.body.sdate,
        user_id: req.body.user_id,
        share_id: req.body.share_id,
        qty: Number(req.body.qty),
        rate: Number(req.body.rate),
        brokerage: Number(req.body.brokerage),
        gstbrok: Number(req.body.gstbrok),
        security: Number(req.body.security),
        other: Number(req.body.other),
        net: Number(req.body.net),
        avg: Number(req.body.avg),
        profit: (Number(req.body.avg) * Number(req.body.qty)) - (stock.cost * Number(req.body.qty))
    })

    //Updating Invested Amt
    let investAmt = (sales.qty * Number(stock.cost))
    const invested = await Invested.findOne({
        where: { user_id: req.body.user_id }
    })
    const invest = await Invested.update({
        amt: invested.amt - investAmt
    }, { where: { user_id: sales.user_id } })

    //Stock Updation
    stock = Stock.update({
        qty: stock.qty - sales.qty
    }, {
        where: {
            user_id: req.body.user_id,
            share_id: req.body.share_id
        }
    })

    res.status(200).send(sales)
}
}

//Get Sales Info
const getSales = async (req, res) => {
    const sales = await Sales.findOne({
        include : {
            model: db.shares,
            as: 'share',
            required: true
        },
        where: { id: req.params.id }
    })
    if (sales)
        res.status(200).send(sales)
    else
        res.status(403).send({ 'message': 'No Such Data Found' })
}

//Get User Sales
const userSales = async (req, res) => {
    const sales = await Sales.findAll({
        include : {
            model: db.shares,
            as: 'share',
            required: true
        },
        where: { user_id: req.params.id }
    })
    if (sales)
        res.status(200).send(sales)
    else
        res.status(403).send({ 'message': 'No Such Data Found' })
}

//Delete Sales
const deleteSales = async (req, res) => {
    const sales = await Sales.findOne({
        where: { id: req.params.id }
    })

    if (sales) {
        const stock = await Stock.findOne({
            where: {
                user_id: sales.user_id,
                share_id: sales.share_id
            }
        })
        //Updating Invested Amt
        const investAmt = (Number(sales.qty) * stock.cost)
        const invested = await Invested.findOne({
            where: { user_id: sales.user_id }
        })
        
        const invest = await Invested.update({
            amt: invested.amt + investAmt
        }, { where: { user_id: sales.user_id } })

        //Stock Updation
        stock = await Stock.update({
            qty: stock.qty + sales.qty
        }, {
            where: {
                user_id: sales.user_id,
                share_id: sales.share_id
            }
        })

        await Sales.destroy({
            where: { id: sales.id }
        })
        res.status(200).send({ 'message': 'Deleted' })
    }
    else
        res.status(403).send({ 'message': 'Record Not Found' })

}

//Update Sales
const updateSales = async (req, res) => {
    //Finding Old Sales
    const oldsales = await Sales.findOne({
        where: { id: req.params.id }
    })
    let stock = await Stock.findOne({
        where: {
            user_id: req.body.user_id,
            share_id: req.body.share_id,
        }
    })
    if ((stock.qty - Number(req.body.qty)) < 0)
        res.status(403).send({ 'message': 'Invalid Sales Qty' })
    else if (oldsales) {
        //Updating Sales Table and finding Sales
        let sales = await Sales.update({
            sdate: req.body.sdate,
            user_id: req.body.user_id,
            share_id: req.body.share_id,
            qty: Number(req.body.qty),
            rate: Number(req.body.rate),
            brokerage: Number(req.body.brokerage),
            gstbrok: Number(req.body.gstbrok),
            security: Number(req.body.security),
            other: Number(req.body.other),
            net: Number(req.body.net),
            avg: Number(req.body.avg),
            profit: (Number(req.body.avg) * Number(req.body.qty)) - (stock.cost * Number(req.body.qty))
        }, {
            where: { id: req.params.id }
        })
        sales = await Sales.findOne({
            where: { id: req.params.id }
        })

        if (oldsales.share_id == sales.share_id) {
            let stock = await Stock.findOne({
                user_id: sales.user_id,
                share_id: sales.share_id
            })
            //Updating Invested Amt
            let oldinvest = oldsales.qty * stock.cost
            let newinvest = sales.qty * stock.cost
            const invested = await Invested.findOne({
                where: { user_id: sales.user_id }
            })
            const invest = await Invested.update({
                amt: invested.amt + oldinvest - newinvest
            }, { where: { user_id: req.body.user_id } })

            //Stock Updation
            stock = await Stock.update({
                qty: stock.qty + oldsales.qty - sales.qty
            }, {
                where: {
                    user_id: sales.user_id,
                    share_id: sales.share_id
                }
            })
        }
        else {
            let oldstock = await Stock.findOne({
                where: {
                    user_id: sales.user_id,
                    share_id: oldsales.share_id
                }
            })
            let newstock = await Stock.findOne({
                where: {
                    user_id: sales.user_id,
                    share_id: sales.share_id
                }
            })

            let oldinvest = sales.qty * oldstock.cost
            let newinvest = sales.qty * newstock.cost
            const invested = await Invested.findOne({
                where: { user_id: sales.user_id }
            })
            const invest = await Invested.update({
                amt: invested.amt + oldinvest - newinvest
            }, { where: { user_id: req.body.user_id } })

            oldstock = await Stock.update({
                qty: oldstock.qty + oldsales.qty
            }, {
                where: {
                    user_id: sales.user_id,
                    share_id: oldsales.share_id
                }
            })

            newstock = await Stock.update({
                qty: newstock.qty - sales.qty
            }, {
                where: {
                    user_id: sales.user_id,
                    share_id: sales.share_id
                }
            })

        }
        res.status(200).send(sales)
    }
    else {
        res.status(403).send({ 'message': 'Record Not Found' })
    }
}
module.exports = {
    addSales,
    getSales,
    userSales,
    deleteSales,
    updateSales
}