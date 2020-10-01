require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const app = require('express')();

// Import routes
const userRoutes = require('./routes/user');

// Connect to DataBase
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connected to database'));

// Feeding middlewares to express:
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cookieParser());
// app.use(expressValidator());

// Set routes - this .use() method should be below others!!!
app.use(userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is up on ${port} port`));
