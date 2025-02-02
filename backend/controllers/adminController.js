const User_details = require("../models/UserModel");
const updateCanCreateEvent = async (req, res) => {
  const { userId, canCreateEvent } = req.body;
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

const fetchUsers = async (req, res) => {
  try {
    console.log(req)
    const { college, role } = req.user;
    console.log(role)
    if (!college) {
      return res.status(400).json({ error: 'User does not belong to any college' });
    }

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Access forbidden: Only admins can view users' });
    }

    const students = await User_details.find({ college, role: 'student' }).select('name email role');
    const teachers = await User_details.find({ college, role: 'teacher' }).select('name email role');
    return res.status(200).json({ students, teachers });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching users' });
  }
};

module.exports = {updateCanCreateEvent , fetchUsers}
