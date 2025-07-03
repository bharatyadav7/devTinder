const express = require('express')
const connectDB = require('../src/config/database')
const app = express();
const cookieParser = require('cookie-parser')


app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter =  require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/',requestRouter);


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

