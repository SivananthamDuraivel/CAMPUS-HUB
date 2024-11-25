const User_details = require("../models/userModel");
const updateCanCreateEvent = async (req, res) => {
  const { userId, canCreateEvent } = req.body;
  console.log(">>>>>>>>>>"+req.user.role)
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const user = await User_details.findById(userId);
    if (!user || user.role !== "teacher") {
      return res.status(404).json({ error: "Teacher not found" });
    }

    user.canCreateEvent = canCreateEvent;
    await user.save();

    res.status(200).json({ message: `Updated teacher permission: ${canCreateEvent}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {updateCanCreateEvent}
