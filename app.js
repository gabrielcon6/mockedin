const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const headerRoutes = require('./routes/header-routes');
const usersRoutes = require('./routes/users-routes');
const experiencesRoutes = require('./routes/experiences-routes');
const educationRoutes = require('./routes/education-routes');
const othersRoutes = require('./routes/others-routes');
const fileUploadRoutes = require('./routes/document-routes');

const app = express();
app.use(express.static('public')); // the React app will be bundled and placed in the public folder

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/header', headerRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/others', othersRoutes);
app.use('/api/document', fileUploadRoutes);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });


app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    process.env.DB_URL, {useNewUrlParser: true}
  )
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
  });
  })
  .catch(err => {
    console.log(err);
  });
