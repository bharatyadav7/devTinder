const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true,
        minLength :4,
        maxLength : 15
    },
    lastName:{
        type : String,
        minLength :4,
        maxLength : 15
    },
    emailId:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim: true
    },
    password:{
        type : String,
        required : true,
        minLength : 8,
        maxLength : 15
    },
    age:{
        type : Number,
        min : 18
    },
    gender:{
        type : String,
        validate(values){
            if(!['male','female','others'].includes(values)){
                throw new Error;
                
            }
        }
    },
    profileUrl:{
        type: String,
        default: "/image.png"
    },
    skills:{
        type : []
    }
},{timestamps : true});

module.exports = mongoose.model('User',userSchema);