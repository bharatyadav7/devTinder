const mongoose = require('mongoose');
const validator = require('validator');
const webToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        trim: true,
        validate(values){
            if(!validator.isEmail(values)){
                throw new Error("Email is not valid " + values)
            }
        }
    },
    password:{
        type : String,
        required : true,
        validate(values){
            if(!validator.isStrongPassword(values)){
                throw new Error("Enter strong password " + values)
            }
        }
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
        validate(values){
            if(!validator.isURL(values)){
                throw new Error("URL is not valid " + values)
            }
        }
    },
    skills:{
        type : []
    }
},{timestamps : true});

userSchema.methods.getJwt = async function (){
      const user = this;
      const token = await webToken.sign({_id : user._id}, "BharatDevTinder1#", {expiresIn : '1d'})

      return token;
}

userSchema.methods.isValidHashPassword = async function(passwordSendByUser){
    const user = this;

    const isValidPassword = await bcrypt.compare(passwordSendByUser, user.password);
    return isValidPassword;
}

module.exports = mongoose.model('User',userSchema);