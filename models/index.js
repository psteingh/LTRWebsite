const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// Register
db.user = require("./user.model");

// Refresh Token
db.refreshToken = require("./refreshToken.model");

// LtrLie
db.ltrlies = require("./ltrlie.model");

// AboutUs
db.aboutus = require("./aboutus.model");

// Musings
db.musings = require("./musings.model");

// AboutLies
db.aboutlies = require("./aboutlies.model");

// LieBible
db.liesbible = require("./liebible.model");

// LieGeneral
db.liesgeneral = require("./liegeneral.model");

// LieMedia
db.liesmedia = require("./liemedia.model");

module.exports = db;