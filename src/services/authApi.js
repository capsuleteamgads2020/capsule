'use strict'

import { API_BASE } from '@/services/Api'
// import { TEST_API } from '@/services/Api'
import axios from 'axios'

export default {
	// async getUsers (idToken) {
	// 	// return api().get(`users/fetchAll`);
	// 	const res = await axios({
	// 		method: 'get',
	// 		url: `${TEST_API}users/fetchAll`,
	// 		// url: `${API_BASE}users/fetchAll`,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'Accept': 'application/json',
	// 			'Authorization': `Bearer ${idToken}`,
	// 		},
	// 		json: true,
	// 	});
	// 	return res;
	// },
	async addUser (params) {
		// return api().post(`users/addOne/${params.id}`, params);
		const res = await axios({
			method: 'post',
			// url: `${TEST_API}users/addOne/${params.id}`,
			url: `${API_BASE}users/addOne/${params.id}`,
			data: params,
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				// 'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async updateUser (idToken, params) {
		// return api().put(`users/updateOne/${params.id}`, params);
		const res = await axios({
			method: 'put',
			// url: `${TEST_API}users/updateOne/${params.id}`,
			url: `${API_BASE}users/updateOne/${params.id}`,
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
	async getUser (idToken, user_id) {
		// return api().get(`users/fetchOne/${user_id}`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}users/fetchOne/${user_id}`,
			url: `${API_BASE}users/fetchOne/${user_id}`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async deleteUser (user_id) {
        // return api().delete(`users/deleteOne/${user_id}`);
        const res = await axios({
            method: 'DELETE',
			// url: `${TEST_API}users/deleteOne/${user_id}`,
			url: `${API_BASE}users/deleteOne/${user_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}