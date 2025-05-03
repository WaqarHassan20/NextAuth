import mongoose from "mongoose";

// Define the schema for user data
const userSchema = new mongoose.Schema({
  // Username must be unique and required
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },

  // Email must be unique and required
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },

  // Password is required
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },

  // Flags for user status
  isVerified: {
    type: Boolean,
    default: false, // Not verified by default
  },

  isAdmin: {
    type: Boolean,
    default: false, // Regular user by default
  },

  // Password reset token and expiry
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,

  // Email verification token and expiry
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Create and export the User model from the schema
// NOTE: This model maps to the 'users' collection in MongoDB
const User = mongoose.model("User", userSchema);
export default User;
