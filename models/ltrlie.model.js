const mongoose = require("mongoose");

const LtrLieSchema = new mongoose.Schema({
  name: String,
  subject: String,
  stuff: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  LtrLieSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const LtrLie = mongoose.model("ltrlie", LtrLieSchema);

module.exports = LtrLie;