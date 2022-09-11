const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  AboutUsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const AboutUs = mongoose.model("aboutus", AboutUsSchema);

module.exports = AboutUs;