import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/db/db"; // Import database connection function
import User from "@/models/UserModel"; // Import User model

connect(); // Establish database connection

// Handles POST requests for email verification
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();
    const { token } = reqBody; // Extract the token from the request body

    console.log(token); // Log the token for debugging

    // Find a user with the matching token and check if the token has not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // If no valid user is found, return an error response
    if (!user) {
      return NextResponse.json({ error: "Invalid Token", status: 400 });
    }

    console.log(user); // Log the user for debugging

    // Mark the user as verified and clear the token fields
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save(); // Save the updated user

    // Return success response
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    // Log any errors and return a generic error response
    console.error("Error occurred:", error);
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// Note:
// This API route handles email verification by receiving a token from the client. It first connects to the database and checks if a user with a matching, non-expired token exists. If such a user is found, it marks their email as verified, removes the token and expiry from the database, and saves the updated user record. If no user is found or the token is invalid, it returns an error. In case of any server-side error, it responds with a 500 status.
