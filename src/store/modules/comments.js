'use strict'

import commentsApi from '@/services/commentsApi';

const state = {
	comments: [
        {
            admin:false,
            avatar:"../assets/avatar.jpeg",
            comment:"Hey!",
            created_at:1603731906678,
            id:"1603731906678_callis001",
            likes:[],
            replies:[],
            user:"Callis",
        },
        {
            admin:false,
            avatar:"../assets/avatar.jpeg",
            comment:"How are you?\n",
            created_at:1603734156223,
            id:"1603734156223_callis001",
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
        {
            admin:false,
            avatar:"../assets/avatar.jpeg",
            comment:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio adipisci minus aut quis quae dolorum laborum. Necessitatibus consequuntur laborum distinctio culpa aliquam fugiat maiores harum debitis alias aperiam, accusamus sed?",
            created_at:1603738545022,
            id:"1603738545022_callis001",
            likes:[],
            replies:[],
            user:"Callis",
        },
        {
            admin:false,
            avatar:"../assets/avatar.jpeg",
            comment:"Finally",
            created_at:1603772543218,
            id:"1603772543218_callis001",
            likes:[],
            replies:[],
            user:"Callis",
        },
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
    ],
	comment: {},
};

const getters = {
	comments: state => state.comments,
	comment: state => state.comment,
	commentById: state => id => {
		return state.comments.find(comment => comment.id === id)
	}
};

const actions = {
    async addComment({ commit, rootState }, payload) {
        // api call
        return commentsApi.addComment(rootState.idToken, {
			comment: payload.comment,
		})
		.then(res => {
			// commit comment
			commit('ADD_COMMENT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async getComment({ state, getters, commit, rootState }, payload) {
        // filter comment then api call
        if (payload.id == state.comment.id) {
			return state.comment
		}
	
		var comment = getters.commentById(payload.id)
	
		if (comment) {
			commit('GET_COMMENT', comment)
			return comment;
		} else {
			return commentsApi.getComment(rootState.idToken, payload.id)
			.then(res => {
				commit('GET_COMMENT', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			});
		}
    },
    async getComments({ state, commit, rootState }) {
        // api call
        if (state.comments && state.comments.length > 0) {
			return state.comments;
		}

		return commentsApi.getComments(rootState.idToken, rootState.user.uid)
		.then(res => {
			commit('GET_COMMENTS', res.data);
			return res.data;
		})
		.catch( err => {
			// var message = 'There was a problem fetching events: ' + err.message
			return err;
		});
    },
    async updateComment({ commit, rootState }, payload) {
        // api call
        return commentsApi.updateComment(rootState.idToken, {
			id: payload.id,
			reply: payload.reply,
		})
		.then(res => {
			// fix best case
			commit('UPDATE_COMMENT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async deleteComment({ commit, rootState }, payload) {
        // api call
        // commit('DELETE_COMMENTS', comment.id);
        return commentsApi.deleteComment(rootState.idToken, payload.id)
		.then(res => {
			// fix best case
			commit('DELETE_COMMENT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
};

const mutations = {
    ADD_COMMENT(state, comment) {
        state.comments.unshift(comment);
    },
    GET_COMMENT(state, comment) {
        state.comment = comment;
    },
    GET_COMMENTS(state, comments) {
        state.comments = comments;
    },
    UPDATE_COMMENT(state, payload) {
        const index = state.comments.findIndex(comment => comment.id === payload.id);
        if (index !== -1) {
          state.comments.splice(index, 1, payload);
        }
    },
    DELETE_COMMENT(state, payload) {
        state.comments = state.comments.filter(comment => comment.id !== payload.id);
    },
};

export default {
	state,
	getters,
	actions,
	mutations
};