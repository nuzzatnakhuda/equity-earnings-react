module.exports = (sequlize,DataTypes) => {
    const Brokerage = sequlize.define("brokerage",{
        user_id : {
            type : DataTypes.INTEGER,
            allowNull:false
        },
        perc :{
            type : DataTypes.FLOAT,
            allowNull:false
        }
    })
    return Brokerage
}