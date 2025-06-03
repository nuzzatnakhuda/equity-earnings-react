module.exports = (sequlize,DataTypes) => {
    const Stock = sequlize.define("stock",{
        user_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        share_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        qty :{
            type : DataTypes.FLOAT,
            allowNull:false
        },
        cost : {
            type : DataTypes.DOUBLE,
            allowNull : false
        }
    })
    return Stock
}