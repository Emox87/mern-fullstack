const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc    CREATE GOAL
// @route   POST /api/goals
// @access  Private
const createGoal = asyncHandler(async (req, res) => {

    if (!req.body.text) {
      res.status(400);
      throw Error('Please add a text field');
    }

    const goal = await Goal.create({
      text: req.body.text
    });

    res.status(200).json(goal)
});

// @desc    UPDATE GOAL
// @route   PUT /api/goals
// @access  Private
const updateGoal =  asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error('Goal not found');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({updatedGoal});
});

// @desc    DELETE GOAL
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler( async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  await goal.deleteOne(goal);

  res.status(200).json({ id: req.params.id });
});

// @desc    GET GOAL
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler( async (req, res) => {
    res.status(200).json({ message: `Get goal by id ${req.params.id}` });
});

// @desc    GET GOALS
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler( async (req, res) => {
  const goals = await Goal.find()
  res.status(200).json(goals);
});

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoals,
  getGoal,
};
