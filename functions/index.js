'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
let FieldValue = require('firebase-admin').firestore.FieldValue;

// Initialize firebase app
admin.initializeApp(functions.config().firebase);

/**
 * [START Add Users ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
exports.addAdmin = functions.firestore.document('users/{userId}')
.onCreate(
    async (snap, context) => {
        // get user and add custom claim (admin)
        return admin.auth().getUser(context.params.userId)
        .then(user => {
            if (user.customClaims && (user.customClaims).isUser === true) {
                return;
            }
            // eslint-disable-next-line consistent-return
            return admin.auth().setCustomUserClaims(user.uid, {
                isUser: true,
            });
        })
        .then(() => {
            return {message: `Success! user and asmin privilege granted to ${snap.email}.`}
        })
        .catch(err => {
            return err;
        })
    }
);
// [END Add Admin ]

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
// exports.groupSubscription = functions.https.onCall((data, context) => {
//     // ...

// });

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
// exports.projectSubscription = functions.https.onCall((data, context) => {
//     // ...

// });