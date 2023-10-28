const express = require("express");
const router = express.Router();

const {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoals,
  getGoal,
} = require("../controllers/goalsController");

router.route("/").get(getGoals).post(createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;
