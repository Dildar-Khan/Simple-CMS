const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
// const cors = require('cors');
// const createError = require('http-errors');
const createPostRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const mongoDBUrl =
  process.env.MONGODB_URI ||
  'mongodb+srv://Dildar:khan@cluster0-vthcd.mongodb.net/CMS-Database?retryWrites=true&w=majority';

const app = express();

mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then((db) => {
    console.log('Database is connected now');
  })
  .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));
app.use('/', express.static(path.join(__dirname, 'angular')));
// app.use(cors());

// app.use((req, res, next) => {
//   console.log('first middleware');
//   next();
// });

// app.use((req, res, next) => {
//   res.send('response form server');
// });

app.use('/api/posts', createPostRoutes);
app.use('/api/user', userRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
//   next();
// });

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err.status);
// });

module.exports = app;
