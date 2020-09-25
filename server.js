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

app.get("/exercise", (req, res) => {
 res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

// app.post("/api/workouts", (req, res) => {
//
// });

app.put("/api/workouts/cardio", ( { body }, res) => {
 db.Cardio.create(body)
 .then(console.log("added" + body))
 .catch(err => {
  res.json(err);
});
})

// app.put("/api/workouts/resistance", (req, res) => {
//
// })


app.get("/api/cardio", (req, res) => {
 db.Cardio.find({})
 .then(dbCardio => {
   res.json(dbCardio);
 })
 .catch(err => {
   res.json(err);
 })
})

// app.get("/exercise?", (req, res) => {
//
// })



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
