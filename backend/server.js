require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = 5000;
const colors = require("colors");
const { connectDB } = require("./configs/db");
const cors = require("cors");

connectDB();

const app = express();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  origin: [
    "http://localhost:3000",
    "https://goalietask.netlify.app",
    "https://goalie.ashirwadshetye.com/",
  ],
};
app.use(cors(corsOpts));
app.use(express.json({ limit: "5mb", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
