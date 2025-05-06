import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Function to extract user data (specifically the user ID) from the JWT token in cookies
export const getDataFromToken = (request: NextRequest) => {
  try {
    // Retrieve the token from the request cookies; default to an empty string if not found
    const token = request.cookies.get("token")?.value || "";

    // Verify and decode the token using the secret key stored in environment variables
    const decodedToken: any = jwt.verify(token, process.env.JWT_TOKEN!);

    // Return the user ID from the decoded token
    return decodedToken.id;
  } catch (error) {
    // If an error occurs during token verification, throw a readable error message
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    // Fallback error if the caught error is not an instance of Error
    throw new Error("An unknown error occurred");
  }
};

// Gist:
// This utility function extracts the user ID from a JWT stored in cookies. It verifies the token using a secret key (JWT_TOKEN) and returns the id field from the decoded payload. If verification fails, it throws a detailed error. This is typically used for user authentication and session validation in a secure way.
