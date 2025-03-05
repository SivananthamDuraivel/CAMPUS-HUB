const Section = require("../models/SectionModel");
const Year = require("../models/YearModel");

const addSection = async (req, res) => {
  try {
    console.log("Hello")
    const { sectionName, yearId } = req.body;
    console.log(sectionName);
    console.log(yearId);
    
    if (!sectionName || !yearId) {
      return res.status(400).json({ error: "Section name and yearId are required" });
    }

    const year = await Year.findById(yearId);
    if (!year) {
      return res.status(404).json({ error: "Year not found" });
    }

    const existingSection = await Section.findOne({ sectionName, year: yearId });
    if (existingSection) {
      return res.status(400).json({ error: "Section already exists in this year" });
    }

    const section = await Section.create({ sectionName, year: yearId });
    year.sections.push(section._id);
    await year.save();

    res.status(201).json({ message: "Section added successfully", section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSections = async (req, res) => {
  try {
    const { yearId } = req.params;

    const year = await Year.findById(yearId).populate('sections');
    if (!year) {
      return res.status(404).json({ error: "Year not found" });
    }

    res.status(200).json(year.sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ error: "Section name is required" });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    section.sectionName = sectionName;
    await section.save();

    res.status(200).json({ message: "Section updated successfully", section });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }

    const year = await Year.findById(section.year);
    if (year) {
      year.sections.pull(section._id);
      await year.save();
    }

    await section.deleteOne();

    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSection, getSections, getSection, updateSection, deleteSection };
