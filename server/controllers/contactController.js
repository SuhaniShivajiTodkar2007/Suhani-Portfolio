const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required",
    });
  }

  try {
    const savedMessage = await Message.create({ name, email, message });

    const emailResult = await sendEmail({
      userName: name,
      userEmail: email,
      userMessage: message,
    });

    return res.status(201).json({
      success: true,
      message: "Message saved successfully",
      emailSent: emailResult.sent,
      data: savedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to process contact form",
      error: error.message,
    });
  }
};

module.exports = { createMessage };
