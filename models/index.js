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

// AboutLies
db.aboutlies = require("./aboutlies.model");

// LieBible
db.liesbible = require("./liebible.model");

// LieGeneral
db.liesgeneral = require("./liegeneral.model");

// LieMedia
db.liesmedia = require("./liemedia.model");

module.exports = db;