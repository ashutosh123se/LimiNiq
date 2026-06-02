const nodemailer = require("nodemailer");

async function test() {
  try {
    console.log("Setting up transporter...");
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: "hello@liminiq.com",
        pass: "UvmZBDqWgMsL",
      },
    });

    console.log("Verifying connection...");
    await transporter.verify();
    console.log("Connection verified!");

    console.log("Sending test email...");
    const info = await transporter.sendMail({
      from: '"LIMINIQ Test" <hello@liminiq.com>',
      to: "hello@liminiq.com",
      subject: "Test Email from Script",
      text: "This is a test email.",
    });
    console.log("Email sent successfully!", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

test();
