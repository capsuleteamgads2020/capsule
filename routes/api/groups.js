'use strict';

const admin = require('firebase-admin');
const express = require('express');
const { checkIfAuthenticated, checkIfIsAdmin, checkIfIsUser }  = require('../../lib/auth');
let FieldValue = require('firebase-admin').firestore.FieldValue;
const router = express.Router();

/**
 * [START GET GROUPS]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Retrieve groups (up to ten at a time).
 */
router.get('/fetchAll', checkIfIsUser, async (req, res, next) => {
    await admin.firestore().collection('groups').get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send(`No query data received from database!`);
            return;
        }
        const groups = [];
        snapshot.forEach(doc => {
            // let group = doc.data();
            // group.id = doc.id,

            var sum = doc.data().rating.reduce((a, b) => a + b, 0);
            var rating = sum/doc.data().rating.length;

            let group = {};
            group.id = doc.id;
            group.name = doc.data().name;
            group.description = doc.data().description;
            group.update_at = doc.data().update_at;
            group.created_at = doc.data().created_at;
            group.active = doc.data().active;        
            group.subscribers = doc.data().subscribers.length;
            group.projects = doc.data().projects.length;
            group.rating = rating;
            groups.push(group);
        })
        res.status(200).json(groups)
    })
    .catch(err => { 
        console.log(`Error getting groups: ${err}`);
        res.status(500).send(`Error getting groups: ${err}`);
    });
});
// [END GET GROUPS]

/**
 * [START POST GROUP]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Create a new group.
 */
router.post('/addOne', checkIfIsAdmin, async (req, res, next) => {
    // Add group data to firestore
    await admin.firestore().collection('groups').add({
        name: req.body.name,
        description: req.body.description,
        created_at: req.body.created_at,
        active: req.body.active,
        subscribers: [],
        projects: [],
        rating: [],
    })
    .then((group) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new group:', group);
        res.status(200).send(`Project added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new group:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST GROUP]


/**
 * [START PUT GROUP]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Update a questions.
 */
router.put('/updateOne/:id', checkIfIsAdmin, async (req, res, next) => {
    await admin.firestore().collection('groups').doc(req.params.id).update({
        name: req.body.name,
        description: req.body.description,
        active: req.body.active,
        update_at: req.body.update_at,
    })
    .then((group) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully udated group:', groups);
        res.status(200).send(`Project details updated successfully to database.`);
    })
    .catch((err) => {
        console.log('Error updating user record: ', err);
        res.status(500).send(`Error updating group record to database: ${err}`);
    });
});
// [END PUT GROUP]

/**
 * [START GET GROUP]
 *
 * Retrieve a group.
 */
router.get('/fetchOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('groups').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.send(`Failed to received query data from database!`);
            return;
        }

        var sum = doc.data().rating.reduce((a, b) => a + b, 0);
        var rating = sum/doc.data().rating.length;

        let group = {};
        group.id = doc.id;
        group.name = doc.data().name;
        group.description = doc.data().description;
        group.update_at = doc.data().update_at;
        group.created_at = doc.data().created_at;
        group.active = doc.data().active;        
        group.subscribers = doc.data().subscribers.length;
        group.projects = doc.data().projects.length;
        group.rating = rating;
        res.status(200).json(group);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.status(500).send(`Error fetching group record from database: ${err}`);
    })                        
});
// [END GET GROUP]

/**
 * [START DELETE GROUP]
 *
 * Delete a group.
 */
router.delete('/deleteOne/:id', checkIfIsAdmin, async (req, res) => {
    await admin.firestore().collection('groups').doc(req.params.id).delete()
    .then(doc => {
        console.log('Successfully deleted group', doc);
        res.status(200).send(`Project with id: ${req.params.id} successfully deleted from database!`);
    })
    .catch((err) => {
        console.log('Error deleting group', err);
        res.status(500).send(`Error deleting group record from database: ${err}`);
    })                        
});
// [END DELETE GROUP]

module.exports = router;