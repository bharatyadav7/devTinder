const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../../middlewares/auth')
const SendRequestModel = require('../models/sendRequest')
const User  = require('../models/user')

//Get Api - sendConnection Api
requestRouter.post('/send/request/:status/:toUser',userAuth, async (req,res)=>{
    try{

        const fromUser = req.user._id;
        const toUser = req.params.toUser;
        // console.log(toUser)
        const status =  req.params.status;

        const userToExist = await User.findById(toUser)
        if(!userToExist){
           return res.status(404).send("User not found")
        }
        
        const isRequestedAlready = await SendRequestModel.find({
            $or: [
                { fromUser: fromUser, toUser: toUser },
                { fromUser: toUser, toUser: fromUser }
            ]
        })
        // console.log("isRequestedAlready",isRequestedAlready)
        if(isRequestedAlready.length > 0){
           return res.status(400).send("Request already existed")
        }


        const sendRequest = SendRequestModel({
            fromUser: fromUser,
            toUser: toUser,
            status: status
        });

        await sendRequest.save();
        res.json({
            message: 'Request sent Successfully',
            Data:sendRequest
        })

    }catch(err){
        res.status(400).send('ERROR: ' + err.message)
    }
})

module.exports = requestRouter;