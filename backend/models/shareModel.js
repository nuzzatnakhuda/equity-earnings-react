module.exports = (sequlize,DataTypes) => {
    const Share = sequlize.define("share",{
        user_id :{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name : {
            type : DataTypes.STRING,
            allowNull:false
        }
    })
    return Share
}