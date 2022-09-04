const mongoose = require("mongoose");

const LieMediaSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  LieMediaSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const LieMedia = mongoose.model("liemedia", LieMediaSchema);

module.exports = LieMedia;