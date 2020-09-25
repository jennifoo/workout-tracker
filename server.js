const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models")

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { userNewUrlParser: true });

// NOTE on load to root, URL dynamically changes to include info about last workout: http://localhost:3000/?id=5f6e6ade3a46fdc57ab41603

// NOTE when creating new workout and doing put these are the errors:
/*
    api.js:20 PUT http://localhost:3000/api/workouts/undefined 404 (Not Found)
    addExercise @ api.js:20
    handleFormSubmit @ exercise.js:125
    exercise.js:129 Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0 */

app.get("/exercise", (req, res) => {
 res.sendFile(path.join(__dirname, "./public/exercise.html"));
})



app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
});


// app.put("/api/workouts/cardio", ( { body }, res) => {
//  db.Cardio.create(body)
//  .then(console.log("added" + body))
//  .catch(err => {
//   res.json(err);
// });
// })


app.put("/api/workouts/:id", (req, res) => {
  let workId = req.params.id; //5f6e6fe21e6f8ac5fa89adab
  console.log("workId: " + workId);
  console.log("/api/workouts/:id | req.body: " + JSON.stringify(req.body));

  db.Workout.findOneAndUpdate({ _id: workId }, { $push: { exercises: req.body } }, { new: true })
  .then(dbWork => {
   res.json(dbWork);
  })
  // .then(console.log("added api/workouts/cardio: " + JSON.stringify(req.body)))
  .catch(err => {
  res.json(err);
  });
  })
// 5f6e6ade3a46fdc57ab41603 lastWorkout
// GET /exercise?id=5f6e6ade3a46fdc57ab41603 200 1.368 ms - 3494
// GET /style.css 304 3.376 ms - -
// GET /api.js 304 3.540 ms - -
// GET /exercise.js 304 0.524 ms - -
// PUT /api/workouts/5f6e6ade3a46fdc57ab41603 404 14.834 ms - 176

app.post("/api/workouts", ({ body }, res) => {
  // body -----> {}
  console.log("POST: api/workouts body: " + JSON.stringify(body));
  db.Workout.create(body)
  .then(console.log("added: " + JSON.stringify(body)))
  .catch(err => {
   res.json(err);
 });
})



// These routes below are for checking whats in the tables:
          app.get("/api/cardio", (req, res) => {
           db.Cardio.find({})
           .then(dbCardio => {
             res.json(dbCardio);
           })
           .catch(err => {
             res.json(err);
           })
         });

          app.get("/api/workout", (req, res) => {
           db.Workout.find({})
           .then(dbWork => {
             res.json(dbWork);
           })
           .catch(err => {
             res.json(err);
           })
         });

         /*

         [
         {"cardio":[],"resistance":[],"_id":"5f6e6903284861c54b50a7b9","__v":0},
         {"cardio":[],"resistance":[],"_id":"5f6e691fca38e9c54f0d88a4","__v":0},
         {"cardio":[],"resistance":[],"_id":"5f6e6a203a46fdc57ab41602","__v":0},
         {"cardio":[],"resistance":[],"_id":"5f6e6ade3a46fdc57ab41603","__v":0}]

         */




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
