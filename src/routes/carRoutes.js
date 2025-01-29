const express = require("express");
const {createCar, updateCar, deleteCar, getCars, searchCars} = require("../controllers/carController");

const auth = require("../middlewares/auth");
const upload = require("../utils/upload");
const car = require("../models/car");
const carRouter = express.Router();

carRouter.get("/", auth, getCars);
carRouter.post("/", auth, upload.array("image", 10), createCar);
carRouter.put("/:id", auth, upload.array("image", 10), updateCar);
carRouter.delete("/:id", auth, deleteCar);
carRouter.get("/search", auth, searchCars);

module.exports = carRouter;