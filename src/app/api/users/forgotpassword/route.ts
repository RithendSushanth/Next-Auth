// import { connect } from "@/dbConfig/dbConfig"
// import User from "@/models/userModel"
// // import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
// import { NextResponse, NextRequest } from "next/server";
// import { sendEmail } from "@/helpers/mailer";

// connect();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { email } = reqBody;

//         const user = await User.findOne({ email });

//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }

//         const resetToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

//         // Save the reset token in the user document
//         user.forgotPasswordToken = resetToken;
//         user.forgotPasswordTokenExpiry = Date.now() + 3600000;
//         await user.save();

//         await sendEmail({ email, emailType: "RESET", userId: user._id, resetToken });

//         return NextResponse.json({
//             message: "Reset token generated successfully. Check your email for instructions.",
//             success: true
//         }, { status: 200 });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// forgotpassword.ts

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Generate a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h", // Example: token expires in 1 hour
    });

    // Save the reset token in the user document
    user.forgotPasswordToken = resetToken;
    user.forgotPasswordTokenExpiry = Date.now() + 3600000;
    await user.save();

    // Send the reset password email
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "Reset token generated successfully. Check your email for instructions.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
