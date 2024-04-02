const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,

  auth: {
    user: process.env.MAIL_HOST,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendEmail(user, message) {
  try {
    let sendMessages = {
      from: "pavithranathbromag@gmail.com",
      // from: "maddison53@ethereal.email",
      to: user.email,
      subject: "Login successfully",
      text: message,
    };
    console.log("host", process.env.MAIL_HOST);

    const info = await transporter.sendMail(sendMessages);
    return {
      success: true,
      messageId: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to send email" };
  }
}

module.exports = sendEmail;
