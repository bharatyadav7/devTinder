const validator = require('validator');

function signupValidation(req){
   const {firstName, lastName , emailId, password} = req.body;

   if(!firstName || !lastName){
    throw new Error("Name is not valid");
   }else if(!validator.isEmail(emailId)){
    throw new Error("Email is not valid");
   }else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password");
   }
}

function validateEditData(req){
    // console.log('reqqqq',req)
    const isEditAllowed = ['firstName', 'lastName', 'gender', 'profileUrl', 'skills'];
    const isEdit = Object.keys(req.body).every((feild)=> isEditAllowed.includes(feild));
    if(!isEdit){
        throw new Error("you can't edit this feild")
    }
    const {firstName,lastName, gender, profileUrl, skills} = req.body
    if(!(firstName || lastName)){
        throw new Error("Name is not valid");
    }else if(!['male','female','other'].includes((gender).toLowerCase())){
        throw new Error("Gender is not valid");
    }else if(!validator.isURL(profileUrl)){
        throw new Error("Image URl is not valid");
    }else if(skills.length > 5){
        throw new Error('you can not add more than 5 skills')
    }
    
}

module.exports = {
    signupValidation, validateEditData
}