const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");  

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowedFormats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }]
    }
});



const upload = multer({
    storage: storage
});

module.exports = upload;