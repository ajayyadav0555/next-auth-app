import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { getMaxListeners } from "events"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hash  token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }

        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000
            })

        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0577505453e41d",
              pass: "2af332feab7ca3"
            }
          });
        const mailOptions={
            from :"Ajayyadav4083@getMaxListeners.com",
            to:email,
            subject:emailType==="verify"? "Verify your email":"Reset your email",
            html:`<p>Click<a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to${emailType==="verify"? "Verify your email":"Reset your email"} or copy and paste the link below in your browser <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }
        const mailResponse=await transport.sendMail(mailOptions);
        return mailResponse
  
    } catch (error: any) {
        throw new Error(error.message)
    }
}