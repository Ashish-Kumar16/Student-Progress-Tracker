const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      console.log("Signup failed: Missing required fields", {
        name,
        email,
        password,
      });
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    let user = await User.findOne({ email });
    if (user) {
      console.log("Signup failed: User already exists", { email });
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();
    console.log("User created successfully", { email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      console.log("Login failed: Missing email or password", {
        email,
        password,
      });
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found", { email });
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Login failed: Incorrect password", { email });
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Login successful", { email });

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// In userController.js (add to existing file)
const getUserInfo = async (req, res) => {
  try {
    // req.user is set by authMiddleware which contains the decoded JWT payload
    const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
    if (!user) {
      console.log("User info failed: User not found", { userId: req.user.id });
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User info retrieved successfully", { userId: req.user.id });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get user info error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Update exports
module.exports = { signup, login, getUserInfo, updatePassword, updateProfile };
