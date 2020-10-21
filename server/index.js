require('dotenv').config();

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = require('express')();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');

// Connect to DataBase
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('connected to database'));

// Feeding middlewares to express:
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

// Set routes - these methods should be below others .use() methods!!!
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(braintreeRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is up on ${port} port`));
