require("dotenv").config(); // load .env file
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
// MongoDB connection
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

console.log("NODE_ENV: ", process.env.NODE_ENV);

// connect to database
connectDB();
// Middleware
// custom middleware logger
app.use(logger);
//cors: Cross-Origin Resource Sharing
app.use(cors(corsOptions));
// built-in middleware to handle json data
app.use(express.json());
// built-in middleware to handle urlencoded data in other words
// form data:"application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));
// built-in middleware to handle cookies
app.use(cookieParser());

// static files
app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/UserRoutes"));
app.use("/notes", require("./routes/noteRoutes"));
// // get 404 route
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// Mongoose setup
const PORT = process.env.PORT || 3500;

mongoose.set("strictQuery", true); // strictQuery: true

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
