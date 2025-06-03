const dbConfig = require('../config/dbConfig.js')

const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorsAliases : false,
        pool :{
            max:dbConfig.pool.max,
            min:dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected')
})
.catch(err =>{
    console.log('Error : '+err)
})

const db ={}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize,DataTypes)
db.shares = require('./shareModel.js')(sequelize,DataTypes)
db.brokerage = require('./brokerageModel.js')(sequelize,DataTypes)
db.purchase = require('./purchaseModel.js')(sequelize,DataTypes)
db.sales = require('./salesModel.js')(sequelize,DataTypes)
db.stocks = require('./stockModel.js')(sequelize,DataTypes)
db.invested = require('./investedModel.js')(sequelize,DataTypes)


//Realationships
db.users.hasMany(db.brokerage,{
    foreignKey : 'user_id',
    as : 'brokerage'
})

db.brokerage.belongsTo(db.users,{
    foreignKey: 'user_id',
    as : 'user'
})

db.users.hasMany(db.purchase,{
    foreignKey : 'user_id',
    as : 'purchase'
})
db.purchase.belongsTo(db.users,{
    foreignKey : 'user_id',
    as : 'user'  
})

db.users.hasMany(db.sales,{
    foreignKey : 'user_id',
    as : 'sales'
})
db.sales.belongsTo(db.users,{
    foreignKey : 'user_id',
    as : 'user'  
})

db.shares.hasMany(db.purchase,{
    foreignKey : 'share_id',
    as : 'purchase'
})
db.purchase.belongsTo(db.shares,{
    foreignKey : 'share_id',
    as : 'share'
})

db.shares.hasMany(db.sales,{
    foreignKey : 'share_id',
    as : 'sales'
})
db.sales.belongsTo(db.shares,{
    foreignKey : 'share_id',
    as : 'share'
})

db.shares.hasMany(db.stocks,{
    foreignKey : 'share_id',
    as : 'stock'
})
db.stocks.belongsTo(db.shares,{
    foreignKey : 'share_id',
    as : 'share'
})

db.users.hasMany(db.stocks,{
    foreignKey : 'user_id',
    as : 'stock'
})
db.stocks.belongsTo(db.users,{
    foreignKey : 'user_id',
    as : 'user'
})

db.users.hasOne(db.invested,{
    foreignKey : 'user_id',
    as : 'invested'
})
db.invested.belongsTo(db.users,{
    foreignKey : 'user_id',
    as : 'user'
})

db.users.hasMany(db.shares,{
    foreignKey : 'user_id',
    as : 'share'
})
db.shares.belongsTo(db.users,{
    foreignKey : 'user_id',
    as : 'user'
})

db.sequelize.sync({ force:false })
.then(()=>{
    console.log('Sync is done')
})

module.exports = db