import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    const token = response.cookies.get("token");
    console.log("Token value before logout : ", token);

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    console.log("Token value after logout : ", token);
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
