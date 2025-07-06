const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user');
const { userAuth } = require('../../middlewares/auth');
const { validateEditData } = require('../utils/validation');
const bcrypt = require('bcrypt')
const validator = require('validator')

profileRouter.get('/profile/view',userAuth, async (req,res)=>{
    try{
       const user = req.user
       res.send(user)
   }catch(err){
       res.status(400).send("ERROR : " + err.message);
   }
})

profileRouter.patch('/profile/edit',userAuth, async(req,res) =>{
    try{
        validateEditData(req)
        const user = req.user;
        
        const allowedFeilds = ['firstName', 'lastName', 'gender', 'profileUrl', 'skills'];
        allowedFeilds.forEach((feild) => user[feild] = req.body[feild])
        await user.save();
        res.send({
            message: user.firstName + " profile edit successful",
            Data: user
        })

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

profileRouter.patch('/profile/password',userAuth, async(req,res)=>{
    try{
        const user = req.user;
        const { password, newPassword } = req.body
        const  presentPassword = user.password

        if(!validator.isStrongPassword(newPassword)){
            throw new Error('your new Password will be strong!!!!')
        }
        
        isPasswordValid = await bcrypt.compare(password, presentPassword)

        if(!isPasswordValid){
            throw new Error('Your Existing password is wrong');
        }

        const newHashPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashPassword

        user.save();
        res.send('Password changed successfully')

    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = profileRouter;