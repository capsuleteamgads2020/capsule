<template>
    <div class="settings--container">
        <div>
            <section class="settings">
                <div class="avatar">
                    <div class="settings--header">
                        <h3 class="">Edit Profile</h3>
                        <div style="position: absolute; right: 0; top: 0;">
                            <button type="button" class="settings--icon" :class="{'settings--icon--enable': disabledAvatar}" @click="enableAvatar()" :disabled="!disabledAvatar">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#000000" glyph-name="pencil" unicode="" d="M203-7l50 51-131 131-51-51v-60h72v-71h60z m291 518q0 12-12 12-5 0-9-4l-303-302q-4-4-4-10 0-12 13-12 5 0 9 4l303 302q3 4 3 10z m-30 107l232-232-464-465h-232v233z m381-54q0-29-20-50l-93-93-232 233 93 92q20 21 50 21 29 0 51-21l131-131q20-22 20-51z" horiz-adv-x="857.1">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="settings--body">   
                        <form class="form">
                            <div class="form-item">
                                <button type="button" class="settings--image--button">
                                    <img :alt="user.displayName" src="../../assets/avatar.jpeg">
                                    <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="250" height="250" viewBox="0 0 100 100">
                                        <g transform="translate(10,70) scale(0.05,-0.05)">
                                            <path glyph-name="user" unicode="" fill="#adadad" d="M786 66q0-67-41-106t-108-39h-488q-67 0-108 39t-41 106q0 30 2 58t8 61 15 60 24 55 34 45 48 30 62 11q5 0 24-12t41-27 60-27 75-12 74 12 61 27 41 27 24 12q34 0 62-11t48-30 34-45 24-55 15-60 8-61 2-58z m-179 498q0-88-63-151t-151-63-152 63-62 151 62 152 152 63 151-63 63-152z">
                                            </path>
                                        </g>
                                    </svg> -->
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40" viewBox="0 0 100 100">
                                        <g transform="translate(10,70) scale(0.05,-0.05)">
                                            <path fill="blue" glyph-name="picture-2" unicode="" d="M357 529q0-45-31-76t-76-32-76 32-31 76 31 75 76 32 76-32 31-75z m572-215v-250h-786v107l178 179 90-89 285 285z m53 393h-893q-7 0-12-5t-6-13v-678q0-7 6-13t12-5h893q7 0 13 5t5 13v678q0 8-5 13t-13 5z m89-18v-678q0-37-26-63t-63-27h-893q-36 0-63 27t-26 63v678q0 37 26 63t63 27h893q37 0 63-27t26-63z">
                                            </path>
                                        </g>
                                    </svg>
                                </button>
                                <label for="avatar" class="required">
                                    <input type="file" name="avatar" id="avatar" :disabled="disabledAvatar" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required style="color: -internal-light-dark(white, white) !important;"/>
                                </label>
                            </div>
                        </form>
                    </div>
                    <hr>
                    <!-- <div class="settings--item flex hover:bg-gray-100 items-center px-4 py-2">
                        <i class="settings--icon bg-gray-200 h-10 inline-block material-icons mr-4 p-2 rounded-full text-gray-600 w-10">edit</i>Edit
                        Profile
                    </div> -->
                    <div class="settings--footer">
                        <button type="button" class="btn" :class="{'btn--enable': !disabledAvatar}" @click.prevent="enableAvatar()" :disabled="disabledAvatar">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
                                    </path>
                                </g>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="btn" :class="{'btn--enable': !disabledAvatar}" @click.prevent="updateAvatar()" :disabled="disabledBio">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="ok" unicode="" d="M932 534q0-22-15-38l-404-404-76-76q-16-15-38-15t-38 15l-76 76-202 202q-15 16-15 38t15 38l76 76q16 16 38 16t38-16l164-165 366 367q16 16 38 16t38-16l76-76q15-16 15-38z" horiz-adv-x="1000">
                                    </path>
                                </g>
                            </svg>
                            Save
                        </button>
                    </div>
                </div>
            </section>
            <section class="settings">
                <div class="bio">
                    <div class="settings--header">
                        <h3 class="">Edit Profile</h3>
                        <div style="position: absolute; right: 0; top: 0;">
                            <button type="button" class="settings--icon" :class="{'settings--icon--enable': disabledBio}" @click="enableBio()" :disabled="!disabledBio">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#000000" glyph-name="pencil" unicode="" d="M203-7l50 51-131 131-51-51v-60h72v-71h60z m291 518q0 12-12 12-5 0-9-4l-303-302q-4-4-4-10 0-12 13-12 5 0 9 4l303 302q3 4 3 10z m-30 107l232-232-464-465h-232v233z m381-54q0-29-20-50l-93-93-232 233 93 92q20 21 50 21 29 0 51-21l131-131q20-22 20-51z" horiz-adv-x="857.1">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="settings--body">     
                        <form class="form">
                            <div class="form-item">
                                <label for="name" class="required">Full Name: </label>
                                <input type="text" name="name" id="name" v-model="name" :disabled="disabledBio" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required style="color: -internal-light-dark(white, white) !important;"/>
                            </div>
                            <div class="form-item">
                                <label for="phone" class="required">Phone Number: </label>
                                <input type="tel" name="phone" id="phone" v-model="phone" :disabled="disabledBio" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
                            </div>
                        </form>
                    </div>
                    <hr>
                    <div class="settings--footer">
                        <button type="button" class="btn" :class="{'btn--enable': !disabledBio}" @click.prevent="enableBio()" :disabled="disabledBio">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
                                    </path>
                                </g>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="btn" :class="{'btn--enable': !disabledBio}" @click.prevent="updateBio()" :disabled="disabledBio">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="ok" unicode="" d="M932 534q0-22-15-38l-404-404-76-76q-16-15-38-15t-38 15l-76 76-202 202q-15 16-15 38t15 38l76 76q16 16 38 16t38-16l164-165 366 367q16 16 38 16t38-16l76-76q15-16 15-38z" horiz-adv-x="1000">
                                    </path>
                                </g>
                            </svg>
                            Save
                        </button>
                    </div>
                </div>
            </section>
            <section class="settings">
                <div class="email">
                    <div class="settings--header">
                        <h3 class="">Update Email</h3>
                        <div style="position: absolute; right: 0; top: 0;">
                            <button type="button" class="settings--icon" :class="{'settings--icon--enable': disabledEmail}" @click="enableEmail()" :disabled="!disabledEmail">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#000000" glyph-name="pencil" unicode="" d="M203-7l50 51-131 131-51-51v-60h72v-71h60z m291 518q0 12-12 12-5 0-9-4l-303-302q-4-4-4-10 0-12 13-12 5 0 9 4l303 302q3 4 3 10z m-30 107l232-232-464-465h-232v233z m381-54q0-29-20-50l-93-93-232 233 93 92q20 21 50 21 29 0 51-21l131-131q20-22 20-51z" horiz-adv-x="857.1">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="settings--body">        
                        <form class="form">
                            <div class="form-item">
                                <label for="email" class="required">Email: </label>
                                <input type="email" name="email" id="email" v-model="email" :disabled="disabledEmail" @focus="onFocus($event)" @blur="onBlur($event)" aria-required="true" aria-invalid="false" required/>
                            </div>
                        </form>
                    </div>
                    <hr>
                    <div class="settings--footer">
                        <button type="button" class="btn" :class="{'btn--enable': !disabledEmail}" @click.prevent="enableEmail()" :disabled="disabledEmail">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
                                    </path>
                                </g>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="btn" :class="{'btn--enable': !disabledEmail}" @click.prevent="updateEmail()" :disabled="disabledEmail">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="ok" unicode="" d="M932 534q0-22-15-38l-404-404-76-76q-16-15-38-15t-38 15l-76 76-202 202q-15 16-15 38t15 38l76 76q16 16 38 16t38-16l164-165 366 367q16 16 38 16t38-16l76-76q15-16 15-38z" horiz-adv-x="1000">
                                    </path>
                                </g>
                            </svg>
                            Save
                        </button>
                    </div>
                </div>
            </section>
            <section class="settings">
                <div class="password">
                    <div class="settings--header">
                        <h3 class="">Change Password</h3>
                        <div style="position: absolute; right: 0; top: 0;">
                            <button type="button" class="settings--icon" :class="{'settings--icon--enable': disabledPassword}" @click="enablePassword()" :disabled="!disabledPassword">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#000000" glyph-name="pencil" unicode="" d="M203-7l50 51-131 131-51-51v-60h72v-71h60z m291 518q0 12-12 12-5 0-9-4l-303-302q-4-4-4-10 0-12 13-12 5 0 9 4l303 302q3 4 3 10z m-30 107l232-232-464-465h-232v233z m381-54q0-29-20-50l-93-93-232 233 93 92q20 21 50 21 29 0 51-21l131-131q20-22 20-51z" horiz-adv-x="857.1">
                                        </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="settings--body">         
                        <form class="form">
                            <div class="form-item">
                                <label for="password" class="required">Old Password: </label>
                                <input autofocus type="password" name="password" id="password" v-model="password" :disabled="disabledPassword" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="old password" aria-required="true" aria-invalid="false" required/>
                            </div>
                            <div class="form-item">
                                <label for="new_password" class="required">New Password: </label>
                                <input type="password" name="new_password" id="new_password" v-model="new_password" :disabled="disabledPassword" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="new password" aria-required="true" aria-invalid="false" required/>
                            </div>
                            <div class="form-item">
                                <label for="confirm_password" class="required">Confirm Password: </label>
                                <input type="password" name="confirm_password" id="confirm_password" v-model="confirm_password" :disabled="disabledPassword" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="confirm password" aria-required="true" aria-invalid="false" required/>
                            </div>
                        </form>
                    </div>
                    <hr>
                    <div class="settings--footer">
                        <button type="button" class="btn" :class="{'btn--enable': !disabledPassword}" @click.prevent="enablePassword()" :disabled="disabledPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
                                    </path>
                                </g>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="btn" :class="{'btn--enable': !disabledPassword}" @click.prevent="updatePassword()" :disabled="disabledPassword">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="ok" unicode="" d="M932 534q0-22-15-38l-404-404-76-76q-16-15-38-15t-38 15l-76 76-202 202q-15 16-15 38t15 38l76 76q16 16 38 16t38-16l164-165 366 367q16 16 38 16t38-16l76-76q15-16 15-38z" horiz-adv-x="1000">
                                    </path>
                                </g>
                            </svg>
                            Save
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Settings',
    data() {
        return {
            // settings: true,
            disabledAvatar: true,
            disabledBio: true,
            disabledEmail: true,
            disabledPassword: true,
            bio: false,
            name: 'John Doe',
            phone: '+2348030003000',
            email: 'john.doe@capsule.com',
            old_password: 'password',
            password: '',
            new_password: '',
            confirm_password: '',
        }
    },
	computed: {
        ...mapGetters(['user', 'userInfo', 'message']),
    },
    mounted() {
        // this.onBlur()
    },
    methods: {
        enableAvatar() {
            this.disabledAvatar = !this.disabledAvatar;
        },
        enableBio() {
            this.disabledBio = !this.disabledBio;
        },
        enableEmail() {
            this.disabledEmail = !this.disabledEmail;
        },
        enablePassword() {
            this.disabledPassword = !this.disabledPassword;
        },
        // Validate form as per here: https://laracasts.com/discuss/channels/vue/vuejs-check-if-field-not-empty?reply=144962
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
				// event.target.style.borderBottom = 'none';
				event.target.previousElementSibling.style.top = '';
				event.target.previousElementSibling.style.fontSize = '';
				event.target.previousElementSibling.style.marginTop = '0.3rem';
			}
		},
    }
}
</script>

<style scoped>
.settings--container {
    font-size: inherit;
    display: block;
    margin-top: 1rem;
    /* background-color: #fff; */
    background-color: #edf2f7;
    border-radius: .25rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.settings {
    padding: .5rem 0;
    border-bottom: 8px solid #edf2f7;
    background-color: #fff;
    border-radius: 10px;
    /* border-bottom-width: 8px;
    border-color: #edf2f7; */
}.settings:hover {
    background-color:#f7fafc;
}
.settings--image--button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    border-radius: 0;
    /* color: inherit; */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 0;
    margin: 0;
}
input[type="file"] {
    position: absolute;
    top: -500px;
}
.settings .avatar,
.settings .bio,
.settings .email,
.settings .password {
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}
.settings--header {
    /* border-bottom: 1px solid; */
    position: relative;
    margin: 1.5rem 0;
    padding: 1rem 0;
}
.settings--header h3 {
    font-weight: 700;
    color: #000000;
    /* padding: .5rem 1rem; */
}
.settings--body {
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    margin: 1rem 0;
}
/* .settings--body:hover {
    background-color:#f7fafc;
} */
.form {
    width: 100%;
}
.form-item {
	display: inline-block;
	padding: 1rem;
	margin-bottom: 1rem;
	border: 1px solid #555;
    border: none;
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
label {
    top: 0.2rem;
	font-size: 0.5rem;
	margin-top: 0rem;
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
    border-bottom: 1px solid #000000;
	background-color: #FFFFFF;
	/* -webkit-transform: scale(1);
	transform: scale(1); */
}
/* input[type=text]:focus {
	width: 100%;
} */
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
.settings--icon {
    /* background-color: #edf2f7; */
    border-radius: 9999px;
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 1rem;
    padding: .5rem;
    color: #718096;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    outline: none;
    border: none;
    cursor: pointer;
    /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3); */
}
.settings--icon:hover {
    background-color: #fff;
}
.settings--icon--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.settings--footer {
    font-weight: 700;
    color: #000000;
    padding: .5rem 1rem;
    /* border-top: 1px solid; */
    text-align: right;
}
/* button */
/* As per discussion on handling buttons https://codyhouse.co/blog/post/vertical-text-alignment-in-buttons-and-inputs */
.btn {
    /* reset user agent stylesheet */
    /* background-color: #edf2f7; */
    border: 0;
    /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3); */
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    color: #000000;
    appearance: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 1rem;
    margin: 1rem .5rem;
}
.btn:hover {
    background-color: #fff;
}
.btn--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
</style>