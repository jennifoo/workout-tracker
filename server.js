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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
 }); // Name of database: custommethoddb

// **************************************** //

// NOTE on root load, URL dynamically changes to include info about last workout: http://localhost:3000/?id=5f6e6ade3a46fdc57ab41603

// HTML ROUTE
app.get("/exercise", (req, res) => {
 res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

app.get("/stats", (req, res) => {
 res.sendFile(path.join(__dirname, "./public/stats.html"));
})


// **************************************** //

// GET: LIST ALL WORKOUTS - so front end can determine last workout (getLastWorkout)
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })

});

// PUT: WORKING - ADD EXERCISE TO WORKOUT, AFTER HITTING CONTINUE WORKOUT
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

// POST: CREATE NEW WORKOUT
app.post("/api/workouts", ({ body }, res) => {
  // body -----> {}
  // console.log("POST: api/workouts body: " + JSON.stringify(body));
  db.Workout.create(body)
  // .then(console.log("CreateWorkout_AddedBody: " + JSON.stringify(body)))
  .then(dbWork => {
    res.json(dbWork); // Front End is using dot notation to pull the id.
    // console dbWork.id -----> 5f6e91a2ba2ca1c94bee0393
  })
  .catch(err => {
   res.json(err);
 });
})

  // This route is for checking whats in the tables:
          app.get("/api/workout", (req, res) => {
           db.Workout.find({})
           .then(dbWork => {
             res.json(dbWork);
           })
           .catch(err => {
             res.json(err);
           })
         });

         /* WORKOUT WITH EXERCISES:
            [{"exercises":[
            {"type":"cardio","name":"B","distance":2,"duration":2},
            {"type":"cardio","name":"C","distance":3,"duration":3}],"_id":"5f6e79629f77cdc84101b5c2","__v":0}]
         */

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
