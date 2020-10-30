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

// Initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capsulebackend.firebaseio.com"
});

// documentRef.update(
//   'array', Firestore.FieldValue.arrayUnion('foo')
// ).then(() => {
//   return documentRef.get();
// }).then(doc => {
//   // doc.get('array') contains field 'foo'
// });
// admin.firestore().collection('cards').doc('BdSxtZL8V4S576i2BTRs').set({});
// admin.firestore().collection('cards').doc('BdSxtZL8V4S576i2BTRs').update({
//   group: admin.firestore.FieldValue.arrayUnion({ back: 'foo', front: 'bar' })
// })
console.log('Hello')

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

// Tests routes
// app.use('/v1/students', require('./routes/api/students'));
// app.use('/v1/admins', require('./routes/api/admins'));
// app.use('/v1/schools', require('./routes/api/schools'));
// app.use('/v1/moderators', require('./routes/api/moderators'));
// app.use('/v1/accounts', require('./routes/api/accounts'));
// app.use('/v1/tests', require('./routes/api/tests'));
// app.use('/v1/notes', require('./routes/api/notes'));
// app.use('/v1/users', require('./routes/api/users'));
// app.use('/v1/forums', require('./routes/api/forums'));
// app.use('/v1/comments', require('./routes/api/comments'));
// app.use('/v1/lessons', require('./routes/api/lessons'));
// app.use('/v1/questions', require('./routes/api/questions'));

// app.use(function (err, req, res, next) {
//   console.log('This is the invalid field ->', err.field)
//   next(err)
// })

// Set Content-Type for all responses for these routes
// app.use((req, res, next) => {
//   res.set('Content-Type', 'application/json');
//   next();
// });

// app.get('/', async (req, res) => {
//   res.render('index');
// })

// Redirect root to /home
app.get('/', (req, res) => {
    res.send('Redirected to root, contact admin!');
});

app.get('/errors', () => {
throw new Error('Test exception');
});

app.get('/logs', (req, res) => {
console.log('Hey, you triggered a custom log entry. Good job!');
res.sendStatus(200);
});

// Start up port
app.listen( process.env.PORT || 8080, () => {
  console.log('Server started on port: ', process.env.PORT || 8080);
});

module.exports = app;
// https://stackoverflow.com/questions/49150917/update-fields-in-nested-objects-in-firestore-documents