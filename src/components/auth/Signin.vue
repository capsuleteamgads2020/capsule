<template>
	<div class="sign_in_form">
		<transition name="fade">
			<div v-if="loading" class="loading">
			<Loader class="loader" :loading="loading"></Loader>
			</div>
		</transition>
		<section class="title">
			<h2 class="page_header">Login</h2>
			<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; border: 0;">
		</section>
		<section>
			<div style="color: #ff0000; display: flex; justify-content: center;">
				<ul style="text-align: left; list-style-type: disc;"><li v-for="(validation, index) in validations" :key="index">{{validation}}</li></ul>
			</div>
		</section>
		<section>
			<form class="forms">
				<div class="form-item">
					<label for="email" class="required">Email: </label>
					<input type="email" name="email" id="email" v-model="user.email" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
				</div>
				<div class="form-item">
					<label for="password" class="required">Password: </label>
					<input type="password" name="password" id="password" v-model="user.password" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
					<span></span>
				</div>
				<div class="text--content field">
				<span>By clicking Sign In, you agree to our <router-link class="anchors" :to="{ name: 'Terms' }"> Terms of Use </router-link>and our <router-link class="anchors" :to="{ name: 'Privacy' }"> Privacy Policy.</router-link></span>
				</div>
				<div class="">
					<button class="btn" @click.prevent="onSignIn">Sign In</button>
				</div>
			</form>
		</section>
		<section>
			<div class="text--content">
				<span>Forgot your password?</span>
			</div>
			<div class="">
				<button class="btn" type="button" @click.prevent="forgotPassword = !forgotPassword">Reset Password</button>
			</div>
			<transition v-if="this.forgotPassword">
				<ResetPassword :forgotPassword=forgotPassword @resetPassword="resetPassword"></ResetPassword>
			</transition>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import ResetPassword from '@/components/auth/ResetPassword'
import Loader from '@/components/partials/Loader.vue'
import { mapActions } from "vuex";
export default {
	name: 'signin',
	components: {
		ResetPassword,
		Loader,
	},
	data () {
		return {
			forgotPassword: false,
			loading: false,
			validations: [],
			user: {
				email: '',
				password: ''
			}
		}
	},
    watch: {
        message: {
			handler() {
				this.notification();
			}
		},
    },
	computed:{
	},
	methods: {
		...mapActions(['getGroups', 'getProjects', 'getBookmarks', 'getNotifications']),
		resetPassword() {
			this.forgotPassword = false;
		},
		validate() {
			// Empty Errors container
			this.validations = []; 
			// Check If Email Is Empty
			if (!this.user.email) {
				this.validations.push("Email is required!!");
			}
			// Check If Password Is Empty
			if (!this.user.password) {
				this.validations.push("Password is required!");
			}
			// Clear error messages on the page
			setTimeout(() => this.validations = [], 5000);
			// If No Errors Return True
			if (this.validations.length) {
				return false;
			}
			return true;
		},
		onFocus(event) {
			// event.target.style.background = 'pink';
			event.target.style.borderBottom = "1px solid #000000";
			event.target.previousElementSibling.style.top = '0.2rem';
			event.target.previousElementSibling.style.fontSize = '0.5rem';
			event.target.previousElementSibling.style.marginTop = '0rem';
		},
		onBlur(event) {
			if (event.target.value) {
				event.target.parentElement.style.border = 'none';
				event.target.style.backgroundColor = '#FFFFFF';
				// event.target.style.borderBottom = "none";
				event.target.previousElementSibling.style.top = '0.2rem';
				event.target.previousElementSibling.style.fontSize = '0.5rem';
				event.target.previousElementSibling.style.marginTop = '0rem';
			} else {
				event.target.parentElement.style.border = '1px solid #ff0000';
				event.target.style.backgroundColor = '';
				event.target.style.borderBottom = "1px solid #000000";
				event.target.previousElementSibling.style.top = '0rem';
				event.target.previousElementSibling.style.fontSize = '';
				event.target.previousElementSibling.style.marginTop = '0rem';
			}
		},
		Toggle() { 
			var temp = document.getElementById("typepass"); 
			if (temp.type === "password") { 
				temp.type = "text"; 
			} 
			else { 
				temp.type = "password"; 
			} 
		},
		notification() {
			if (this.message != '') {
				this.status = this.message;
				this.callFunction();
				this.$store.dispatch('getMessage', '');
			}
		},
		callFunction() {
			setTimeout(() => this.status = '', 10000);
        },
		async onSignIn () {
			let validate = this.validate();
			if (!validate) {
				return;
			}
			this.loading = true
			await this.$store.dispatch('signIn',{
				email: this.user.email,
				password: this.user.password
			})
			.then(async (res) => {
				if (res.user && res.user.emailVerified) {
					this.message = 'Your sign in was successful!!!';
					this.$store.dispatch('getMessage', this.message);
					this.loading = false;
					await this.$router.push(this.$route.query.redirect || '/dashboard');
				}
				else {
					this.loading = false;
					this.message = 'This email is not verified. Kindly verify and re-sign in!';
					this.$store.dispatch('getMessage', this.message);
					this.$emit('msg', this.message);
					return;
				}
			})
			.catch(err => {
				this.loading = false;
				this.message = err.message;
				this.$store.dispatch('getMessage', this.message);
				// this.$router.push({ name: 'Account' });
				return err;
			})
		},
	}
}
</script>

<style scoped>
.signin {
	background-color: #FFFFFF;
}
.title {
	text-align: center;
	font-weight: 500;
}
.required:after {
	color: #FF0000;
	content: "*";
	font-weight: 500;
	padding-left: 0.5rem;
}
.form-item {
	display: inline-block;
	padding: 1rem;
	margin-bottom: 1rem;
	border: 1px solid #fff;
	border-radius: 5px;
	width: 100%;
	position: relative;
	text-align: left;
}
.required:after {
	color: #FF0000;
	content: "*";
	font-weight: 500;
	padding-left: 0.1rem;
}
label[data-v-5614e21f] {
    position: absolute;
    margin-top: 0rem;
    top: 0rem;
}
textarea,
input[type=text],
input[type=email],
input[type=password],
input[type=tel] {
	width: 100%;
	padding: 0.5rem;
	outline: none;
	border: none;
	background-color: #FFFFFF;
	border-bottom: 1px solid #555;
	-webkit-transform: scale(1);
	transform: scale(1);
}
textarea,
[type='text']:focus,
[type='number']:focus,
[type='date']:focus,
[type='tel']:focus,
[type='search']:focus,
[type="email"]:focus,
[type='password']:focus {
	width: 100%;
	padding: 0.5rem;
	outline: none;
	border: none;
	background-color: #FFFFFF;
	border-bottom: 1px solid #000000;
	-webkit-transform: scale(1);
	transform: scale(1);
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active,
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
	/* -webkit-text-fill-color: #ffffff !important; */
	-webkit-box-shadow: 0 0 0 30px #FFFFFF inset !important;
	box-shadow: inset 0 0 6px #FFFFFF;
    appearance: menulist-button;
    background-color: #ffffff !important;
    background-image: none !important;
    color: -internal-light-dark(white, white) !important;
}
.text--content {
  text-align: center;
  margin: 2rem 0;
}
.btn {
	border: 0.1rem solid #f2ecec;
    background-color: #DFAB24;
	border-radius: 0.5rem;
	text-align: center;
	width: 100%;
	color: #FFFFFF;
	padding: 0.5rem 1rem;
	outline: none;
	/* margin: 1rem; */
	cursor: pointer;
	transition: all 1s ease-out;
}
.btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}

@media only screen and (min-width: 964px) {
.title {
	text-align: center;
	font-weight: 500;
}
.btn {
	border: 0.1rem solid #f2ecec;
	background-color: #DFAB24;
	border-radius: 0.5rem;
	text-align: center;
	width: 100%;
	font-size: 1.2rem;
	color: #FFFFFF;
	padding: 0.5rem 1rem;
	outline: none;
	/* margin: 1rem; */
	transition: all 1s ease-out;
}
.btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}
}
</style>