const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware.js");
// User signup route
router.post("/signup", userController.signup);

// User login route
router.post(
  "/login",
  (req, res, next) => {
    console.log("Login Request Body:", req.body);
    next();
  },
  userController.login,
);

// In routes/userRoutes.js (add to existing file)
router.get("/me", authMiddleware, userController.getUserInfo);
router.put("/update-profile", authMiddleware, userController.updateProfile);
router.put("/update-password", authMiddleware, userController.updatePassword);

module.exports = router;
