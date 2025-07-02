const jwt = require('jsonwebtoken')
const User = require('../src/models/user')

const userAuth = async (req, res, next) => {

   try {
      const { token } = req.cookies;
      if (!token) {
         throw new Error("token is not valid!!!!!!!!!")
      }
      const isVerifiedToken = jwt.verify(token, "BharatDevTinder1#")
      const { _id } = isVerifiedToken

      const user = await User.findById(_id);
      if (!user) {
         throw new Error("Please login again")
      }
      req.user = user;
      next();

   } catch (err) {
      res.status(401).send("ERROR : " + err.message);
   }
}

module.exports = {
   userAuth
}