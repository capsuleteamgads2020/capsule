'use strict'

import firebase from '../../firebaseConfig.js';

const state = {
	groups: [
        {
            name: 'Breast Cancer Prevention',
            rating: 4,
            members: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
            id: 1,
        },
        {
            name: 'Fitness',
            rating: 5,
            members: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
            id: 2,
        },
        {
            name: 'Mental Health',
            rating: 5,
            members: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
            id: 3,
        },
        {
            name: 'Diabetes Prevention',
            rating: 3,
            members: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
            id: 4,
        },
        {
            name: 'Anti-Rape Advocate',
            rating: 4,
            members: [],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',                  
            id: 5,
        },
    ],
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
    async addGroup({ commit }, payload) {
        // api call
        await firebase.firestore().collection('groups').add({
			name: payload.name,
            description: payload.description,
            partners: payload.partners,
            created_at: payload.created_at,
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
    async getGroup({ state, getters, commit }, payload) {
        // filter group then api call
        if (payload.id == state.group.id) {
			return state.group
		}
	
		var group = getters.groupById(payload.id)
	
		if (group) {
			commit('GET_GROUP', group)
			return group;
		} else {
            await firebase.firestore().collection('groups').doc(payload.id).get()
			.then(res => {
				commit('GET_GROUP', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			})
		}
    },
    async getGroups({ state, commit }) {
        // api call
        // commit('GET_GROUPS', groups);
        if (state.groups && state.groups.length > 0) {
			return state.groups;
		}

        firebase.firestore().collection('groups').orderBy('created_at', 'desc')
		.onSnapshot(snapshot => {
			let groups = []
		
			snapshot.forEach(doc => {
				let group = doc.data()
				group.id = doc.id
				groups.push(group)
			})
			commit('GET_GROUPS', groups);
		});
    },
    async updateGroup({ commit }, payload) {
        // api call
        await firebase.firestore().collection('groups').doc(payload.id).update({
			name: payload.name,
            description: payload.description,
            partners: payload.partners,
            updated_at: payload.updated_at,
			active: payload.active,
        });
        commit('UPDATE_GROUP', payload);
    },
    async deleteGroup({ commit }, payload) {
        // api call
        await firebase.firestore().collection('groups').doc(payload.id).delete()
		.then(() => {
			commit('DELETE_GROUPS', payload);
		}).catch((error) => {
			return error;
		});
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