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
  const user = this.create({email,name,password:hash,role,college: id,canCreateEvent});
  return user
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
    throw Error("Password doesn't match!!!");
  }

  return user;
}
module.exports = mongoose.model("User",userSchema);


