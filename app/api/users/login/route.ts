import { connect } from "@/db/db";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({
      email,
    });

    // user validation

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // password validation

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Token Data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // Generate JWT Token

    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    console.log("Token value : ", token);
    
    response.cookies.set("token",token, {
      httpOnly: true,
    });


    console.log("Log has reached just before the response");

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
