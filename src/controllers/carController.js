const Car = require("../models/car");
const user = require("../models/user");
const { cloudinary_js_config } = require("../utils/cloudinary");
const upload = require("../utils/upload");
const cloudinary = require("../utils/cloudinary");

const createCar = async (req, res) => {
    const { title, description, tags} = req.body;
    try{
        const imageUrls = [];
        if(req.files){
            for(const file of req.files){
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }
        }
        const newCar = new Car({
            title: title,
            description: description,
            tags: tags,
            images: imageUrls,
            userId: req.userId
        })
        await newCar.save();
        res.status(201).json(newCar);
    }catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const updateCar = async (req, res) => {
    const id = req.params.id;
    const { title, description, tags, images } = req.body;

    try{
        const imageUrls = [];
        if(rq.files){
            for(const file of req.files){
                const result = await cloudinary.uploader.upload(file.path);
                imageUrls.push(result.secure_url);
            }
        }
        const updatedCar = { 
            title: title, 
            description: description, 
            tags: tags, 
            userId: req.userId
        };

        if(imageUrls.length > 0){
            updatedCar.images = imageUrls;
        }
        const car = await Car.findByIdAndUpdate(id, updatedCar, { new: true });
        res.status(200).json(car);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const deleteCar = async (req, res) => {
    const id = req.params.id;

    try {
        await Car.findByIdAndDelete(id);
        res.status(202).json({ message: "Car deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getCars = async (req, res) => {
    try {
        const cars = await Car.find({userId: req.userId});
        res.status(200).json(cars);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const searchCars = async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const cars = await Car.find({
            userId: req.userId,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.status(200).json(cars);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createCar, updateCar, deleteCar, getCars, searchCars };