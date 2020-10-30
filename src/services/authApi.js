'use strict'

// import api from '@/services/api'
import axios from 'axios'

export default {
	// async getUsers (idToken) {
	// 	// return api().get(`users/fetchAll`);
	// 	const res = await axios({
	// 		method: 'get',
	// 		url: `http://localhost:8080/v1/users/fetchAll`,
	// 		// url: `https://api.algoboard.com/v1/users/fetchAll`,
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
		// return api().post(`users/addOne`, params);
		const res = await axios({
			method: 'post',
			url: `http://localhost:8080/v1/users/addOne`,
			// url: `https://api.algoboard.com/v1/users/addOne`,
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
			url: `http://localhost:8080/v1/users/updateOne/${params.id}`,
			// url: `https://api.algoboard.com/v1/users/updateOne/${params.id}`,
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
			url: `http://localhost:8080/v1/projects/fetchOne/${user_id}`,
			// url: `https://api.algoboard.com/v1/users/fetchOne/${user_id}`,
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
			url: `http://localhost:8080/v1/users/deleteOne/${user_id}`,
			// url: `https://api.algoboard.com/v1/users/deleteOne/${user_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}