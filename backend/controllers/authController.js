const User = require("../models/UserModel");
const College = require("../models/CollegeModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail")
const createToken = (_id)=>{
  return jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'});
}
const login = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.login(email,password);
    const token = createToken(user._id);
    res.status(200).json({email,token,role:user.role});
  }
  catch(error){
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
    res.status(200).json({email,token,role:"admin"});
  }
  catch(error) {
    res.status(400).json({error:error.message});
  }
}

const addTeacher = async (req, res) => {
  const { email, name, password, department} = req.body;
  try {
    const admin = await User.findById(req.user); 
    console.log(admin)
    if (admin.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to add teachers" });
    }
    let college = await College.findOne({_id:admin.college});
    const user = await User.register(email, name, password, college._id, "teacher");
    user.department = department;
    await user.save();
    const token = createToken(user._id);
    const message = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Dear ${name},</p>
  
      <p>Welcome to <strong>Campus Grid!</strong></p>
  
      <p>You have been successfully added to <strong>${college.name}</strong> on our platform. Below are your login credentials to access your account:</p>
  
      <p><strong>Email:</strong> ${email}<br>
      <strong>Temporary Password:</strong> ${password}</p>
   
      <p>Please log in using these credentials and change your password upon your first login for security purposes.</p>
  
      <p>If you encounter any issues or have any questions, feel free to reach out to our support team.</p>
  
      <p>Best regards,<br>
      <strong>Campus Grid Team</strong></p>
  
      <p style="font-size: 0.9em; color: #888;"><strong>Note:</strong> This is an automated email. Please do not reply directly to this message.</p>
    </div>
  `;  
    sendEmail(message,email);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const addStudent = async (req, res) => {
  const { email, name, password, department, year} = req.body;
  console.log(req.body)
  try {
    const admin = await User.findById(req.user); 
    console.log(admin)
    if (admin.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized to add teachers" });
    }
    let college = await College.findOne({_id:admin.college});
    const user = await User.register(email, name, password, college._id, "student");
    user.department = department;
    user.year = year;
    await user.save();
    const token = createToken(user._id);
    const message = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Dear ${name},</p>
  
      <p>Welcome to <strong>Campus Grid!</strong></p>
  
      <p>You have been successfully added to <strong>${college.name}</strong> on our platform. Below are your login credentials to access your account:</p>
  
      <p><strong>Email:</strong> ${email}<br>
      <strong>Temporary Password:</strong> ${password}</p>
  
      <p>Please log in using these credentials and change your password upon your first login for security purposes.</p>
  
      <p>If you encounter any issues or have any questions, feel free to reach out to our support team.</p>
  
      <p>Best regards,<br>
      <strong>Campus Grid Team</strong></p>
  
      <p style="font-size: 0.9em; color: #888;"><strong>Note:</strong> This is an automated email. Please do not reply directly to this message.</p>
    </div>
  `;
  
    sendEmail(message,email);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {login,register,addTeacher,addStudent};