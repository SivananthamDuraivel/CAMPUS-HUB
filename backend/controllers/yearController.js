const Year = require("../models/YearModel");
const Department = require("../models/DepartmentModel");

const addYear = async (req, res) => {
  try {
    const { yearName, departmentId } = req.body;

    if (!yearName || !departmentId) {
      return res.status(400).json({ error: "Year name and departmentId are required" });
    }

    // Find the department by the departmentId (no need to wrap it in an object)
    const department = await Department.findById(departmentId);  // Fix here
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Check if the year already exists in the department
    const existingYear = await Year.findOne({ yearName, department: departmentId });
    if (existingYear) {
      return res.status(400).json({ error: "Year already exists in this department" });
    }

    // Create the new year
    const year = await Year.create({ yearName, department: departmentId });
    
    // Add the new year to the department's years list
    department.years.push(year._id);
    await department.save();

    res.status(201).json({ message: "Year added successfully", year });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addYear };
