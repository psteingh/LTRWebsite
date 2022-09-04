const mongoose = require("mongoose");

const LieGeneralSchema = new mongoose.Schema({
  title: String,
  middle: String,
  bottom: String,
  currentUser: String,
  published: Boolean,
},
  { timestamps: false }
);

  LieGeneralSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const LieGeneral = mongoose.model("liegeneral", LieGeneralSchema);

module.exports = LieGeneral;