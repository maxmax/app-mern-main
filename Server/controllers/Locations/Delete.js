const expressAsyncHandler = require("express-async-handler");
const isValid = require("../../utils/isValid.js");
const Location = require("../../models/LocationsModel");
const Users = require("../../models/UsersModel");

const DeleteLocations = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;
  isValid(userId);

  const { id } = req.body;
  isValid(id);

  // check if post exists
  const locationExists = await Location.findById(id);

  if (!locationExists) throw new Error("Location don't exist");

  try {
    const removedLocation = await Location.findByIdAndRemove(id);

    // Update users document
    await Users.findByIdAndUpdate(
      userId,
      {
        $inc: {
          locationCount: -1,
        },
      },
      {
        new: true,
      }
    );
    res.json(removedLocation);
  } catch (error) {
    res.json(error);
  }
});

module.exports = DeleteLocations;
