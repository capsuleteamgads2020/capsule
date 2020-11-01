'use strict';

const admin = require('firebase-admin');
const express = require('express');
const { checkIfAuthenticated, checkIfIsAdmin, checkIfIsUser }  = require('../../lib/auth');
let FieldValue = require('firebase-admin').firestore.FieldValue;
const router = express.Router();

/**
 * [START GET COMMENTS]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Retrieve comments (up to ten at a time).
 */
router.get('/fetchAll/:id', checkIfIsUser, async (req, res, next) => {
    const user = await admin.firestore().collection('users').doc(req.params.id).get();
    await admin.firestore().collection('comments').where('groups', 'array-contains-any', user.data().groups).get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send(`No query data received from database!`);
            return;
        }
        const comments = [];
        snapshot.forEach(doc => {

            let comment = doc.data();
            comment.id = doc.data().id;
            comments.push(comment);
        })
        res.status(200).json(comments)
    })
    .catch(err => { 
        console.log(`Error getting comments: ${err}`);
        res.status(500).send(`Error getting comments: ${err}`);
    });
});
// [END GET COMMENTS]

/**
 * [START POST COMMENT]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Create a new comment.
 */
router.post('/addOne/', checkIfIsUser, async (req, res, next) => {
    // Add comment data to firestore
    await admin.firestore().collection('comments').add({
        comment: req.body.comment,
    })
    .then((comment) => {
        // See the UserRecord reference doc for the contents of commentRecord.
        console.log('Successfully created new comment:', comment);
        res.status(200).send(`Project added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new comment:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST COMMENT]


/**
 * [START PUT COMMENT]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Update a questions.
 */
router.put('/updateOne/:id', checkIfIsAdmin, async (req, res, next) => {
    await admin.firestore().collection('comments').doc(req.params.id).update({
        replies: admin.firestore.FieldValue.arrayUnion(req.body.reply),
    })
    .then((comment) => {
        // See the UserRecord reference doc for the contents of commentRecord.
        console.log('Successfully udated comment:', comment);
        res.status(200).send(`Project details updated successfully to database.`);
    })
    .catch((err) => {
        console.log('Error updating comment record: ', err);
        res.status(500).send(`Error updating comment record to database: ${err}`);
    });
});
// [END PUT COMMENT]

/**
 * [START GET COMMENT]
 *
 * Retrieve a comment.
 */
router.get('/fetchOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('comments').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.send(`Failed to received query data from database!`);
            return;
        }

        var notifications = doc.data().notifications.filter(notification => notification.read == false);

        let comment = doc.data();
        comment.id = doc.data().id;
        res.status(200).json(comment);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.status(500).send(`Error fetching comment record from database: ${err}`);
    })                        
});
// [END GET COMMENT]

/**
 * [START DELETE COMMENT]
 *
 * Delete a comment.
 */
router.delete('/deleteOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('comments').doc(req.params.id).delete()
    .then(doc => {
        console.log('Successfully deleted comment', doc);
        res.status(200).send(`Project with id: ${req.params.id} successfully deleted from database!`);
    })
    .catch((err) => {
        console.log('Error deleting comment', err);
        res.status(500).send(`Error deleting comment record from database: ${err}`);
    })                        
});
// [END DELETE COMMENT]

module.exports = router;