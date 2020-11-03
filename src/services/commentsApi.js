'use strict'

import { API_BASE } from '@/services/Api'
// import { TEST_API } from '@/services/Api'
import axios from 'axios'

export default {
	async getComments (idToken, uiser_id) {
		// return api().get(`comments/fetchAll/${uiser_id}`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}comments/fetchAll/${uiser_id}`,
			url: `${API_BASE}comments/fetchAll/${uiser_id}`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async addComment (idToken, params) {
		// return api().post(`comments/addOne`, params);
		const res = await axios({
			method: 'post',
			// url: `${TEST_API}comments/addOne`,
			url: `${API_BASE}comments/addOne`,
			// data: params,
			params: params,
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`, 
			},
			json: true,
		});
		return res;
	},
	async updateComment (idToken, params) {
		// return api().put(`comments/updateOne/${params.id}`, params);
		const res = await axios({
			method: 'put',
			// url: `${TEST_API}comments/updateOne/${params.id}`,
			url: `${API_BASE}comments/updateOne/${params.id}`,
			data: params,
			// data: JSON.stringify(params),
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`, 
			},
			json: true,
		});
		return res;
	},
	async getComment (comment_id, idToken) {
		// return api().get(`comments/fetchOne/${comment_id}`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}projects/fetchOne/${comment_id}`,
			url: `${API_BASE}comments/fetchOne/${comment_id}`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async deleteComment (comment_id) {
        // return api().delete(`comments/deleteOne/${comment_id}`);
        const res = await axios({
            method: 'DELETE',
			// url: `${TEST_API}comments/deleteOne/${comment_id}`,
			url: `${API_BASE}comments/deleteOne/${comment_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}