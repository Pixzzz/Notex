const express = require("express");
const router = express.Router();
const Information = require("../models/Infomation");
const { authenticateToken } = require("../utilities");

//get information
router.get("/all", authenticateToken, async (req, res) => {
  try {
    const information = await Information.find({ user: req.user._id });
    res.json(information);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting information", error: error.message });
  }
});

//get information by ID
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const information = await Information.findById(id);
    if (!information)
      return res.status(404).json({ message: "Information not found" });
    res.json(information);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting information", error: error.message });
  }
});

//post information
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { user } = req.user;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }
    const newInformation = new Information({
      title,
      description,
      userId: user._id,
    });

    await newInformation.save();

    return res.status(200).json({ message: "Information added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding information", error: error.message });
  }
});

//put information
router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const { user } = req.user;

    if (!title && !description) {
      return res.status(400).json({
        message: "Title or Description is required to update",
      });
    }

    const information = await Information.findById({
      _id: noteId,
      userId: user._id,
    });

    if (!information) {
      return res.status(404).json({ message: "Information not found" });
    }

    if (title) information.title = title;
    if (description) information.description = description;

    await information.save();

    return res
      .status(200)
      .json({ information, message: "Information updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating information", error });
  }
});

// delete information
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const information = await Information.findById({
      _id: id,
      userId: req.user._id,
    });

    if (!information)
      return res
        .status(404)
        .json({ message: "Theres no note/information able" });

    await Information.findByIdAndDelete(id);
    res.json({ message: "Information/Note deleted" });
  } catch (error) {
    return res.json({ message: "Error deleting the note/information", error });
  }
});

module.exports = router;
