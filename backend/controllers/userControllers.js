const {mongoose} = require("mongoose");
const User_details = require("../models/userModel")
const getUser = async (req,res)=>{
  const {email} = req.params;
  // if(!mongoose.Types.ObjectId.isValid(id))
  // {
  //   return res.status(404).json({error: "No such user"});
  // }
  const userDetails = await User_details.findOne({email:email});
  if(!userDetails)
  {
    return res.status(404).json({error: "No such User"});
  }

  return res.status(200).json(userDetails);
}

module.exports = {getUser}