const express = require('express');
const authRouter = express.Router();
const {signupValidation} = require('../utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user')

authRouter.post('/signup',async (req,res)=>{
    try{
        //Validate the Data
        signupValidation(req);
        const {firstName,lastName,emailId,password} = req.body;
        
        //Encrypt the password
        const hashPassword = await bcrypt.hash(password, 10) //10 - number of salts(how strong the password is)
        const user =  new User({
            firstName,
            lastName,
            emailId,
            password:hashPassword
        });

        await user.save();
        res.send("User added successfully");

    }catch(err){
        res.status(400).send("ERROR : " + err)
    }
})

//Post Api - Post /login
authRouter.post('/login',async (req,res)=>{
    try{
        const {emailId , password} = req.body
        if(!validator.isEmail(emailId)){
            throw new Error("Invalid Credentials");
        }

        const user = await User.findOne({emailId : emailId})
        if(!user){
            throw new Error("Invalid Credentionls");
        }
        const isValidPassword = await user.isValidHashPassword(password)

        if(isValidPassword){
            const generatedToken = await user.getJwt();
            const token = res.cookie('token', generatedToken, {expires: new Date(Date.now()+ 24 * 3600000)})
            // console.log('token', token)
            res.send("Login Successfully");
        }else{
            throw new Error("Invalid Credentiols");
        }
        
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

authRouter.post('/logout', (req,res)=>{
    res.cookie('token', ' ', {expires : new Date(Date.now())})
    res.send('logout successful')
})

module.exports = authRouter;