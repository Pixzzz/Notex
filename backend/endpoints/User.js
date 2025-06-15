const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");


//get user
router.get("/all",authenticateToken, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});


//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill the required fields" });
  }

  const userInfo = await User.findOne({ email: email });
  if (!userInfo) {
    return res.status(404).json({ Message: "User not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.status(200).json({
      error: false,
      message: "Login successful",
      accessToken,
      userInfo,
    });
  } else {
    return res
      .status(401)
      .json({ error: true, message: "Invalid credentials" });
  }
});

// post user
router.post("/add", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });
    }
    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.json({
        error: true,
        message: "This email is alredy used, pls choose another one",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const accessToken = jwt.sign({ newUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.status(200).json({
      error: false,
      newUser,
      accessToken,
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding user:", error: error.message });
  }
});

//delete user
router.delete("/delete/:id",authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "Theres no user able to delete",
        error: error.message,
      });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the user", error: error.message });
  }
});

module.exports = router;
