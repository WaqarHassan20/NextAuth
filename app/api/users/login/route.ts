import { connect } from "@/db/db";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(req: NextRequest) {
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
    
    const token = await jwt


  } catch (error: any) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }
}
