const mongodb = require("mongoose");


const gamesSchema = new mongodb.Schema({
    id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongodb.model("Games", gamesSchema);