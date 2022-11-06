const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const colors = require('colors');
const { connectDB } = require('./configs/db');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors({
    origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));