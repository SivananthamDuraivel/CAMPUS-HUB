const User_details = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createToken = (_id)=>{
  return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'});
}
const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User_details.login(email,password);
    const token = createToken(user._id);
    res.status(200).json({email,token});
  }
  catch(error)
  {
    res.status(404).json({error:error.message});
  }
}

const register = async(req,res)=>{
  const {email,name,password} = req.body;
  try {
    const user = await User_details.register(email,name,password);
    const token = createToken(user._id);
    res.status(200).json({email,token});
  }
  catch(error) {
    res.status(400).json({error:error.message});
  }
}



module.exports = {login,register};