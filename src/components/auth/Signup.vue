<template>
  <div class="sign_up_form">
    <transition name="fade">
      <div v-if="loading" class="loading">
        <Loader class="loader" :loading="loading"></Loader>
      </div>
    </transition>
    <div class="title">
      <h2 class="page_header">Create account</h2>
      <hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; border: 0;">
    </div>
    <form class="forms">
			<div class="form-item">
				<label for="name" class="required">Full Name: </label>
				<input type="text" name="name" id="name" v-model="user.name" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required style="color: -internal-light-dark(white, white) !important;"/>
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
        <span>By clicking Sign In, you agree to our <router-link class="anchors" :to="{ name: 'Terms' }"> Terms of Use </router-link> and our <router-link class="anchors" :to="{ name: 'Privacy' }"> Privacy Policy.</router-link></span>
      </div>
      <div class="wrap">
        <button class="btn" @click.prevent="onSignup()">Sign Up</button>
      </div>
    </form>
    <!-- <transition name="fade">
      <div v-if="errMsg !== ''" class="error-msg">
        <p>{{ errMsg }}</p>
      </div>
    </transition> -->
  </div>
</template>

<script>
import Loader from '@/components/partials/Loader.vue'
export default {
	name: 'signup',
	components: {
		Loader,
	},
	data () {
		return {
			loading: false,
			message: '',
			errMsg: '',
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
	computed: {
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
				event.target.style.backgroundColor = '#FFFFFF';
				// event.target.style.borderBottom = "none";
				event.target.previousElementSibling.style.top = '0.2rem';
				event.target.previousElementSibling.style.fontSize = '0.5rem';
				event.target.previousElementSibling.style.marginTop = '0rem';
			} else {
				event.target.style.backgroundColor = '';
				event.target.style.borderBottom = "1px solid #000000";
				event.target.previousElementSibling.style.top = '';
				event.target.previousElementSibling.style.fontSize = '';
				event.target.previousElementSibling.style.marginTop = '0.3rem';
			}
		},
		onlyNumbers: function() {
		var regex = /[^0-9]/gi;
		this.user.phone = this.user.phone.replace(regex,'');
		},
		// onlyText: function() {
		//   var regex = /[^0-9]/gi;
		//   this.user.phone = this.user.phone.replace(regex,'');
		// },user.emailVerified
		onSignup () {
			this.loading = true
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
					this.message = 'Your sign up was successful, awaiting platform approval.';
					this.$store.dispatch('getMessage', this.message);
					this.$router.push({ name: 'Dashboard'});
				}
				else {
					this.loading = false;
					this.message = `An email verification link has been sent to ${res.user.email}<br>Kindly verify your account to countinue using the platform.`;
					this.$store.dispatch('getMessage', this.message);
					// this.$store.dispatch('signOut')
					this.user = '';
					// return;
					this.$router.push('/Account');
					// this.$router.push({ name: 'Home' });
				}
			})
			.catch(err => {
				this.loading = false;
				this.message = err.message;
				this.$store.dispatch('getMessage', this.message);
				this.$router.push({ name: 'Home' });
				return err;
			})
		}
	}
}
</script>

<style scoped>
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
	/* border: 1px solid #555; */
	border-radius: 5px;
	width: 100%;
	position: relative;
}
.required:after {
	color: #FF0000;
	content: "*";
	font-weight: 500;
	padding-left: 0.1rem;
}
label {
	position: absolute;
	margin-top: 0.3rem;
	/*   top: 0.5rem; */
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
	border-bottom: 1px solid #000000;
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
	-webkit-transform: scale(1);
	transform: scale(1);
}
input[type=text]:focus {
	width: 100%;
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