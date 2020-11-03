'use strict'

import { API_BASE } from '@/services/Api'
// import { TEST_API } from '@/services/Api'
import axios from 'axios'

export default {
    // Notifications
	async getNotifications (idToken) {
		// return api().get(`notifications/fetchAll`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}notifications/fetchAll`,
			url: `${API_BASE}notifications/fetchAll/`,
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
			// url: `${TEST_API}notification/updateNotification/${params.notification_id}`,
			url: `${API_BASE}notification/updateNotification/${params.notification_id}`,
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
			// url: `${TEST_API}bookmarks/fetchAll`,
			url: `${API_BASE}bookmarks/fetchAll/`,
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
			// url: `${TEST_API}bookmark/updateBookmark/${params.bookmark_id}`,
			url: `${API_BASE}bookmark/updateBookmark/${params.bookmark_id}`,
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
	// 		// url: `${TEST_API}moderators/fetchOne/${moderator_id}`,
	// 		url: `${API_BASE}moderators/fetchOne/${school_id}`,
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
	// 		// url: `${TEST_API}moderators/fetchOne/${moderator_id}`,
	// 		url: `${API_BASE}moderators/fetchOne/${school_id}`,
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