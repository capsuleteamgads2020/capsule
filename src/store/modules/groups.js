'use strict'

import groupsApi from '@/services/groupsApi';

const state = {
	// groups: [
    //     {
    //         name: 'Breast Cancer Prevention',
    //         rating: 4,
    //         members: [],
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
    //         id: 1,
    //     },
    //     {
    //         name: 'Fitness',
    //         rating: 5,
    //         members: [],
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
    //         id: 2,
    //     },
    //     {
    //         name: 'Mental Health',
    //         rating: 5,
    //         members: [],
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
    //         id: 3,
    //     },
    //     {
    //         name: 'Diabetes Prevention',
    //         rating: 3,
    //         members: [],
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
    //         id: 4,
    //     },
    //     {
    //         name: 'Anti-Rape Advocate',
    //         rating: 4,
    //         members: [],
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
    //         id: 5,
    //     },
    // ],
    groups: [],
    group: {},
};

const getters = {
	groups: state => state.groups,
	group: state => state.group,
	groupById: state => id => {
		return state.groups.find(group => group.id === id)
	}
};

const actions = {
    async addGroup({ commit, rootGetters }, payload) {
        // api call
        return groupsApi.addGroup(rootGetters.idToken, {
			name: payload.name,
            description: payload.description,
            partners: payload.partners,
            created_at: payload.created_at,
            members: [],
			active: payload.active,
		})
		.then(res => {
			// commit group
			commit('ADD_GROUP', payload);
			return res;
		})
		.catch( err => {
			return err;
		})
    },
    async getGroup({ state, getters, commit, rootGetters }, payload) {
        // filter group then api call
        if (payload.id == state.group.id) {
			return state.group
		}
	
		var group = getters.groupById(payload.id)
	
		if (group) {
			commit('GET_GROUP', group)
			return group;
		} else {
			return groupsApi.getGroup(payload.id, rootGetters.idToken)
			.then(res => {
				commit('GET_GROUP', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			})
		}
    },
    async getGroups({  commit }) {
        // api call
        // console.log('here')
        if (state.groups && state.groups.length > 0) {
			return state.groups;
		}
        
		return groupsApi.getGroups()
		.then(res => {
			commit('GET_GROUPS', res.data);
			return res.data;
		})
		.catch( err => {
			// var message = 'There was a problem fetching events: ' + err.message
			return err;
		})
    },
    async updateGroup({ commit, rootGetters }, payload) {
        // api call
        return groupsApi.updateGroup(rootGetters.idToken, {
			id: payload.id,
			name: payload.name,
			description: payload.description,
			active: payload.active,
		})
		.then(res => {
			// fix best case
			commit('UPDATE_GROUP', payload);
			return res;
		})
		.catch( err => {
			return err;
		})
    },
    async deleteGroup({ commit, rootGetters }, payload) {
        // api call
        return groupsApi.deleteGroup(rootGetters.idToken, payload.id)
		.then(res => {
			// fix best case
			commit('DELETE_GROUP', payload);
			return res;
		})
		.catch( err => {
			return err;
		})
    },
};

const mutations = {
    ADD_GROUP(state, group) {
        state.groups.unshift(group);
    },
    GET_GROUP(state, group) {
        state.group = group;
    },
    GET_GROUPS(state, groups) {
        state.groups = groups;
    },
    UPDATE_GROUP(state, payload) {
        const index = state.groups.findIndex(group => group.id === payload.id);
        if (index !== -1) {
          state.groups.splice(index, 1, payload);
        }
    },
    DELETE_GROUP(state, payload) {
        state.groups = state.groups.filter(group => group.id !== payload.id);
    },
};

export default {
	state,
	getters,
	actions,
	mutations
};