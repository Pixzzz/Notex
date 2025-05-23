const express = require("express");
const router = express.Router();
const User = require("../models/User");

//get user
router.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
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
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding user:", error: error.message });
  }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({
          message: "Theres no user able to delete",
          error: error.message,
        });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({message: 'Error deleting the user', error: error.message})
  }
});

module.exports = router;
