'use strict'

import authApi from '@/services/authApi';
import firebase from '../../firebaseConfig.js';

const state = {
	// Credentials
	user: {
        id: 'callis001',
        full_name: 'Callis',
        avatar: '../assets/avatar.jpeg',
    },
	isUser: null,
	idToken: null,
	idTokenResult: null,
};

const getters = {
	user: state => state.user,
	isUser: state => state.isUser,
	idToken: state => state.idToken,
	idTokenResult: state => state.idTokenResult,
};

const actions = {
	async getUser({ commit, getters }, payload) {
		// api call
		return authApi.getUser(payload.id, getters.idToken)
			.then(res => {
				commit('SET_USER', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			});
	},
	async setIsUser({ commit }, isUser) {
		// api call
		commit('SET_IS_USER', isUser);
	},
	async setIdToken({ commit }, idToken) {
		// api call
		commit('SET_ID_TOKEN', idToken);
	},
	async setIdTokenResult({ commit }, idTokenResult) {
		// api call
		commit('SET_ID_TOKEN_RESULT', idTokenResult);
	},
	async signUp({commit}, payload) {
		return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
		.then( async (user) => {
			await firebase.auth().currentUser.sendEmailVerification();
			// console.log(firebase.auth().currentUser.emailVerified)
			// console.log(user)
			if (firebase.auth().currentUser.emailVerified) {
				commit('SET_USER', user);
			}
			// await authApi.addUser({
			// 	id: user.user.uid,
			// 	email: payload.email,
			// 	name: payload.name,
			// 	phone: payload.phone,
			// 	imageUrl: '',
			// 	created_at: payload.created_at,
			// 	status: payload.status
			// });
			return user;
		})
		.catch(error => {
			return error;
		});
	},
	async signIn ({ commit, dispatch }, payload) {
		// this.loading = true
		return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
		.then( user => {
			// var payload = {'id': user.uid};
			dispatch('getUser', {'id': user.uid});
			firebase.auth().onAuthStateChanged(user => {
				user.getIdToken(/* forceRefresh */ )
				.then(idToken => {
					commit('SET_ID_TOKEN', idToken);
				})
				.catch(err => {
					return err;
				});
			})
			return user;
		});
	},
};

const mutations = {
	SET_USER(state, user) {
		state.user = user;
	},
	SET_IS_USER(state, isUser) {
		state.isUser = isUser;
	},
	SET_ID_TOKEN(state, idToken) {
		state.idToken = idToken;
	},
	SET_ID_TOKEN_RESULT(state, idTokenResult) {
		state.idTokenResult = idTokenResult;
	},
};

export default {
	state,
	getters,
	actions,
	mutations
};