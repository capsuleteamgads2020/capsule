'use strict'

import { API_BASE } from '@/services/Api'
// import { TEST_API } from '@/services/Api'
import axios from 'axios'

export default {
	async getProjects (idToken) {
		// return api().get(`projects/fetchAll`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}projects/fetchAll`,
			url: `${API_BASE}projects/fetchAll`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async addProject (idToken, params) {
		// return api().post(`projects/addOne`, params);
		const res = await axios({
			method: 'post',
			// url: `${TEST_API}projects/addOne`,
			url: `${API_BASE}projects/addOne`,
			data: params,
			headers: { 
				'content-type': 'application/json', 
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`, 
			},
			json: true,
		});
		return res;
	},
	async updateProject (idToken, params) {
		// return api().put(`projects/updateOne/${params.id}`, params);
		const res = await axios({
			method: 'put',
			// url: `${TEST_API}projects/updateOne/${params.id}`,
			url: `${API_BASE}projects/updateOne/${params.id}`,
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
	async getProject (idToken, project_id) {
		// return api().get(`projects/fetchOne/${project_id}`);
		const res = await axios({
			method: 'get',
			// url: `${TEST_API}projects/fetchOne/${project_id}`,
			url: `${API_BASE}projects/fetchOne/${project_id}`,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
		});
		return res;
	},
	async deleteProject (idToken, project_id) {
        // return api().delete(`projects/deleteOne/${project_id}`);
        const res = await axios({
            method: 'DELETE',
			// url: `${TEST_API}projects/deleteOne/${project_id}`,
			url: `${API_BASE}projects/deleteOne/${project_id}`,
			// data: { answer: 42 },
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${idToken}`,
			},
			json: true,
        })
        return res;
	},
}