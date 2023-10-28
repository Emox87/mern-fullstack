require("dotenv").config();
const colors = require("colors");
const express = require("express");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// ROUTES
const usersRoutes = require("./routes/usersRoutes");
const goalsRoutes = require("./routes/goalsRoutes");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// PARSING THE BODY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser);

// ROUTES PATHS
app.use("/api/users", usersRoutes);
app.use("/api/goals", goalsRoutes);

// Overwriting default express errorHandler
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`.cyan.bold);
});
