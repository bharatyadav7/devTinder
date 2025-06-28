const express = require('express')
const connectDB = require('../src/config/database')
const app = express();
const User = require('../src/models/user');

app.use(express.json()); // To parse JSON bodies

//Post api - Post /signup 
app.post('/signup',async (req,res)=>{
    // const user = new User({
    //     firstName: "Richa",
    //     lastName: "Chabbra",
    //     emailId: "richa.yo@gmail.com",
    //     password: "xyz",
    //     age: 24,
    //     gender: "Female"
    // })

    const user =  new User(req.body);

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Record is not saved" + err)
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
app.patch('/user',async (req,res)=>{
    const userId = req.body.userId
    const emailId = req.body.emailId
    data = req.body
    
    try{
      const user = await User.findByIdAndUpdate({_id:userId},data) // Upadate user by ID
    //   const user = await User.findOneAndUpdate({emailId : emailId} , data) //Update user by any key
      if(user){
        res.send("User details updated succesfuly")
      }else{
        res.status(404).send("User not found.")
      }
    }catch(err){
        res.status(400).send("Something went wrong");
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

