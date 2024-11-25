require("dotenv").config();
const express = require("express");
const auth = require("./routes/authRoute");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
const eventRoute = require("./routes/eventRoutes");
const {mongoose} = require("mongoose");
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use("/api/auth",auth);
app.use("/api/user",userRoute)
app.use("/api/admin",adminRoute)
app.use("/api/events",eventRoute)

app.get("/",(req,res)=>{
  res.json("hello")
})

mongoose.connect(process.env.MONGO_URI)
.then(
  app.listen(process.env.PORT,()=>{
    console.log("db is connected & Server is listening at port ",process.env.PORT);
  })
)
.catch((err)=>{
  console.log(err);
})