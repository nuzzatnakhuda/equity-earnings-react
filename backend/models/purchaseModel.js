module.exports = (sequlize,DataTypes) => {
    const Purchase = sequlize.define("purchase",{
        pdate : {
            type : DataTypes.DATE,
            allowNull:false
        },
        user_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        share_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        qty : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        rate : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        brokerage : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        gstbrok : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        security : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        other : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        net : {
            type : DataTypes.DOUBLE,
            allowNull:false
        },
        avg : {
            type : DataTypes.DOUBLE,
            allowNull:false
        }
    })
    return Purchase
}