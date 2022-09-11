const mongoose = require("mongoose");

const MusingsSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  MusingsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Musings = mongoose.model("musings", MusingsSchema);

module.exports = Musings;