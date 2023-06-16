const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
