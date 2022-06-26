const mongoose = require("mongoose");
const { secrets } = require("./configuration/config.js")

mongoose.connect(secrets.MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connect to MongoDB")
}).catch(() => {
    console.log("An error occurred")
})
