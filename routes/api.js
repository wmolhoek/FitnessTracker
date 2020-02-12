const Workout = require("../models/workout");
const path = require("path");

module.exports = function (app) {
  app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  app.get("/api/workouts", function (req, res) {
    Workout.find({})
      .then(function (Workout) {
        res.json(Workout);
      })
      .catch(function (err) {
        console.log(err)
      })
  });

  app.get("/api/workouts/range", function (req, res) {
    Workout.find({})
      .then(function (Workout) {
        res.json(Workout)
      })
      .catch(function (err) {
        console.log(err)
      })
  });

  app.post("/api/workouts/", function (req, res) {
    Workout.create({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        console.log(err)
      })
  });

  app.put("/api/workouts/:id", function ({ excerciseList, params }, res) {
    console.log(excerciseList);
    Workout.findByIdAndUpdate(
      params.id,
      {
        $push: { exercises: excerciseList }
      },
      { new: true, runValidators: true }
    )
      .then(function (Workout) {
        console.log(Workout);
        res.json(Workout);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};