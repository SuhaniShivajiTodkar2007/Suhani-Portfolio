const nodemailer = require("nodemailer");

const isMailConfigured = () =>
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.OWNER_EMAIL;

const sendEmail = async ({ userName, userEmail, userMessage }) => {
  if (!isMailConfigured()) {
    return { sent: false, reason: "SMTP configuration is missing" };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.OWNER_EMAIL,
        replyTo: userEmail,
        subject: `New Portfolio Message from ${userName}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${userMessage}</p>
        `,
      }),
      transporter.sendMail({
        from: `"Suhani Shivaji Todkar" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: "Thanks for reaching out!",
        html: `
          <p>Hi ${userName},</p>
          <p>Thank you for contacting me through my portfolio website. I received your message and will get back to you soon.</p>
          <p><strong>Your message:</strong> ${userMessage}</p>
          <p>Best regards,<br/>Suhani Shivaji Todkar</p>
        `,
      }),
    ]);
    return { sent: true };
  } catch (error) {
    return { sent: false, reason: error.message };
  }
};

module.exports = sendEmail;
