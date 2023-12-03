const expressAsyncHandler = require("express-async-handler");
const isValid = require("../../utils/isValid.js");
const Location = require("../../models/LocationsModel");

const UpdateLocations = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  isValid(userId);

  const { id } = req.body;
  isValid(id);

  const location = await Location.findById(id);

  if (!location) throw new Error("Location does not exist!");

  try {
    const location = await Location.findByIdAndUpdate(
      id,
      {
        ...req.body,
        author: userId,
      },
      { new: true }
    )
      .populate("author")
    res.json(location);
  } catch (error) {
    res.json(error);
  }
});

module.exports = UpdateLocations;
