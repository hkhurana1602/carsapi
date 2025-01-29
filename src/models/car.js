const mongoose = require("mongoose");
const user = require("./user");

const CarSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        validate: [arrayLimit, "Cannot upload more than 10 images."]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {timestamps: true});

function arrayLimit(val) {
    return val.length <= 10;
}

module.exports = mongoose.model("Car", CarSchema);