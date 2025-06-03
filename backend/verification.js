const {secretKey} = require('./controllers/userController')
const jwt = require('jsonwebtoken')

function verifyToken(req,res,next){
    const token=req.headers['authorization']
    if(!token)
        res.status(401).send({'message':'Token Not Found'})

    jwt.verify(token.split(' ')[1],secretKey,(err,decoded)=>{
        if(err)
        {
            res.status(403).send({'message':'Failed Authentication'})
            req.user_id = decoded.user_id;
        }
    })   
    next();
}
module.exports = verifyToken