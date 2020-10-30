'use strict'

// import api from '@/services/api'
import axios from 'axios'

export default {
	async getComments (idToken) {
		// return api().get(`comments/fetchAll`);
		const res = await axios({
			method: 'get',
			url: `http://localhost:8080/v1/comments/fetchAll`,
			// url: `https://api.algoboard.com/v1/comments/fetchAll`,
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
			url: `http://localhost:8080/v1/comments/addOne`,
			// url: `https://api.algoboard.com/v1/comments/addOne`,
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
			url: `http://localhost:8080/v1/comments/updateOne/${params.id}`,
			// url: `https://api.algoboard.com/v1/comments/updateOne/${params.id}`,
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
	async getComment (comment_id, idToken) {
		// return api().get(`comments/fetchOne/${comment_id}`);
		const res = await axios({
			method: 'get',
			url: `http://localhost:8080/v1/projects/fetchOne/${comment_id}`,
			// url: `https://api.algoboard.com/v1/comments/fetchOne/${comment_id}`,
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
			url: `http://localhost:8080/v1/comments/deleteOne/${comment_id}`,
			// url: `https://api.algoboard.com/v1/comments/deleteOne/${comment_id}`,
            // data: { answer: 42 }
        })
        return res;
	},
}