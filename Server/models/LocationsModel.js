const mongoose = require("mongoose");

const LocationModel = mongoose.Schema(
  {
    latitude: {
      type: String,
      default: "",
      required: [true, "Don't enter empty latitude."],
    },
    longitude: {
      type: String,
      default: "",
      required: [true, "Don't enter empty longitude."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", LocationModel);
module.exports = Location;
