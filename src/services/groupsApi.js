'use strict'

// import api from '@/services/api'
import axios from 'axios'

export default {
	async getGroups (idToken) {
		// return api().get(`groups/fetchAll`);
		const res = await axios({
			method: 'get',
			url: `http://localhost:8080/v1/groups/fetchAll`,
			// url: `https://api.algoboard.com/v1/groups/fetchAll`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async addGroup (idToken, params) {
		// return api().post(`groups/addOne`, params);
		const res = await axios({
			method: 'post',
			url: `http://localhost:8080/v1/groups/addOne`,
			// url: `https://api.algoboard.com/v1/groups/addOne`,
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
	async updateGroup (idToken, params) {
		// return api().put(`groups/updateOne/${params.id}`, params);
		const res = await axios({
			method: 'put',
			url: `http://localhost:8080/v1/groups/updateOne/${params.id}`,
			// url: `https://api.algoboard.com/v1/groups/updateOne/${params.id}`,
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
	async getGroup (group_id, idToken) {
		// return api().get(`groups/fetchOne/${group_id}`);
		const res = await axios({
			method: 'get',
			url: `http://localhost:8080/v1/projects/fetchOne/${group_id}`,
			// url: `https://api.algoboard.com/v1/groups/fetchOne/${group_id}`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async deleteGroup (group_id) {
        // return api().delete(`groups/deleteOne/${group_id}`);
        const res = await axios({
            method: 'DELETE',
			url: `http://localhost:8080/v1/groups/deleteOne/${group_id}`,
			// url: `https://api.algoboard.com/v1/groups/deleteOne/${group_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}