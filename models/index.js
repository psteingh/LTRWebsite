const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// Register
db.user = require("./user.model");

// Role
db.role = require("./role.model");

// Refresh Token
db.refreshToken = require("./refreshToken.model");

// LtrLie
db.ltrlies = require("./ltrlie.model");

db.ROLES = ["user", "admin"];

module.exports = db;