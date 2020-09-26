const mongoose = require("mongoose");
// const moment = require('moment');
// const time = moment().format("YYYY MM D d H m");
// var time2 = time.split(' ').join(", ")

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now // Needed to set a default, otherwise "Invalid"
  },
  exercises: [
    {
      type: {
        type: String
      },
      name: {
        type: String
      },
      distance: {
        type: Number
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      duration: {
        type: Number
      }
    }
  ]
}, {
  timestamps: true
}
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
