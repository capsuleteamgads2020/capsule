<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<section class="account">
			<transition name="fade">
				<!-- <div v-if="loading" class="loading"> -->
				<!-- <Loader></Loader> -->
				<!-- <Spinner :animation-duration="2500" :rhombus-size="15" color="#ff1d5e"></Spinner> -->
				<!-- </div> -->
			</transition>
			<!-- Toggle sign in/ up forms -->
			<div style="border: 1px solid #DFAB24; padding: 1rem 0; margin-bottom: 5rem;">
				<div class="auth--button">
					<button class="form_button" :class="{ formActive: isNew}" id="sign_up" @click.stop.prevent="signUP">Sign Up</button>
					<button class="form_button" :class="{ formActive: !isNew}" id="sign_in" @click.stop.prevent="signIn">Sign In</button>
				</div>
				<!-- form goes here -->
				<div class="forms">
					<!-- Sign up form goes here -->
					<div class="sign_up_form" v-if="isNew">
						<Signup @message="message"></Signup>
					</div>

					<!-- Sign in form goes here -->
					<div class="sign_in_form" v-else>
						<Signin @message="message"></Signin>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
import Signin from '@/components/auth/Signin.vue'
import Signup from '@/components/auth/Signup.vue'

export default {
	name: 'Account',
	components: {
		Header,
		Signin,
		Signup,
	},
	data() {
		return {
			menu: false,
			isNew: true,
			status: '',
			loading: false,
			errors: '',
			resetPass: {
				email: ''
			},
		}
	},
	computed: {
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
		},
		message(message) {
			this.status = message;
		},
		signUP () {
			this.isNew = true;
		},
		signIn () {
			this.isNew = false;
		},
		onCancelResetPassword () {
			this.forgotPassword = false
		}
	}
}
</script>

<style scoped>
.account {
	background-color: #FFFFFF;
	padding: 1rem 0rem;
}
.auth--button {
	text-align: center;
	background-color: #FFFFFF;
	padding: 1rem;
}
.forms {
	padding: 0rem 1rem;
	background-color: #FFFFFF;
}
.form_button {
	background: none;
	border: none;
	border-right: 1px solid #e2e2e2;
	border-bottom: 1px solid #e2e2e2;
	border: 1px solid #e2e2e2;
	outline: none;
	padding: 20px;
	width: 50%;
	font-size: 1.2em;
	box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}
.form_button:last-child {
	/* border-left: 1px solid #e2e2e2; */
	/* border-right: none; */
}
.form_button:hover {
	-webkit-box-shadow: 0px 12px 10px -13px rgba(0,0,0,0.75);
	-moz-box-shadow: 0px 12px 10px -13px rgba(0,0,0,0.75);
	box-shadow: 0px 12px 10px -13px rgba(0,0,0,0.75);
	/* box-shadow: 0 1px 3px rgba(0,0,0,1), 0 1px 2px rgba(0,0,0,1); */
}
.text--content {
  text-align: center;
  margin: 2rem 0;
}
/* Wider screen */
@media screen and (min-width: 940px) {
.account {
	padding-left: 25rem;
	padding-right: 25rem;
}
}
</style>