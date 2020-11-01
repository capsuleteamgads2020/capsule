'use strict'

const admin = require('firebase-admin');

/**
 * [START Get Token]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getAuthToken = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken = req.headers.authorization.split(' ')[1];
        // console.log(req.authToken);
    } else {
        req.authToken = null;
    }
    next();
};
// [END Get Token]

/**
 * [START Check Auth]
 *
 * Define Auth Check.
 */
function checkIfAuthenticated(req, res, next) {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal server error'});
            return res.status(401).send({ error: `${error} occured!`, message: 'You are not authorized to make this request' });
            // return res.status(401).send({ error: "You are not authorized to make this request" });
        }
    });
}
// [END Auth Check]

/**
 * [START Check Admin]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// Check if is admin
function checkIfIsAdmin(req, res, next) {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            // console.log(userInfo.isAdmin)
            if (userInfo.isAdmin === true) {
                req.authId = userInfo.uid;
                return next();
            }
            return res.status(403).send('Unauthorized access!');
            // throw new Error('unauthorized')
        } catch (e) {
            return res.status(401).send({ error: 'You are not authorized to make this request' });
        }
    });
};
// [END Check Admin]

/**
 * [START Check Admin]
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
// Check if is user
function checkIfIsUser(req, res, next) {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
    
            if (userInfo.isUser === true) {
                req.authId = userInfo.uid;
                return next();
            }
    
            throw new Error('unauthorized')
        } catch (e) {
            return res.status(401).send({ error: 'You are not authorized to make this request' });
        }
    });
};
// [END Check Admin]

// export async function grantModeratorRole(email) {
//     const user = await admin.auth().getUserByEmail(email);
//     if (user.customClaims && (user.customClaims).admin === true) {
//         return;
//     }
//     return admin.auth().setCustomUserClaims(user.uid, {
//         moderator: true,
//     });
// }

// export async function checkAuth(idToken) {
//     const decoded = await admin.auth().verifyIdToken(idToken);
//     if (decoded.moderator !== true) {
//         throw new Error('User does not have moderator privileges');
//     }
// }


module.exports = {
    checkIfAuthenticated,
    checkIfIsAdmin,
    checkIfIsUser,
};