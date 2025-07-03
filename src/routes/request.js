const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../../middlewares/auth')

//Get Api - sendConnection Api
requestRouter.post('/sendConnection',userAuth,(req,res)=>{
    const user = req.user;
    res.send(user.firstName + ' send the request.')
})

module.exports = requestRouter;