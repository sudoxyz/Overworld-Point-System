const mongodb = require("mongoose");


const scoreSchema = new mongodb.Schema({
    id: {
        type: Number,
        required: false
    },
    player_id: {
        type: String,
        required: true
    },
    game_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    score: {
        type: Number,
        required: true
    },
    place: {
        type: Number,
        required: true
    }
})



module.exports = mongodb.model("Scores", scoreSchema);