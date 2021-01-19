const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const tokenVerification = jwt.verify(req.header('auth-token'),process.env.JWT_SECRET)
    if(!tokenVerification) res.send({message:'Invalid token'}).status(400);

    req.decoded = tokenVerification;
    next();
}

module.exports = {verifyToken};