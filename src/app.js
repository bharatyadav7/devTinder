const express = require('express')
const connectDB = require('../src/config/database')
const app = express();
const User = require('../src/models/user');
const {signupValidation} = require('./utils/validation')
const bcrypt = require('bcrypt');


app.use(express.json()); // To parse JSON bodies
//Post api - Post /signup 
app.post('/signup',async (req,res)=>{
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
// Get Api - To fetch user data by Email
app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId

    try{
        const user = await User.find({emailId : userEmail})
        if(user.length > 0){
            res.send(user);
        }else{
            res.status(404).send("User not found");
        }
    }catch(err){
        res.status(400).send("Something went wrong" + err)
    }
   
})
// Feed Api - Get /Feed -To get all the Users from the database
app.get('/Feed',(req,res)=>{

    try{
      User.find({}).then((users)=>{
        if(users.length > 0){
            res.send(users)
        }else{
            res.status(404).send("No users found");
        }
      });
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})
//Delete Api - Delete /user
app.delete('/user',async (req,res)=>{
    try{
       const userId = req.body.userId
       const user = await User.findByIdAndDelete(userId);
       res.send("User Deleted Succesfully");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})
//Patch Api - Update User 
app.patch('/user/:userId',async (req,res)=>{
    const userId = req.params?.userId
    // const emailId = req.body.emailId
    const data = req.body
    
    try{

      const allowedUpdate = ['password','gender','profileUrl','skills']
      const isAllowed = Object.keys(data).every((k) => allowedUpdate.includes(k))
      console.log(isAllowed)
      if(!isAllowed){
        throw new Error("Update is not allowed");
      }
      if(data?.skills.length > 5){
        throw new Error("Update is not allowed");
      }
      const user = await User.findByIdAndUpdate({_id:userId},data, {runValidators:true}) // Upadate user by ID
    //   const user = await User.findOneAndUpdate({emailId : emailId} , data) //Update user by any key
      if(user){
        res.send("User details updated succesfuly")
      }else{
        res.status(404).send("User not found.")
      }
    }catch (err) {
        console.error(err);
        res.status(400).send(`Something went wrong: ${err.message}`);
      }
})

// To count the number of users in the database, we can use the countDocuments method
// To print all users in the database, we can use the find method

//User.find({}).then((Users)=>{
//     console.log("Total users in DB: " + Users);
// }).catch((err)=>{
//     console.error("Error fetching user Users: " + err);
// });


//First connect to DB and and launch the server
connectDB()
    .then(()=>{
        console.log("DB is connected")
        app.listen(3000);
    })
    .catch((err)=>{
        console.error("DB is not connected")
    })

