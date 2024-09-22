const mongodb = require("mongoose");


const playersSchema = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        required: true
    }
})



module.exports = mongodb.model("Players", playersSchema);