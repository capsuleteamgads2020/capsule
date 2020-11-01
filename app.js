'use strict';

// const Storage = require('@google-cloud/storage');
const admin = require('firebase-admin');
const express = require('express');
const Multer = require('multer');
const cors = require('cors')
const bodyParser = require('body-parser');
// let FieldValue = require('firebase-admin').firestore.FieldValue;
// const cookieParser = require('cookie-parser');
// Set up view engine
const app = express();

// Add service account details
var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capsuleteamapi.firebaseio.com"
});

// Automatically parse request body as through Middlewares
app.use(cors())
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(cookieParser());

// App routes
app.use('/v1/comments', require('./routes/api/comments'));
app.use('/v1/groups', require('./routes/api/groups'));
app.use('/v1/projects', require('./routes/api/projects'));
app.use('/v1/users', require('./routes/api/users'));
// app.use('/v1/accounts', require('./routes/api/accounts'));

// Set Content-Type for all responses for these routes
// app.use((req, res, next) => {
//   res.set('Content-Type', 'application/json');
//   next();
// });

// Redirect root to /home
app.get('/', (req, res) => {
    res.send('Redirected to root, contact admin!');
});

app.get('/errors', () => {
throw new Error('Test exception');
});

app.get('/logs', (req, res) => {
// console.log('Hey, you triggered a custom log entry. Good job!');
res.status(200).send(`Hey, you triggered a custom log entry. Good job!`);
});

// Start up port
app.listen( process.env.PORT || 8080, () => {
  console.log('Server started on port: ', process.env.PORT || 8080);
  // res.status(200).send(`Server started on port: ${process.env.PORT}`);
});

module.exports = app;
// https://stackoverflow.com/questions/49150917/update-fields-in-nested-objects-in-firestore-documents