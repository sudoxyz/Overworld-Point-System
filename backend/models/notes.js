const mongodb = require("mongoose");


const notesSchema = new mongodb.Schema({
    mentor_name: {
        type: String,
        required: true
    },
    student_id: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    coins: {
      type: Number,  // Store the coins added with each note
      default: 0,    // Default value of 0 if no coins are added
    }
})



module.exports = mongodb.model("Notes", notesSchema);