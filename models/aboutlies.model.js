const mongoose = require("mongoose");

const AboutLiesSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  AboutLiesSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const AboutLies = mongoose.model("aboutlies", AboutLiesSchema);

module.exports = AboutLies;