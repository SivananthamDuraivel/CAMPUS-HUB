const Year = require("../models/YearModel");
const Department = require("../models/DepartmentModel");

const addYear = async (req, res) => {
  try {
    const { yearName, departmentId } = req.body;

    if (!yearName || !departmentId) {
      return res.status(400).json({ error: "Year name and departmentId are required" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    const existingYear = await Year.findOne({ yearName, department: departmentId });
    if (existingYear) {
      return res.status(400).json({ error: "Year already exists in this department" });
    }

    const year = await Year.create({ yearName, department: departmentId });

    department.years.push(year._id);
    await department.save();

    res.status(201).json({ message: "Year added successfully", year });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllYears = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const years = await Year.find({ department: departmentId });

    res.status(200).json({ years });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getYearById = async (req, res) => {
  try {
    const { yearId } = req.params;

    const year = await Year.findById(yearId).populate("department");
    if (!year) {
      return res.status(404).json({ error: "Year not found" });
    }

    res.status(200).json({ year });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateYear = async (req, res) => {
  try {
    const { yearId } = req.params;
    const { yearName } = req.body;

    const updatedYear = await Year.findByIdAndUpdate(
      yearId,
      { yearName },
      { new: true, runValidators: true }
    );

    if (!updatedYear) {
      return res.status(404).json({ error: "Year not found" });
    }

    res.status(200).json({ message: "Year updated successfully", updatedYear });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteYear = async (req, res) => {
  try {
    const { yearId } = req.params;

    const year = await Year.findById(yearId);
    if (!year) {
      return res.status(404).json({ error: "Year not found" });
    }

    const department = await Department.findById(year.department);
    if (department) {
      department.years.pull(year._id);
      await department.save();
    }

    await year.deleteOne();

    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addYear,
  getAllYears,
  getYearById,
  updateYear,
  deleteYear
};
