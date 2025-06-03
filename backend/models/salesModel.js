module.exports = (sequlize,DataTypes) => {
    const Sales = sequlize.define("sales",{
        sdate : {
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
        },
        profit : {
            type : DataTypes.DOUBLE,
            allowNull : false
        }
    })
    return Sales
}