const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true,
  },
  mobile:{
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.statics.register = async function(email,mobile,password){
  if(!email ||!mobile|| !password)
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
  if(!validator.isMobilePhone(mobile,'en-IN'))
  {
    throw Error("Mobile number is invalid!!");
  }
  const exists = await this.findOne({email});
  if(exists)
  {
    throw Error("Email already exists!!!!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  const user = this.create({email,mobile,password:hash});

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
module.exports = mongoose.model("User_details",userSchema);


