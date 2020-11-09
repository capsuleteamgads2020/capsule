'use strict';

// const GOOGLE_CLOUD_PROJECT = process.env['GOOGLE_CLOUD_PROJECT'];
// const CLOUD_BUCKET = GOOGLE_CLOUD_PROJECT + '_bucket';

const admin = require('firebase-admin');
const Storage = require('@google-cloud/storage');

// [START Capsule_cloud_storage_client]
const bucket = admin.storage().bucket('capsuleteamapi.uc.r.appspot.com');
// [END Capsule_cloud_storage_client]

/**
 * [START public_url]
 * @param {dir} filename Cloud Storage directory.
 * Returns the public, anonymously accessible URL to a given Cloud Storage object
 * The object's ACL has to be set to public read.
 * Get filt public url.
 */
const getPublicUrl = (filename) => {
  	return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}
// [END public_url]

/**
 * [START send_file_upload_to_gcp process]
 * Express middleware that will automatically pass uploads to Cloud Storage.
 * req.file is processed and will have two new properties:
 * * ``cloudStorageObject`` the object name in cloud storage.
 * * ``cloudStoragePublicUrl`` the public url to the object.
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function sendUploadToGCS middleware context.
 * post file to cloud storage.
 */
function sendUploadToGCS(req, res, next) {
	if (!req.file) {
		return next();
	}
	// Create variables for file and bucket
	const gcsname = `${Date.now()}`;
	const file = bucket.file(`${req.authId}/profile/${gcsname}`);
	// var fileName = http://Date.now() + '_' + req.file.originalname;
	// const blob = bucket.file('Uploads/' + fileName);

	const stream = file.createWriteStream({
		metadata: {
			contentType: req.file.mimetype,
		},
		resumable: false,
	});

	stream.on('error', err => {
		req.file.cloudStorageError = err;
		next(err);
	});

	stream.on('finish', async () => {
		req.file.cloudStorageObject = gcsname;
		await file.makePublic();
		req.file.cloudStoragePublicUrl = getPublicUrl(`${req.authId}/profile/${gcsname}`);
		next();
	});

	stream.end(req.file.buffer);
}
// [END process]

/**
 * [START send_file_uploads_to_gcp process]
 * Express middleware that will automatically pass uploads to Cloud Storage.
 * req.file is processed and will have two new properties:
 * * ``cloudStorageObject`` the object name in cloud storage.
 * * ``cloudStoragePublicUrl`` the public url to the object.
 * @param {object} req Cloud Function request context.
 * @param {object} res Cloud Function response context.
 * @param {object} next Cloud Function sendUploadToGCS middleware context.
 * As per https://medium.com/@yoga.utomo27/how-to-upload-multiple-images-to-google-cloud-storage-using-react-native-express-and-multer-f2ad6960a573
 * Compare with https://stackoverflow.com/questions/54948585/sending-multiple-files-to-google-bucket-with-multer-why-are-my-files-empty and 
 * https://stackoverflow.com/questions/57759559/sending-multiple-files-to-gcs-in-node
 * Post files to cloud storage.
 */
const sendUploadsToGCS = (req, res, next) => {
	console.log(req.files)
	if (!req.files) {
		return next()
	}

	let promises = [];
	req.files.forEach((note, index) => {
		// Create variables for file and bucket
		const gcsname = `${Date.now()}_${index}`;
		// const gcsname = note.originalname.split('.')[0];
		// const file = bucket.file(`${req.body.school}/${req.body.subject}/${gcsname}`);
		const file = bucket.file(`${req.authId}/timeline/${gcsname}`);

		const promise = new Promise((resolve, reject) => {
		const stream = file.createWriteStream({
			metadata: {
			contentType: note.mimetype
			}
		});
		
		stream.on('error', (err) => {
			req.files[index].cloudStorageError = err
			reject(err)
		});

		stream.on('finish', async () => {
			try {
				req.files[index].cloudStorageObject = gcsname
				await file.makePublic()
				req.files[index].cloudStoragePublicUrl = getPublicUrl(`${req.authId}/timeline/${gcsname}`);
				resolve();
			} catch (error) {
				reject(error)
			}
		});

		stream.end(note.buffer);
		})

		promises.push(promise)
	});

	Promise.all(promises)
	.then(_ => {
		promises = [];
		next();
	})
	.catch(next);
}
// [END process]

/**
 * [START multer]
 * Multer handles parsing multipart/form-data requests.
 * This instance is configured to store images in memory.
 * This makes it straightforward to upload to Cloud Storage.
 */
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
	fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});
// [END multer]

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  sendUploadsToGCS,
  multer,
};