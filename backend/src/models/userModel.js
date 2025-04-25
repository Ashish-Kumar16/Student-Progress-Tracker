const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure password is required
  role: {
    type: String,
    enum: ["Student", "Instructor", "Admin"], // Ensure valid enum values
    // required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
