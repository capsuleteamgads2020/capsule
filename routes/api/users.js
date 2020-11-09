'use strict';

const admin = require('firebase-admin');
const express = require('express');
const { checkIfAuthenticated, checkIfIsAdmin, checkIfIsUser }  = require('../../lib/auth');
let FieldValue = require('firebase-admin').firestore.FieldValue;
const router = express.Router();

/**
 * [START GET USERS]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Retrieve users (up to ten at a time).
 */
router.get('/fetchAll', checkIfIsAdmin, async (req, res, next) => {
    await admin.firestore().collection('users').get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send(`No query data received from database!`);
            return;
        }
        const users = [];
        snapshot.forEach(doc => {

            let user = {};
            user.id = doc.data().user.id;
            user.email = doc.data().email;
            user.name = doc.data().name;
            user.phone = doc.data().phone;
            user.imageUrl = doc.data().imageUrl;
            user.created_at = doc.data().created_at;
            user.updated_at = doc.data().updated_at;
            user.projects = doc.data().projects.length;
            user.groups = doc.data().groups.length;
            user.status = doc.data().status;
            users.push(user);
        })
        res.status(200).json(users)
    })
    .catch(err => { 
        console.log(`Error getting users: ${err}`);
        res.status(500).send(`Error getting users: ${err}`);
    });
});
// [END GET USERS]

/**
 * [START POST USER]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Create a new user.
 */
router.post('/addOne/:id', async (req, res, next) => {
    // Add user data to firestore
    await admin.firestore().collection('users').doc(req.params.id).set({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        created_at: req.body.created_at,
        updated_at: '',
        projects: [],
        groups: [],
        notifications: [],
        status: req.body.status,
    })
    .then((user) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', user);
        res.status(200).send(`Project added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new user:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST USER]


/**
 * [START PUT USER]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Update a questions.
 */
router.put('/updateOne/:id', checkIfIsAdmin, async (req, res, next) => {
    await admin.firestore().collection('users').doc(req.params.id).update({
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        status: req.body.status,
    })
    .then((user) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully udated user:', user);
        res.status(200).send(`Project details updated successfully to database.`);
    })
    .catch((err) => {
        console.log('Error updating user record: ', err);
        res.status(500).send(`Error updating user record to database: ${err}`);
    });
});
// [END PUT USER]

/**
 * [START GET USER]
 *
 * Retrieve a user.
 */
router.get('/fetchOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('users').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such user!');
            res.send(`Failed to received query data from database!`);
            return;
        }

        var notifications = doc.data().notifications.filter(notification => notification.read == false);

        let user = {};
        user.id = doc.data().id;
        user.email = doc.data().email;
        user.name = doc.data().name;
        user.phone = doc.data().phone;
        user.imageUrl = doc.data().imageUrl;
        user.created_at = doc.data().created_at;
        user.updated_at = doc.data().updated_at;
        user.keywords = doc.data().keywords;
        user.projects = doc.data().projects;
        user.groups = doc.data().groups;
        user.notifications = notifications;
        user.status = doc.data().status;
        res.status(200).json(user);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.status(500).send(`Error fetching user record from database: ${err}`);
    })                        
});
// [END GET USER]

/**
 * [START DELETE USER]
 *
 * Delete a user.
 */
router.delete('/deleteOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('users').doc(req.params.id).delete()
    .then(doc => {
        console.log('Successfully deleted user', doc);
        res.status(200).send(`Project with id: ${req.params.id} successfully deleted from database!`);
    })
    .catch((err) => {
        console.log('Error deleting user', err);
        res.status(500).send(`Error deleting user record from database: ${err}`);
    })                        
});
// [END DELETE USER]

module.exports = router;