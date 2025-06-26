const adminAuth = (req,res,next)=>{
    var token = "xyz";
    var isAuthorised = token === "xyz"
    if(!isAuthorised){
       res.status(401).send("UnAuthorized Access");
    }else{
       next();
    }   
}

const userAuth = (req,res,next)=>{
    var token = "xyzz";
    var isAuthorised = token === "xyz"
    if(!isAuthorised){
       res.status(401).send("UnAuthorized Access");
    }else{
       next();
    }   
}

module.exports = {
    adminAuth, userAuth
}