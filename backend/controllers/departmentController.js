const College = require("../models/CollegeModel");
const Department = require("../models/DepartmentModel");
const User = require("../models/UserModel");

const addDepartment = async (req, res) => {
  try {
    let user = await User.findOne({_id:req.user._id});
    let college = await College.findOne({_id: user.college});
    const { name } = req.body;
    const collegeId = college._id;
    if (!name) {
      return res.status(400).json({ error: "Name and collegeId are required" });
    }

    const existingDepartment = await Department.findOne({ name, college: collegeId });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists in this college" });
    }

    const department = await Department.create({ name, college: collegeId });

    college.departments.push(department._id);
    await college.save();

    res.status(201).json({ message: "Department added successfully", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addDepartment };
