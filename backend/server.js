const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = 5000;
const colors = require('colors');
const { connectDB } = require('./configs/db');
const cors = require('cors');

connectDB();

const app = express();
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    // allowedHeaders: [
    //   'Content-Type',
    // ],
    origin: [ 'http://localhost:3000', 'https://goalietask.netlify.app']

};
app.use(cors(corsOpts));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));