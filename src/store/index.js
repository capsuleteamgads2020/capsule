import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios';
import projects from './modules/projects';
import groups from './modules/groups';
import comments from './modules/comments';
import auth from './modules/auth';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notifications: [
			{
				name: 'Group 1',
				message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
				read: false,
				id: 1,
			},
			{
				name: 'Group 2',
				message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
				read: false,
				id: 2,
			},
			{
				name: 'Group 3',
				message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
				read: false,
				id: 3,
			},
			{
				name: 'Group 4',
				message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
				read: false,
				id: 4,
			},
			{
				name: 'Group 5',
				message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perferendis voluptatibus exercitationem cupiditate doloremque sapiente, repellendus veniam quidem dicta perspiciatis officia itaque earum facilis vitae, odio minus praesentium voluptatum qui?',
				read: false,
				id: 5,
			}
		],
		notification: null,
		bookmarks: [
			{
				admin:false,
				avatar:"../assets/avatar.jpeg",
				comment:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum.",
				created_at:1603772732825,
				id:"1603772732825_callis001",
				likes:[],
				replies:[],
				user:"Callis",
			},
			{
				admin:false,
				avatar:"../assets/avatar.jpeg",
				comment:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?",
				created_at:1603734959652,
				id:"1603734959652_callis001",
				likes:[],
				replies:[],
				user:"Callis",
			},
		],
		bookmark: null,
		contributors: [
			{'id': 1, 'name': 'Callis', 'role': 'member', 'twitter': '@callezenwaka'},
			{'id': 2, 'name': 'Rahman', 'role': 'member', 'twitter': '@rahmanorewole'},
			{'id': 3, 'name': 'Honesty', 'role': 'member', 'twitter': '@honesty'},
			{'id': 4, 'name': 'Nnamdi', 'role': 'member', 'twitter': '@nnamdi'},
		],
		message: '',
	},
	getters: {
		notifications: state => state.notifications,
		notification: state => state.notification,
		bookmarks: state => state.bookmarks,
		bookmark: state => state.bookmark,
		contributors: state => state.contributors,
		message: state => state.message,
	},
	actions: {
		async getMessage({ commit }, message) {
			commit('UPDATE_MESSAGE', message);
		},
		async getNotifications(/*{ commit }*/) {
			// api call
			// commit('GET_NOTIFICATIONS', notifications);
		},
		async updateNotification({ commit }, notification) {
			// api call
			commit('UPDATE_NOTIFICATION', notification);
		},
		async getBookmarks(/*{ commit }*/) {
			// api call
			// commit('GET_BOOKMARKS', bookmarks);
		},
		async updateBookmark({ commit }, bookmark) {
			// api call
			commit('UPDATE_BOOKMARK', bookmark);
		},
		// async joinGroup({ commit }, group) {
		// 	// api call
		// 	commit('JOIN_GROUP', group);
		// },
		// async leaveGroup({ commit }, group) {
		// 	// api call
		// 	commit('JOIN_GROUP', group);
		// },
		// async updateProject({ commit }, project) {
		// 	// api call
		// 	commit('UPDATE_PROJECT', project);
		// },
	},
	mutations: {
		UPDATE_MESSAGE(state, message) {
			state.message = message;
		},
		GET_NOTIFICATIONS(state, notifications) {
			state.notifications = notifications;
		},
		UPDATE_NOTIFICATION(state, payload) {
			const index = state.notifications.findIndex(notification => notification.id === payload.id);
			if (index !== -1) {
				state.notifications.splice(index, 1, payload);
			}
		},
		GET_BOOKMARKS(state, bookmarks) {
			state.bookmarks = bookmarks;
		},
		UPDATE_BOOKMARK(state, payload) {
			const index = state.bookmarks.findIndex(bookmark => bookmark.id === payload.id);
			if (index !== -1) {
				return state.bookmarks.splice(index, 1);
			}
			state.bookmarks.unshift(payload);
		},
		// JOIN_GROUP({ state }, group) {
		// 	const index = rootState.groups.findIndex(grp => grp.id === group.id);
		// 	if (rootState.userInfo.groups.includes(group.id)) {
		// 		// if (index !== -1) {
		// 		group.members -= 1;
		// 		rootState.groups.splice(index, 1, group);
		// 		// }
		// 		return rootState.userInfo.groups.members.splice(rootState.userInfo.group.members.indexOf(group.id), 1);
		// 	}
		// 	group.members += 1;
		// 	rootState.groups.splice(index, 1, group);
		// 	return rootState.userInfo.groups.unshift(group.id);
		// },
		// LEAVE_GROUP({ rootState }, group) {
		// 	const index = rootState.groups.findIndex(grp => grp.id === group.id);
		// 	if (rootState.userInfo.groups.includes(group.id)) {
		// 		// if (index !== -1) {
		// 		group.members -= 1;
		// 		rootState.groups.splice(index, 1, group);
		// 		// }
		// 		return rootState.userInfo.groups.members.splice(rootState.userInfo.group.members.indexOf(group.id), 1);
		// 	}
		// 	group.members += 1;
		// 	rootState.groups.splice(index, 1, group);
		// 	return rootState.userInfo.groups.unshift(group.id);
		// },
		// UPDATE_PROJECT({ rootState }, project) {
		// 	if (rootState.userInfo.projects.includes(project.id)) {
		// 		rootState.project.members -= 1;
		// 		return rootState.project.members.splice(rootState.group.members.indexOf(project.id), 1);
		// 	}
		// 	rootState.group.members += 1;
		// 	return rootState.userInfo.groups.unshift(project.id);
		// },
	},
	modules: {
		projects,
		groups,
		comments,
		auth,
	}
})