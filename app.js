const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');

const app = express();

let mongooseClient;
let Users;

const initializeServices = async () => {
    const mongoDBURI = 'mongodb://localhost:27017/SmartyShelfApp';
    mongooseClient = await mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true });
  
    Users = mongooseClient.model('Users', new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        created: Date,
        updated: Date
    }))
}

initializeServices().catch(err => {
    console.error("Failed to initialize services:", err);
    process.exit(1);
});


app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function attachModels(req, res, next) {
    req.models = {
        Users
    };
    next();
});

app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());


app.use('/', indexRouter);
app.use('/api', userRouter);
app.use('/api/books', bookRouter);


app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke on the server!');
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;



