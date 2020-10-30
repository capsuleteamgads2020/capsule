'use strict';

const admin = require('firebase-admin');
const express = require('express');
const { checkIfAuthenticated, checkIfIsAdmin, checkIfIsUser }  = require('../../lib/auth');
let FieldValue = require('firebase-admin').firestore.FieldValue;
const router = express.Router();

/**
 * [START GET PROJECTS]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Retrieve projects (up to ten at a time).
 */
router.get('/fetchAll', checkIfIsUser, async (req, res, next) => {
    await admin.firestore().collection('projects').where('members', 'array-contains',  req.authId).get()
    .then(snapshot => {
        if (snapshot.empty) {
            res.send(`No query data received from database!`);
            return;
        }
        const projects = [];
        snapshot.forEach(doc => {

            var sumRating = doc.data().rating.reduce((a, b) => a + b, 0);
            var rating = sumRating/doc.data().rating.length;
            var contribution = doc.data().contribution.reduce((a, b) => a + b, 0);

            let project = {};
            project.id = doc.id;
            project.name = doc.data().name;
            project.description = doc.data().description;
            project.deadline = doc.data().deadline;
            project.time = doc.data().time;
            project.price = doc.data().price;
            project.currency = doc.data().currency;
            project.owner = doc.data().owner;
            project.created_at = doc.data().created_at;
            project.update_at = doc.data().update_at;
            project.active = doc.data().active;
            project.contribution = contribution;
            project.subscribers = doc.data().subscribers.length;
            project.rating = rating;
            projects.push(project);
        })
        res.status(200).json(projects)
    })
    .catch(err => { 
        console.log(`Error getting projects: ${err}`);
        res.status(500).send(`Error getting projects: ${err}`);
    });
});
// [END GET PROJECTS]

/**
 * [START POST PROJECT]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Create a new project.
 */
router.post('/addOne', checkIfIsUser, async (req, res, next) => {
    // Add project data to firestore
    await admin.firestore().collection('projects').add({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        time: req.body.time,
        price: req.body.price,
        currency: req.body.currency,
        owner: req.body.owner,
        group_id: req.body.group_id,
        contribution: [],
        members: [],
        subscribers: [],
        rating: [],
        created_at: req.body.created_at,
        update_at: '',
        active: req.body.active,
    })
    .then((project) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new project:', project);
        res.status(200).send(`Project added successfully to database`);
    })
    .catch((err) => {
        console.log('Error adding new project:', err);
        res.status(500).send(`Error adding new data to database: ${err}`);
    });
});
// [END POST PROJECT]


/**
 * [START PUT PROJECT]
 * @param {object} req Cloud Function request context.
 * @param {object} req.body The Datastore kind of the data to save.
 * @param {object} res Cloud Function response context.
 * Update a questions.
 */
router.put('/updateOne/:id', checkIfIsUser, async (req, res, next) => {
    await admin.firestore().collection('projects').doc(req.params.id).update({
        name: req.body.name,
        price: req.body.price,
        deadline: req.body.deadline,
        time: req.body.time,
        price: req.body.price,
        currency: req.body.currency,
        owner: req.body.owner,
        update_at: req.body.update_at,
        active: req.body.active,
    })
    .then((project) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully udated project:', project);
        res.status(200).send(`Project details updated successfully to database.`);
    })
    .catch((err) => {
        console.log('Error updating user record: ', err);
        res.status(500).send(`Error updating project record to database: ${err}`);
    });
});
// [END PUT PROJECT]

/**
 * [START GET PROJECT]
 *
 * Retrieve a project.
 */
router.get('/fetchOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('projects').doc(req.params.id).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.send(`Failed to received query data from database!`);
            return;
        }
        var sumRating = doc.data().rating.reduce((a, b) => a + b, 0);
        var rating = sumRating/doc.data().rating.length;
        var contribution = doc.data().contribution.reduce((a, b) => a + b, 0);

        let project = {};
        project.id = doc.id;
        project.name = doc.data().name;
        project.description = doc.data().description;
        project.deadline = doc.data().deadline;
        project.time = doc.data().time;
        project.price = doc.data().price;
        project.currency = doc.data().currency;
        project.owner = doc.data().owner;
        project.created_at = doc.data().created_at;
        project.update_at = doc.data().update_at;
        project.active = doc.data().active;
        project.contribution = contribution;
        project.subscribers = doc.data().subscribers.length;
        project.rating = rating;
        res.status(200).json(project);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
        res.status(500).send(`Error fetching project record from database: ${err}`);
    })                        
});
// [END GET PROJECT]

/**
 * [START DELETE PROJECT]
 *
 * Delete a project.
 */
router.delete('/deleteOne/:id', checkIfIsUser, async (req, res) => {
    await admin.firestore().collection('projects').doc(req.params.id).delete()
    .then(doc => {
        console.log('Successfully deleted project', doc);
        res.status(200).send(`Project with id: ${req.params.id} successfully deleted from database!`);
    })
    .catch((err) => {
        console.log('Error deleting project', err);
        res.status(500).send(`Error deleting project record from database: ${err}`);
    })                        
});
// [END DELETE PROJECT]

module.exports = router;