// Exporting an object containing all models so it can be accessed via db variable in the server file.

module.exports = {
  Cardio: require("./Cardio"),
  Resistance: require("./Resistance"),
  Workout: require("./Workout")

};
