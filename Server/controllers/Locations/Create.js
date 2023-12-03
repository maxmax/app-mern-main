const expressAsyncHandler = require("express-async-handler");
const Location = require("../../models/LocationsModel");
const isValid = require("../../utils/isValid.js");
const Users = require("../../models/UsersModel");

const CreateLocations = expressAsyncHandler(async (req, res) => {
  // req.user is from AuthHandler where i set the unique token for verification
  const id = req.user._id;
  const { latitude, longitude } = req.body;

  // this function checks whether the format of the id is valid or not
  isValid(id);

  // checks if content is sent from the client side
  if (!latitude && !longitude) throw new Error("No content found");

  try {
    // creating a single location using the Location model
    const location = await Location.create({
      latitude,
      longitude,
      author: id,
    });

    // update user document by updating the user's location count
    await Users.findByIdAndUpdate(
      id,
      {
        $inc: {
          locationCount: 1,
        },
      },
      {
        new: true,
      }
    );

    res.json(location);
  } catch (error) {
    res.json(error);
  }
});

module.exports = CreateLocations;
