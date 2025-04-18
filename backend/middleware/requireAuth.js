const jwt = require("jsonwebtoken");
const User_details = require("../models/UserModel");
const requireAuth = async (req,res,next) => {

  const {authorization} = req.headers;
  if(!authorization)
  {
    return res.status(401).json({error:"Authorization token required"});
  }

  const token = authorization.split(' ')[1]


  
  try {
    const {_id} = jwt.verify(token,process.env.SECRET_KEY)
    console.log(_id)
    req.user = await User_details.findOne({_id}).select('_id role college')
    console.log(req.user)
    next()
  }
  catch(error)
  {
    console.log(error )
    res.status(401).json({error:"Not Authorized"})
    next()
  }

}

module.exports = requireAuth;