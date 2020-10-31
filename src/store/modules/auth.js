'use strict'

import authApi from '@/services/authApi';
import firebase from '../../firebaseConfig.js';

const state = {
	// Credentials
	user: {},
	userInfo: {},
	isUser: false,
	isAdmin: false,
	idToken: '',
	idTokenResult: '',
};

const getters = {
	user: state => state.user,
	userInfo: state => state.userInfo,
	isUser: state => state.isUser,
	isAdmin: state => state.isAdmin,
	idToken: state => state.idToken,
	idTokenResult: state => state.idTokenResult,
};

const actions = {
	async setUser({ commit }, user) {
		// api call
		commit('SET_USER', user)
	},
	async addUser({getters},payload) {
		await authApi.addUser({
			id: getters.user.uid,
			email: payload.email,
			name: payload.name,
			phone: payload.phone,
			imageUrl: '',
			created_at: payload.created_at,
			status: payload.status
		});
		// commit('SET_USER', user);
	},
	async getUserInfo({ commit }, payload) {
		// api call
		return authApi.getUser(payload.tok, payload.uid)
		.then(res => {
			commit('SET_USER_INFO', res.data);
			this.$store.dispatch('getGroups');
			this.$store.dispatch('getProjects');
			this.$store.dispatch('getBookmarks');
			this.$store.dispatch('getNotifications');
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
	async setIsAdmin({ commit }, isAdmin) {
		// api call
		commit('SET_IS_ADMIN', isAdmin);
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
			await firebase.auth().currentUser.updateProfile({
				displayName: payload.name,
				phoneNumber: payload.phone,
				photoURL: 'https://firebasestorage.googleapis.com/v0/b/dev-capsule.appspot.com/o/avatar.jpeg?alt=media&token=55f88f28-76c8-4670-8caa-e08267b096fa',
			});
			// commit('SET_USER', user);
			if (firebase.auth().currentUser.emailVerified) {
				// commit('SET_IS_USER', user);
				commit('SET_USER', user);
			}
			await authApi.addUser({
				id: user.user.uid,
				email: payload.email,
				name: payload.name,
				phone: payload.phone,
				imageUrl: '',
				created_at: payload.created_at,
				status: payload.status
			});
			return user;
		})
		.catch(error => {
			return error;
		});
	},
	async signIn ({ commit, dispatch }, payload) {
		commit('GET_GROUPS', []);
		return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
		.then( user => {
			dispatch('getUserInfo', {tok: user.user.ya, uid: user.user.uid});
			if (user && firebase.auth().currentUser.emailVerified) {
				firebase.auth().onAuthStateChanged(user => {
					user.getIdToken(/* forceRefresh */ )
					.then(idToken => {
						commit('SET_ID_TOKEN', idToken);
						// commit('SET_USER', user);
						// dispatch('getUserInfo', user.user.uid);
					})
					.catch(err => {
						return err;
					});
				})
			}
			// dispatch('getGroups');
			return user;
		});
	},
	async signOut ({ commit }) {
		firebase.auth().signOut()
		.then(() => {
			commit('SET_IS_USER', null);
			commit('SET_USER', {});
			commit('SET_ID_TOKEN', null);
			commit('SET_ID_TOKEN_RESULT', null);
			commit('SIGN_OUT');
		}).catch(err => {
			return err;
		})
	},
};

const mutations = {
	SET_USER(state, user) {
		state.user = user;
	},
	SET_USER_INFO(state, userInfo) {
		state.userInfo = userInfo;
	},
	SET_IS_USER(state, isUser) {
		state.isUser = isUser;
	},
	SET_IS_ADMIN(state, isAdmin) {
		state.isAdmin = isAdmin;
	},
	SET_ID_TOKEN(state, idToken) {
		state.idToken = idToken;
	},
	SET_ID_TOKEN_RESULT(state, idTokenResult) {
		state.idTokenResult = idTokenResult;
	},
	SIGN_OUT(state) {
		// commit('SET_USER', {})
		// commit('SET_IS_USER', false);
		// commit('SET_IS_ADMIN', false);
		// commit('SET_ID_TOKEN', '');
		// commit('SET_ID_TOKEN_RESULT', '');
		// commit('SET_USER_INFO', {});
		state.idToken = '';
		state.idTokenResult = '';
		state.user = {};
		state.isUser = false;
		state.isAdmin = false;
		state.userInfo = {};
	},
};

export default {
	state,
	getters,
	actions,
	mutations
};