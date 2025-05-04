import { NextRequest, NextResponse } from "next/server";
import User from "@/models/UserModel.js";
import bcrypt from "bcrypt";
import { connect } from "@/db/db";

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exist //
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password //

    // const hashedPassword = await bcrypt.hash(password, 10);// other approach is //

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json(
      { error: errorMessage },

      { status: 500 }
    );
  }
}
