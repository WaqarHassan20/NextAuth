### 🧩 User Model - `models/User.ts`

This file defines the **MongoDB schema for users** using `mongoose.Schema`:

- `username`, `email`, and `password` are **required fields**.
- `username` and `email` are **unique**, preventing duplicates.
- `isVerified` and `isAdmin` are booleans used for user roles and email status.
- Includes **tokens and expiry** fields for handling password reset and email verification flows.

📌 **Tech Tip**:
- Always validate inputs and avoid duplicate schema keys.
- MongoDB will automatically map this model to a **`users` collection**.

➡️ You can now use this model in your Next.js API routes to create, read, or authenticate users.
