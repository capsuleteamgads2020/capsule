'use strict'

import commentsApi from '@/services/commentsApi';

const state = {
    comments: [],
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
    async addComment({ commit, rootGetters }, payload) {
        // api call
        return commentsApi.addComment(rootGetters.idToken, payload)
		.then(res => {
			// commit comment
			commit('ADD_COMMENT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async getComment({ state, getters, commit, rootGetters }, payload) {
        // filter comment then api call
        if (payload.id == state.comment.id) {
			return state.comment
		}
	
		var comment = getters.commentById(payload.id)
	
		if (comment) {
			commit('GET_COMMENT', comment)
			return comment;
		} else {
			return commentsApi.getComment(rootGetters.idToken, payload.id)
			.then(res => {
				commit('GET_COMMENT', res.data)
				return res.data;
			})
			.catch( err => {
				return err;
			});
		}
    },
    async getComments({ state, commit, rootGetters }) {
        // api call
        if (state.comments && state.comments.length > 0) {
			return state.comments;
		}

		return commentsApi.getComments(rootGetters.idToken, rootGetters.user.uid)
		.then(res => {
			commit('GET_COMMENTS', res.data);
			return res.data;
		})
		.catch( err => {
			// var message = 'There was a problem fetching events: ' + err.message
			return err;
		});
    },
    async updateComment({ commit, rootGetters }, payload) {
        // api call
        return commentsApi.updateComment(rootGetters.idToken, {
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
    async deleteComment({ commit, rootGetters }, payload) {
        // api call
        return commentsApi.deleteComment(rootGetters.idToken, payload.id)
		.then(res => {
			// fix best case
			commit('DELETE_COMMENT', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async addReply({ commit, rootGetters }, payload) {
        // api call
        return commentsApi.addReply(rootGetters.idToken, payload)
		.then(res => {
            // fix best case
			commit('ADD_REPLY', payload);
			return res;
		})
		.catch( err => {
			return err;
		});
    },
    async likeComment({ commit, rootGetters }, payload) {
        // api call
        var id = rootGetters.user.uid;
        commit('LIKE_COMMENT', {payload, id});
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
    ADD_REPLY(state, reply) {
        let comment = state.comments.find(comment => comment.id === reply.comment_id);
        if (comment) {
            comment.replies.unshift(reply);
        }
    },
    LIKE_COMMENT(state, {payload, id}) {
        const index = state.comments.findIndex(comment => comment.id === payload.id);
        if (index !== -1) {
            return payload.likes.includes(id)? payload.likes.splice(payload.likes.indexOf(id), 1) : payload.likes.push(id);
        }
    },
};

export default {
	state,
	getters,
	actions,
	mutations
};