'use strict'

// import api from '@/services/api'
import axios from 'axios'

export default {
    // Notifications
	async getNotifications (idToken) {
		// return api().get(`notifications/fetchAll`);
		const res = await axios({
			method: 'get',
			// url: `http://localhost:8080/v1/notifications/fetchAll`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/notifications/fetchAll/`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async updateNotification (idToken, params) {
		// return api().put(`notification/updateNotification/${params.notification_id}`, params);
		const res = await axios({
			method: 'put',
			// url: `http://localhost:8080/v1/notification/updateNotification/${params.notification_id}`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/notification/updateNotification/${params.notification_id}`,
			data: JSON.stringify(params),
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`, 
			},
			json: true,
		});
		return res;
    },
    // Bookmarks
	async getBookmarks (idToken) {
		// return api().get(`bookmarks/fetchAll`);
		const res = await axios({
			method: 'get',
			// url: `http://localhost:8080/v1/bookmarks/fetchAll`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/bookmarks/fetchAll/`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async updateBookmark (idToken, params) {
		// return api().put(`bookmark/updateBookmark/${params.bookmark_id}`, params);
		const res = await axios({
			method: 'put',
			// url: `http://localhost:8080/v1/bookmark/updateBookmark/${params.bookmark_id}`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/bookmark/updateBookmark/${params.bookmark_id}`,
			data: JSON.stringify(params),
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`, 
			},
			json: true,
		});
		return res;
	},
	// async getModerator (moderator_id, idToken) {
	// 	// return api().get(`moderators/fetchOne/${moderator_id}`);
	// 	const res = await axios({
	// 		method: 'get',
	// 		// url: `http://localhost:8080/v1/moderators/fetchOne/${moderator_id}`,
	// 		url: `https://capsuleteamapi.uc.r.appspot.com/v1/moderators/fetchOne/${school_id}`,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json',
	// 			'Authorization': `Bearer ${idToken}`,
	// 		},
	// 		json: true,
	// 	});
	// 	return res;
	// },
	// async deleteModerator (moderator_id) {
	// 	// return api().delete(`moderators/deleteOne/${moderator_id}`);
	// 	const res = await axios({
	// 		method: 'get',
	// 		// url: `http://localhost:8080/v1/moderators/fetchOne/${moderator_id}`,
	// 		url: `https://capsuleteamapi.uc.r.appspot.com/v1/moderators/fetchOne/${school_id}`,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json',
	// 			'Authorization': `Bearer ${idToken}`,
	// 		},
	// 		json: true,
	// 	});
	// 	return res;
	// },
}