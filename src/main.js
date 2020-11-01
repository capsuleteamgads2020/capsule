import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from './firebaseConfig.js'

Vue.config.productionTip = false

// handle page reloads
let app
firebase.auth().onAuthStateChanged(user => {
	if (user && user.emailVerified) {
		store.dispatch('getUserInfo', {tok: user.ya, uid: user.uid});
		user.getIdTokenResult()
		.then((idTokenResult) => {
			store.dispatch('setIdToken', idTokenResult.token);
			store.dispatch('setIdTokenResult', idTokenResult);
			store.dispatch('setIsUser', idTokenResult.claims.isUser);
			store.dispatch('setIsAdmin', idTokenResult.claims.isAdmin);
			store.dispatch('setUser', user);
			// store.dispatch('getUserInfo', user.uid);
		}).catch((err) => {
			return err;
		});
	} else {
		store.dispatch('getGroups');
	}

	if (!app) {
		app = new Vue({
			el: '#app',
			router,
			store: store,
			render: h => h(App)
		});
	}
});