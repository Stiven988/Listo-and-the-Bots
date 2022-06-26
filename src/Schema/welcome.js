const { Schema, model } = require("mongoose");

let welcome = new Schema({
    guildID: String,
    userID: String,
    date: String
})

module.exports = model("welcome", welcome);
