const User = require("../models/userModel");
const College = require("../models/CollegeModel");
const jwt = require("jsonwebtoken");
const createToken = (_id)=>{
  return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'});
}
const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.login(email,password);
    const token = createToken(user._id);
    res.status(200).json({email,token});
  }
  catch(error)
  {
    res.status(404).json({error:error.message});
  }
}

const register = async(req,res)=>{
  const {email,name,password,collegeName} = req.body;
  try {
    let college = await College.findOne({name : collegeName})
    if(!college) {
      college = new College({name : collegeName})
      await college.save();
    }
    const user = await User.register(email,name,password,college._id);
    const token = createToken(user._id);
    res.status(200).json({email,token});
  }
  catch(error) {
    res.status(400).json({error:error.message});
  }
}

const addTeacher = async (req, res) => {
  const { email, name, password, collegeName } = req.body;
  try {
    const admin = await User.findById(req.user); 
    if (admin.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to add teachers" });
    }
    
    let college = await College.findOne({ name: collegeName });
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    const user = await User.register(email, name, password, college._id, "teacher");
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const addStudent = async (req, res) => {
  const { email, name, password, collegeName } = req.body;
  try {
    const admin = await User.findById(req.user);
    if (admin.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to add students" });
    }

    let college = await College.findOne({ name: collegeName });
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    const user = await User.register(email, name, password, college._id, "student");
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



module.exports = {login,register,addTeacher,addStudent};