const mongodb = require("mongoose");


const coinSchema = new mongodb.Schema({
    player_id: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
})



module.exports = mongodb.model("Coins", coinSchema);