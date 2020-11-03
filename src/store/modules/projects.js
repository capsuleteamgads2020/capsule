'use strict'

import projectsApi from '@/services/projectsApi';

const state = {
	// projects: [
	// 	{
	// 		active:true,
	// 		contribution:"10",
	// 		currency:"NGN",
	// 		created_at:1603840683104,
	// 		deadline:"2020-10-31",
	// 		description:"This is testing!!!",
	// 		id:"1603840683104_callis001",
	// 		name:"Cancer Awareness",
	// 		owner:false,
	// 		time:"06:30",
	// 		user:"Callis",
    //         subscriptions: [],
	// 	},
	// 	{
	// 		active:true,
	// 		contribution:"35",
	// 		currency:"NGN",
	// 		created_at:1603840814612,
	// 		deadline:"2020-10-31",
	// 		description:"This is another testing!!!",
	// 		id:"1603840814612_callis001",
	// 		name:"Mental Awareness",
	// 		owner:false,
	// 		time:"06:30",
	// 		user:"Callis",
    //         subscriptions: [],
	// 	},
	// 	{
	// 		active:true,
	// 		contribution:"15",
	// 		currency:"NGN",
	// 		created_at:1603843472426,
	// 		deadline:"2020-11-01",
	// 		description:"This is testing!!!",
	// 		id:"1603843472426_callis001",
	// 		name:"Biking Club",
	// 		owner:true,
	// 		time:"07:15",
	// 		user:"Callis",
    //         subscriptions: ['callis001'],
	// 	},
	// 	{
	// 		active:true,
	// 		contribution:"0.5",
	// 		created_at:1603889279650,
	// 		currency:"BTC",
	// 		deadline:"2020-11-08",
	// 		description:"This is testing!!!",
	// 		id:"1603889279650_callis001",
	// 		name:"End SARS",
	// 		owner:false,
	// 		time:"18:45",
	// 		user:"Callis",
    //         subscriptions: [],
	// 	}
	// ],
	projects: [],
	project: {},
};

const getters = {
	projects: state => state.projects,
	project: state => state.project,
	projectById: state => id => {
		return state.projects.find(project => project.id === id)
	}
};

const actions = {
    async addProject({ commit, rootGetters }, payload) {
		// api call
		return projectsApi.addProject(rootGetters.idToken, {
			name: payload.name,
			description: payload.description,
			deadline: payload.deadline,
			group_id: payload.group_id,
			time: payload.time,
			price: payload.price,
			currency: payload.currency,
			owner: payload.owner,
			created_at: payload.created_at,
			active: payload.active,
		})
		.then(res => {
			// commit project
			commit('ADD_PROJECT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async getProject({ state, getters, commit, rootGetters }, payload) {
        // filter project then api call
		if (payload.id == state.project.id) {
			return state.project
		}
	
		var project = getters.projectById(payload.id)
	
		if (project) {
			commit('GET_PROJECT', project)
			return project;
		} else {
			return projectsApi.getProject(payload.id, rootGetters.idToken)
			.then(res => {
				commit('GET_PROJECT', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			});
		}
    },
    async getProjects({ state/*, commit, rootGetters */}) {
        // api call
		if (state.projects && !!state.projects.length) {
			return state.projects;
		}

		// return projectsApi.getProjects(rootGetters.idToken)
		// .then(res => {
		// 	commit('GET_PROJECTS', res.data);
		// 	return res.data;
		// })
		// .catch( err => {
		// 	// var message = 'There was a problem fetching events: ' + err.message
		// 	return err;
		// });
    },
    async updateProject({ commit, rootGetters }, payload) {
        // api call
		return projectsApi.updateProject(rootGetters.idToken, {
			id: payload.id,
			name: payload.name,
			description: payload.description,
			deadline: payload.deadline,
			time: payload.time,
			contribution: payload.contribution,
			currency: payload.currency,
			owner: payload.owner,
			created_at: payload.created_at,
			active: payload.active,
		})
		.then(res => {
			// fix best case
			commit('UPDATE_PROJECT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async deleteProject({ commit, rootGetters }, payload) {
        // api call
		return projectsApi.deleteProject(rootGetters.idToken, payload.id)
		.then(res => {
			// fix best case
			commit('DELETE_PROJECT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
};

const mutations = {
    ADD_PROJECT(state, project) {
        state.projects.unshift(project);
    },
    GET_PROJECT(state, project) {
        state.project = project;
    },
    GET_PROJECTS(state, projects) {
        state.projects = projects;
    },
    UPDATE_PROJECT(state, payload) {
        const index = state.projects.findIndex(project => project.id === payload.id);
        if (index !== -1) {
          state.projects.splice(index, 1, payload);
        }
    },
    DELETE_PROJECT(state, payload) {
        state.projects = state.projects.filter(project => project.id !== payload.id);
    },
};

export default {
	state,
	getters,
	actions,
	mutations
};