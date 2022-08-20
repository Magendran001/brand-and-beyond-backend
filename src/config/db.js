const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://beyond:beyond@cluster0.1zqilil.mongodb.net/?retryWrites=true&w=majority");

module.exports = connect;
