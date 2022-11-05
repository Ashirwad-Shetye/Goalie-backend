const express = require("express");
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv").config();
const colors = require("colors");
const { connectDB } = require("./backend/configs/db");
const cors = require("cors");
const sendMails = require("./backend/services/cron-mails");
const cron = require("node-cron");
const { sendEmail } = require("./backend/services/email");

connectDB();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  // allowedHeaders: [
  //   'Content-Type',
  // ],
  origin: ["http://localhost:3000"],
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./backend/routes/goalRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));

sendMails.start();

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
