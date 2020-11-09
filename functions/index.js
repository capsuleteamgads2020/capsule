'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
let FieldValue = require('firebase-admin').firestore.FieldValue;

// Initialize firebase app
admin.initializeApp();

/**
 * [START ADD USER ]
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
// [END ADD USER ]

/**
 * [START JOIN GROUP ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.joinGroup = functions.https.onCall(async (data, context) => {
    // ...
    // const user = await admin.firestore().collection('users').doc(context.auth.uid).get();
    return await admin.firestore().collection('users').doc(context.auth.uid).update({
        groups: admin.firestore.FieldValue.arrayUnion(data.id),
    })
    .then(async () => {
        const group = await admin.firestore().collection('groups').doc(data.id).get();
        const keywords = group.data().keywords;
        keywords.forEach(async keyword => {
            await admin.firestore().collection('users').doc(context.auth.uid).update({
                keywords: admin.firestore.FieldValue.arrayUnion(keyword),
            });
        });
        return;
    })
    .then(async () => {
        return await admin.firestore().collection('groups').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayUnion(data.user_id),
        })
    })
    .then(async () => {
        const projects = await admin.firestore().collection('projects').where('group_id', '==', data.id).get();
        projects.forEach(async project => {
            await admin.firestore().collection('projects').doc(project.id).update({
                subscribers: admin.firestore.FieldValue.arrayUnion(data.user_id),
            });
        });
        return {message: `You have successfully joined ${data.name} group!`}
    })
    // .then(() => {
    //     return {message: `You have successfully joined ${data.name} group!`}
    // })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to join ${data.name} group! Try again later`);
    })
});
// [END JOIN GROUP ]

/**
 * [START LEAVE GROUP ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.leaveGroup = functions.https.onCall(async (data, context) => {
    // ...
    // const user = await admin.firestore().collection('users').doc(context.auth.uid).get();
    return await admin.firestore().collection('users').doc(context.auth.uid).update({
        groups: admin.firestore.FieldValue.arrayRemove(data.id),
    })
    .then(async () => {
        const group = await admin.firestore().collection('groups').doc(data.id).get();
        const keywords = group.data().keywords;
        keywords.forEach(async keyword => {
            await admin.firestore().collection('users').doc(context.auth.uid).update({
                keywords: admin.firestore.FieldValue.arrayRemove(keyword),
            });
        });
        return;
    })
    .then(async () => {
        return await admin.firestore().collection('groups').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayRemove(data.user_id),
        })
    })
    .then(async () => {
        const projects = await admin.firestore().collection('projects').where('group_id', '==', data.id).get();
        return projects.forEach(async project => {
            await admin.firestore().collection('projects').doc(project.id).update({
                subscribers: admin.firestore.FieldValue.arrayRemove(data.user_id),
            });
        });
    })
    .then(() => {
        return {message: `You have successfully left ${data.name} group!`};
    })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to leave ${data.name} group! Try again later`);
    });
});
// [END LEAVE GROUP ]

/**
 * [START FUND PROJECT ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.joinProject = functions.https.onCall(async (data, context) => {
    // ...
    return admin.firestore().collection('users').doc(context.auth.uid).update({
        projects: admin.firestore.FieldValue.arrayUnion(data.id),
    })
    .then(async () => {
        return await admin.firestore().collection('projects').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayUnion(data.user_id),
        })
    })
    .then(() => {
        return {message: `You have successfully joined ${data.name} project!`}
    })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to join ${data.name} project! Try again later`);
    })
});
// [END FUND PROJECT ]

/**
 * [START UNFUND PROJECT ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.leaveProject = functions.https.onCall(async (data, context) => {
    // ...
    // this.userInfo.groups.splice(this.userInfo.groups.findIndex(grp => grp.id === group.id), 1);
    return admin.firestore().collection('users').doc(context.auth.uid).update({
        projects: admin.firestore.FieldValue.arrayRemove(data.id),
    })
    .then(async () => {
        return await admin.firestore().collection('projects').doc(data.id).update({
            members: admin.firestore.FieldValue.arrayRemove(data.user_id),
        })
    })
    .then(() => {
        return {message: `You have successfully left ${data.name} project!`};
    })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to leave ${data.name} project! Try again later`);
    });
});
// [END UNFUND PROJECT ]

/**
 * [START ADD PROJECT ]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
exports.addProject = functions.firestore.document('projects/{projectId}')
.onCreate(
    async (snap, context) => {
        const group_id = snap.data().group_id;
        const group = await admin.firestore().collection('groups').doc(group_id).get();

        group.data().members.forEach(member => {
            admin.firestore().collection('projects').doc(context.params.projectId).update({
                subscribers: admin.firestore.FieldValue.arrayUnion(member),
            })
        })
        .then(() => {
            return {message: `Success! Project group members updated.`};
        })
        .catch(() => {
            // return err;
            throw new functions.https.HttpsError(`Unable to add subscribers to ${snap.name} project! Contact admin!`);
        });
    }
);
// [END ADD PROJECT]

/**
 * [START LIKE COMMENT]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.likeComment = functions.https.onCall(async (data, context) => {
    // ...
    return admin.firestore().collection('comments').doc(data.id).update({
        likes: admin.firestore.FieldValue.arrayUnion(data.user_id),
    })
    .then(() => {
        return {message: `You liked a comment!`}
    })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to join ${data.name} project! Try again later`);
    })
});
// [END LIKE COMMENT]

/**
 * [START UNLIKE COMMENT]
 * Detect when new readings are posted,
 * use the functions.firestore.document().onCreate Cloud Functions 
 * to trigger code when a new object is created at a given path of the Cloud Firestore.
 * Use addUsers function to questions with users.:
 */
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.unlikeComment = functions.https.onCall(async (data, context) => {
    // ...
    return admin.firestore().collection('comments').doc(data.id).update({
        likes: admin.firestore.FieldValue.arrayRemove(data.user_id),
    })
    .then(() => {
        return {message: `You unliked a comment!`}
    })
    .catch(() => {
        // return err;
        throw new functions.https.HttpsError(`Unable to join ${data.name} project! Try again later`);
    })
});
// [END UNLIKE COMMENT]

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
// exports.projectSubscription = functions.https.onCall((data, context) => {
//     // ...

// });