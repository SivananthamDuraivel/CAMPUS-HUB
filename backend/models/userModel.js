const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin" , "teacher" , "student"],
    required: true
  },
  canCreateEvent: {
    type: Boolean,
    default: false
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year"
  },
  section: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Section" 
  }
})

userSchema.statics.register = async function(email,name,password,id,role="admin"){
  if(!email ||!name|| !password)
  {
    throw Error("All fields must be filled");
  }
  if(!validator.isEmail(email))
  {
    throw Error("Email must be valid")
  }
  if(!validator.isStrongPassword(password))
  {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({email});
  if(exists)
  {
    throw Error("Email already exists!!!!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  let canCreateEvent = false;
  if(role=="admin") canCreateEvent = true
  try {
    const user = await this.create({ email, name, password: hash, role, college: id, canCreateEvent });  // ✅ Await here
    console.log("User Created:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; 
  }
}
userSchema.statics.login = async function(email,password){
  if(!email || !password)
  {
    throw Error("All the fields must be filled!!!!");
  }

  const user = await this.findOne({email});

  if(!user)
  {
    throw Error("User doesn't exists");
  }

  const exists = await bcrypt.compare(password,user.password);
  if(!exists)
  {
    console.log("Password does not match")
    throw Error("Password doesn't match!!!");
  }

  return user;
}

module.exports = mongoose.models.User || mongoose.model("User", userSchema);



