const College = require("../models/CollegeModel");
const Department = require("../models/DepartmentModel");
const User = require("../models/UserModel");

const addDepartment = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let college = await College.findById(user.college);
    const { name } = req.body;
    const collegeId = college._id;

    if (!name) {
      return res.status(400).json({ error: "Department name is required" });
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
    res.status(500).json({ error: error.message })
  }
};


const getAllDepartments = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let college = await College.findById(user.college).populate("departments");

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    res.status(200).json({ departments: college.departments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Department name is required" });
    }

    const department = await Department.findByIdAndUpdate(
      departmentId,
      { name },
      { new: true }
    );

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const college = await College.findById(department.college);
    if (college) {
      college.departments.pull(department._id);
      await college.save();
    }

    await department.deleteOne();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
