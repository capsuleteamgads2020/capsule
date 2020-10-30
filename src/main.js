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
		user.getIdTokenResult()
		.then((idTokenResult) => {
			store.dispatch('setIdToken', idTokenResult.token);
			store.dispatch('setIdTokenResult', idTokenResult);
			// store.dispatch('setIsUser', idTokenResult.claims.isUser);
			store.dispatch('setIsUser', user);
		}).catch((err) => {
			return err;
		});
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