const express = require('express')
const connectDB = require('../src/config/database')
const app = express();
const User = require('../src/models/user');


app.post('/signup',async (req,res)=>{
    const user = new User({
        firstName: "Richa",
        lastName: "Chabbra",
        emailId: "richa.yo@gmail.com",
        password: "xyz",
        age: 24,
        gender: "Female"
    })

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Record is not saved" + err)
    }

})
//First connect to DB and and launch the server
connectDB()
    .then(()=>{
        console.log("DB is connected")
        app.listen(3000);
    })
    .catch((err)=>{
        console.error("DB is not connected")
    })

