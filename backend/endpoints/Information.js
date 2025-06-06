const express = require("express");
const router = express.Router();
const Information = require("../models/Infomation");

//get information
router.get("/all", async (req, res) => {
  try {
    const information = await Information.find();
    res.json(information);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting information", error: error.message });
  }
});

//get information by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID is required" });

  try {
    const information = await Information.findById(id);
    if (!information)
      return res.status(404).jason({ message: "Information not found" });
    res.json(information);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting information", error: error.message });
  }
});

//post information
router.post("/add", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }
    const newInformation = new Information({
      title,
      description,
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
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const info = await Information.findById(id);

    if (!info) {
      return res.status(404).json({ message: "no note/information found" });
    }

    //
    const fieldsToUpdate = { title, description };
    const newValues = {};

    Object.entries(fieldsToUpdate).forEach(([key, value]) => {
      if (value !== undefined) newValues[key] = value;
    });

    if (Object.keys(newValues).length === 0) {
      return res.status(400).json({ message: "theres no values to update" });
    }

    const updateInformation = await Information.findByIdAndUpdate(
      id,
      newValues,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Information updated successfully", updateInformation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating information", error });
  }
});

// delete information
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const information = await Information.findById(id);

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
