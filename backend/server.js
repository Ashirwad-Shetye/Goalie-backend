const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const colors = require('colors');
const { connectDB } = require('./configs/db');
const cors = require('cors');
const sendMails = require('./services/cron-mails')
const cron = require('node-cron');
const { sendEmail } = require('./services/email');

connectDB();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    // allowedHeaders: [
    //   'Content-Type',
    // ],
    origin: [ 'http://localhost:3000' ]

  };
  
 
const app = express();
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

sendMails.start();

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));