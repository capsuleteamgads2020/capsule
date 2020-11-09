'use strict';

const admin = require('firebase-admin');
const express = require('express');
const { checkIfAuthenticated, checkIfIsAdmin, checkIfIsUser }  = require('../../lib/auth');
const { sendUploadToGCS, sendUploadsToGCS, multer, getPublicUrl } = require('../../lib/files');
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
    // const keywords = user.data().keywords;
    // const keywords = ['cancer'];
    await admin.firestore().collection('comments').where('keywords', 'array-contains-any', user.data().keywords).get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send(`No query data received from database!`);
            return;
        }
        const comments = [];
        snapshot.forEach(doc => {
            let comment = doc.data();
            comment.id = doc.id;
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
    await admin.firestore().collection('comments').add(req.body)
    .then((comment) => {
        // See the UserRecord reference doc for the contents of commentRecord.
        console.log('Successfully created new comment:', comment.id);
        res.status(200).send(`Project added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new comment:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST COMMENT]

/**
 * [START POST REPLY]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Create a new comment.
 */
router.post('/addReply/', checkIfIsUser, async (req, res, next) => {
    // Add reply data to firestore
    await admin.firestore().collection('comments').doc(req.body.comment_id).update({
        replies: admin.firestore.FieldValue.arrayUnion(req.body),
    })
    .then(() => {
        // See the UserRecord reference doc for the contents of commentRecord.
        res.status(200).send(`Reply added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new comment:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST REPLY]

/**
 * [START POST File]
 *
 * Create a request. If an image is uploaded, add public URL from cloud storage to firestore
 * @param {object} req Cloud Function request context.
 * @param {object} req.file The Datastore kind of the data to save, e.g. "Transcript".
 * Destrcuture req.file using const {fieldname, fieldname, encoding, mimetype, buffer, size} = req.file
 * @param {string} req.file.fieldname The Datastore kind of the data to save, e.g. "file".
 * @param {string} req.file.originalname The Datastore kind of the data to save, e.g. "file.jpg".
 * @param {string} req.file.encoding The Datastore kind of the data to save, e.g. "7bit".
 * @param {string} req.file.mimetype The Datastore kind of the data to save, e.g. "image/jpg".
 * @param {string} req.file.buffer The Datastore kind of the data to save, e.g. "<Buffer * * * ...>".
 * @param {string} req.file.size The Datastore kind of the data to save, e.g. "104087".
 * @param {object} res Cloud Function response context.
 * @return {string}file  public url
 * PS: For updating nested objects in filePublicUrl, 
 * "dot notation" was used to reference nested fields 
 * within the document when call update() was called
 * Refer to this link: https://stackoverflow.com/a/54580948
 */
router.post('/:id/file', checkIfIsUser, multer.array('files'), sendUploadsToGCS, async (req, res) => {
    if (!req.files) {
        return res.status(400).send("Please choose file to upload!");
    }
    else {
        const publicUrls = [];
        req.files.forEach(file => {
            let publicUrl = {};
            publicUrl['originalname'] = file.originalname;
            publicUrl['cloudStorageObject'] = file.cloudStorageObject;
            publicUrl['cloudStoragePublicUrl'] = file.cloudStoragePublicUrl;
            publicUrls.push(publicUrl);
        })
        // console.log(publicUrls);
        res.status(200).json(publicUrls);
    }
});
// [END POST File]


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