const mongodb = require("mongoose");


const playersSchema = new mongodb.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    }
})



module.exports = mongodb.model("Players", playersSchema);