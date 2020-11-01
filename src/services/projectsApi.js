'use strict'

// import api from '@/services/api'
import axios from 'axios'

export default {
	async getProjects (idToken) {
		// return api().get(`projects/fetchAll`);
		const res = await axios({
			method: 'get',
			// url: `http://localhost:8080/v1/projects/fetchAll`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/projects/fetchAll`,
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
			// url: `http://localhost:8080/v1/projects/addOne`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/projects/addOne`,
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
	async updateProject (idToken, params) {
		// return api().put(`projects/updateOne/${params.id}`, params);
		const res = await axios({
			method: 'put',
			// url: `http://localhost:8080/v1/projects/updateOne/${params.id}`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/projects/updateOne/${params.id}`,
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
			// url: `http://localhost:8080/v1/projects/fetchOne/${project_id}`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/projects/fetchOne/${project_id}`,
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
			// url: `http://localhost:8080/v1/projects/deleteOne/${project_id}`,
			url: `https://capsuleteamapi.uc.r.appspot.com/v1/projects/deleteOne/${project_id}`,
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