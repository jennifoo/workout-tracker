const API = {
  // GET LAST WORKOUT
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts"); // Gets all workouts
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1]; // Grabs the last workout
  },
  // ADD EXERCISE
  async addExercise(data) {
    // location.search references the param in the URL.
    const id = location.search.split("=")[1];

    // ID is the workout id
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  // CREATE WORKOUT
  // Empty object being passed
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },
  // GET WORKOUTS IN RANGE
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
