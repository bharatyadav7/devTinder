const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://BharatDB:NqpALzuZUe2gCdpx@bharatdb.lhwsmul.mongodb.net/devTinder');
}

module.exports = connectDB;