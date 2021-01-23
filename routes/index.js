const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {verifyToken} = require('../middlewares')

const user = require('../models/user');

router.post('/findUser',async(req,res)=>{
    try {
        const foundUser = await user.findOne({email: req.body.email});
        res.send({message: foundUser}).status(200)
    } catch (error) {
        res.send({message: error}).status(400)
    }

})

router.post('/createUser',async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt)
    try {
        const newUser = new user({
            email: req.body.email,
            password: req.body.password
        })
        const createdUser = await newUser.save();
        res.send(createdUser).status(201);
    } catch (error) {
        res.send(error).status(400);
    }
})

router.post('/login',async (req,res)=>{
    const findUser = await user.findOne({email: req.body.email});
    if(!findUser) res.send({message:"User not found"}).status(400);
    
    const password = findUser.password;
    const comparePasswords = bcrypt.compareSync(req.body.password,password);

    if(!comparePasswords) res.send({message:'Tu contraseña es incorrecta sal de aqui'}).status(409);

    const jsonwebtoken = jwt.sign({findUser},process.env.JWT_SECRET);

    res.send({token : jsonwebtoken}).status(200).json(jsonwebtoken)
    
})

router.post('/getRecord',verifyToken,async(req,res) =>{
    try {
        const record = await user.findOne({email:req.body.email});;
    res.send({record : record.record}).status(200)
    } catch (error) {
        res.send(error).status(400);
    }
    
})

router.patch('/newRecord',verifyToken,async(req,res)=>{
    try {
        const findUser = await user.updateOne({email: req.body.email},{$set:{
            record: req.body.record
        }});
        res.send(findUser).status(200);
    } catch (error) {
        res.send(error).status(400);
    }
    

})

router.get('/bestScore',async(req,res)=>{
    try {
        const bestUser = await user.find().sort({record : -1}).limit(1)  // give me the max
    res.send(bestUser).status(200);
    } catch (error) {
        res.send({message:error}).status(400);
    }
    
})
module.exports = router;