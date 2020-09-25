const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String
  },
  exercises: [
    // {
    //   type: Schema.Types.ObjectId,
    //   ref: "Cardio"
    // }
  ]
  // resistance: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Resistance"
  //   }
  // ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
