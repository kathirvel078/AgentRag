const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

/*
Middlewares
*/
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

/*
Global Error Handler
*/
app.use(errorHandler);


/*
Health Check Route
*/
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BookMind AI Backend Running"
  });
});

module.exports = app;