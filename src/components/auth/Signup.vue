<template>
	<div class="sign_up_form">
		<transition name="fade">
			<div v-if="loading" class="loading">
				<Loader class="loader" :loading="loading"></Loader>
			</div>
		</transition>
		<section class="title">
			<h2 class="page_header">Create account</h2>
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
						<label for="name" class="required">Full Name: </label>
						<input type="text" name="name" id="name" v-model="user.name" ref="name" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required style="color: -internal-light-dark(white, white) !important;"/>
					</div>
					<div class="form-item">
						<label for="phone" class="required">Phone Number: </label>
						<input type="tel" name="phone" id="phone" v-model="user.phone" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
					</div>
					<div class="form-item">
						<label for="email" class="required">Email: </label>
						<input type="email" name="email" id="email" v-model="user.email" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
					</div>
					<div class="form-item">
						<label for="password" class="required">Password: </label>
						<input type="password" name="password" id="password" v-model="user.password" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
					</div>
					<div class="form-item">
						<label for="confirm_password" class="required">Confirm Password: </label>
						<input type="password" name="confirm_password" id="confirm_password" v-model="user.confirm_password" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
					</div>
			<div class="text--content">
				<span>By clicking Sign Up, you agree to our <router-link class="anchors" :to="{ name: 'Terms' }"> Terms of Use </router-link> and our <router-link class="anchors" :to="{ name: 'Privacy' }"> Privacy Policy.</router-link></span>
			</div>
			<div class="wrap">
				<button class="btn" @click.prevent="onSignup()">Sign Up</button>
			</div>
			</form>
		</section>
		<!-- <transition name="fade">
		<div v-if="errMsg !== ''" class="error-msg">
			<p>{{ errMsg }}</p>
		</div>
		</transition> -->
	</div>
</template>

<script>
// @ is an alias to /src
import Loader from '@/components/partials/Loader.vue'
import { mapGetters } from 'vuex'
export default {
	name: 'signup',
	components: {
		Loader,
	},
	data () {
		return {
			loading: false,
			validations: [],
			user: {
				name: '',
				email: '',
				password: '',
				confirm_password: '',
				phone: '',
				created_at: new Date(),
				status: false
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
	computed: {
		...mapGetters(['message']),
	},
	methods: {
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
		validate() {
			// Empty Errors container
			this.validations = []; 
			// Check If Name Is Empty
			if (!this.user.name.split(' ')[1]) {
				this.validations.push("Full name is required!");
			}
			// Check If Email Is Empty
			if (!this.user.email) {
				this.validations.push("Email is required!!");
			}
			// Check If Phone Is Empty
			if (!this.user.phone) {
				this.validations.push("Phone number is required!");
			}
			// Check If Password Is Empty
			if (!this.user.password) {
				this.validations.push("Password is required!");
			}
			if(this.user.password && this.user.password != this.user.confirm_password) {
				this.validations.push("Password mis-match, enter matching passwords to continue!");
			}
			// Check name Characters Count
			// if (this.name && this.name.length > this.maxChars) {
			// 	this.validations.push(
			// 	`Username Cant Be More Than ${this.maxChars} Characters`
			// 	);
			// }
			// Clear error messages on the page
			setTimeout(() => this.validations = [], 5000);
			// If No Errors Return True
			if (this.validations.length) {
				return false;
			}
			return true;
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
		onSignup () {
			let validate = this.validate();
			if (!validate) {
				return;
			}
			this.loading = true;
			this.$store.dispatch('signUp',{
				email: this.user.email,
				password: this.user.password,
				name: this.user.name,
				phone: this.user.phone,
				created_at: this.user.created_at,
				status: this.user.status,
			})
			.then( res => {
				if (res.user.emailVerified) {
					this.loading = false;
					this.$store.dispatch('getMessage', 'Your sign up was successful, awaiting platform approval.');
					this.$router.push({ name: 'Dashboard'});
				}
				else {
					this.loading = false;
					var msg = `An email verification link has been sent to ${res.user.email}<br>Kindly verify your account to countinue using the platform.`;
					this.$store.dispatch('getMessage', msg);
					this.user = '';
					this.$router.push('/Account');
				}
			})
			.catch(err => {
				this.loading = false;
				this.$store.dispatch('getMessage', err.message);
				this.$router.push({ name: 'Home' });
				return err;
			});
		},
	}
}
</script>

<style scoped>
.danger {
	border: 1px solid #FF0000;
}
.signup {
	background-color: #FFFFFF;
}
.title {
	text-align: center;
	font-weight: 500;
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