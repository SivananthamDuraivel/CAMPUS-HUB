const Event = require('../models/EventsModel');
const User = require('../models/userModel');
const sendEmail = require("../utils/sendEmail")

const createEvent = async (req, res) => {
  const { title, description, eventDate, registrationDeadline, notificationPeriod, type } = req.body;
  const creatorId = req.user._id;
  const user = await User.findById(creatorId);
  if (user.role === 'admin' || (user.role === 'teacher' && user.canCreateEvent)) {
    try {
      const newEvent = new Event({
        title,
        description,
        eventDate,
        registrationDeadline,
        notificationPeriod,
        type,
        creator: creatorId,
        college: user.college,
      });
      await newEvent.save();
      const message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4caf50;">New Event: ${title}</h2>
        <p>Dear user,</p>
        <p>A new event titled <strong>"${title}"</strong> has been created.</p>
        <h3>Details:</h3>
        <ul>
          <li><strong>Description:</strong> ${description}</li>
          <li><strong>Date:</strong> ${eventDate}</li>
          <li><strong>Registration Deadline:</strong> ${registrationDeadline}</li>
        </ul>
        <p style="margin-top: 20px;">
          Make sure to register before the deadline!
        </p>
      </div>
    `;
    
      let recipients;
      if (type=="inter") {
        recipients = await User.find().select('email').lean();
      } else {
        recipients = await User.find({ college: req.user.college }).select('email').lean();
      }
      const emails = recipients.map((user) => user.email);
      console.log(emails)
      try {
        for(let i = 0 ; i < emails.length ; i++) {
          await sendEmail(message,emails[i]);
          console.log(emails[i])
        }
      }
      catch(error) {
        console.log("a")
        console.log(error.message)
      }

      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      console.log("b")
      res.status(400).json(error.message);
    }
  } else {
    console.log("c")
    res.status(403).json({ error: 'You do not have permission to create events' });
  }
};

module.exports = {createEvent}
