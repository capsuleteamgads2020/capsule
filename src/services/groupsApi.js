'use strict'

import { API_BASE } from '@/services/Api'
// import { TEST_API } from '@/services/Api'
import axios from 'axios'

export default {
	async getGroups () {
		// return api().get(`groups/fetchAll`);
		const res = await axios({
			// method: 'get',
			// url: `${TEST_API}groups/fetchAll`,
			url: `${API_BASE}groups/fetchAll`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				// 'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async addGroup (idToken, params) {
		// return api().post(`groups/addOne`, params);
		const res = await axios({
			method: 'post',
			// url: `${TEST_API}groups/addOne`,
			url: `${API_BASE}groups/addOne`,
			data: params,
			// params: params,
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
			// url: `${TEST_API}groups/updateOne/${params.id}`,
			url: `${API_BASE}groups/updateOne/${params.id}`,
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
			// url: `${TEST_API}projects/fetchOne/${group_id}`,
			url: `${API_BASE}groups/fetchOne/${group_id}`,
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
			// url: `${TEST_API}groups/deleteOne/${group_id}`,
			url: `${API_BASE}groups/deleteOne/${group_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}