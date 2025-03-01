require("dotenv").config();

const express = require("express");
const auth = require("./routes/authRoute");
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
const eventRoute = require("./routes/eventRoutes");
const timetableRoute = require("./routes/timetableRoutes")
const studyMaterialRoute = require("./routes/studyMaterialRoutes");
const questionRoute  = require('./routes/questionRoutes');
const uploadFileRoute = require('./routes/uploadFileRoutes');
const departmentRoute = require('./routes/departmentRoutes');
const yearRoute = require('./routes/yearRoutes');
const sectionRoute = require('./routes/sectionRoutes');
const {mongoose} = require("mongoose");
const cors = require("cors")
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth",auth);
app.use("/api/user",userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/events",eventRoute);
app.use("/api/studyMaterial",studyMaterialRoute);
app.use("/api/upload",uploadFileRoute);
app.use("/api/questions",questionRoute)
app.use("/api/timetable",timetableRoute);
app.use("/api/department",departmentRoute);
app.use("/api/year", yearRoute);
app.use("/api/section", sectionRoute);

app.get("/",(req,res)=>{
  res.json("Campus Grid");
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