module.exports = (sequlize,DataTypes) => {
    const Invested = sequlize.define("invested",{
        user_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        amt : {
            type : DataTypes.DOUBLE,
            allowNull : false
        }
    })
    return Invested
}