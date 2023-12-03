const CreateLocations = require("../controllers/Locations/Create");
const DeleteLocations = require("../controllers/Locations/Delete");
const UpdateLocations = require("../controllers/Locations/Update");
const AuthHandler = require("../middlewares/Auth");

const LocationRoutes = require("express").Router();

LocationRoutes.route("/create").post(AuthHandler, CreateLocations);
LocationRoutes.route("/delete").delete(AuthHandler, DeleteLocations);
LocationRoutes.route("/update").put(AuthHandler, UpdateLocations);

module.exports = LocationRoutes;
