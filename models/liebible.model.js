const mongoose = require("mongoose");

const LieBibleSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  LieBibleSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const LieBible = mongoose.model("liebible", LieBibleSchema);

module.exports = LieBible;