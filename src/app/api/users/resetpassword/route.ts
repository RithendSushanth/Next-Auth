// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { token, password, confirmPassword } = reqBody;

//         // verify reset token
//         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

//         // check if  authenticated
//         if(!decodedToken || !decodedToken.userId) {
//             return NextResponse.json({ error: "Invalid token" }, { status: 400 });
//         }
//         // Check if the user exists
//     const user = await User.findById(decodedToken.userId);

// }


import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

interface DecodedToken extends JwtPayload {
    userId: string;
  }
  
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password, confirmPassword } = reqBody;

    // Verify the reset token
    const decodedToken = jwt.verify(token, process.env.RESET_TOKEN_SECRET!) as DecodedToken;

    // Check if the token is valid
    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Check if the user exists
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Check if the reset token is valid
    if (user.forgotPasswordToken !== token || user.forgotPasswordTokenExpiry < Date.now()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Validate the password and confirmPassword
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
