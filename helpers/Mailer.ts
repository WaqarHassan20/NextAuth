// Backend using appraoch to send email //
// domain.com/veriytoken/assdfjl //

// Frontend using appraoch to send email //
// domain.com/veriytoken?token=assdfjl //

import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import nodeMailer from "nodemailer";

interface SendMailParams {
  email: string;
  mailType: string;
  userId: string;
}

export const sendMail = async ({ email, mailType, userId }: SendMailParams) => {
  try {
    // Create a hashed token using bcrypt
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (mailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (mailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USERVALUE_IN_NODEMAILER,
        pass: process.env.PASSWORD_IN_NODEMAILER,
      },
    });

    const mailOptions = {
      from: "somerandom@gmail.com",
      to: email,
      subject:
        mailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${
        mailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error sending email: ${error.message}`);
    } else {
      throw new Error("Error sending email: Unknown error");
    }
  }
};
