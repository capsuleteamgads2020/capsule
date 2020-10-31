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
exports.addUser = functions.firestore.document('users/{userId}')
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
            return {message: `Success! User privilege granted to ${snap.email}.`}
        })
        .catch(err => {
            return err;
        })
    }
);
// [END Add Admin ]

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.joinGroup = functions.https.onCall(async (data, context) => {
    // ...
    return admin.firestore().collection('users').doc(context.auth.uid).update({
        groups: admin.firestore.FieldValue.arrayUnion({id: data.id, name: data.name}),
    })
    .then(async () => {
        await admin.firestore().collection('groups').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayUnion(data.user_id),
        })
    })
    .then(() => {
        return {message: `You have successfully joined ${data.name} group!`}
    })
    .catch(err => {
        // return err;
        throw new functions.https.HttpsError(`Unable to join ${data.name} group! Try again later`);
    })
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.leaveGroup = functions.https.onCall(async (data, context) => {
    // ...
    // this.userInfo.groups.splice(this.userInfo.groups.findIndex(grp => grp.id === group.id), 1);
    return admin.firestore().collection('users').doc(context.auth.uid).update({
        groups: admin.firestore.FieldValue.arrayRemove(data),
    })
    .then(async () => {
        await admin.firestore().collection('groups').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayRemove(data.user_id),
        })
    })
    .then(() => {
        return {message: `You have successfully left ${data.name} group!`};
    })
    .catch(err => {
        // return err;
        throw new functions.https.HttpsError(`Unable to leave ${data.name} group! Try again later`);
    })
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
// exports.projectSubscription = functions.https.onCall((data, context) => {
//     // ...

// });