<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
        <div class="projects--container">
            <section class="project--title">
                <h3 class="">Avialable Projects</h3>
                <!-- <div style="position: absolute; right: 0; top: 0;">
                    <button type="button" class="project--icon" :class="{'project--icon--enable': create}" @click="exitCreate()">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                            <g transform="translate(10,70) scale(0.05,-0.05)">
                                <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7"> </path>
                            </g>
                        </svg>
                    </button>
                </div> -->
                <!-- <div class="project--create--button">
                    <button type="button" class="project--btn" @click="enterCreate">Create Project</button>
                </div> -->
            </section><hr>
            <!-- <section v-if="create" class="project">
                <div class="project--title">
                    <h3 class="">Create a Project</h3>
                    <div style="position: absolute; right: 0; top: 0;">
                        <button type="button" class="project--icon" :class="{'project--icon--enable': create}" @click="exitCreate()">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7"> </path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
                <hr>
                <div>
                    <form action="">
                        <div class="form--item">
                            <label for="name" class="label required">Project Name: </label>
                            <input type="text" name="name" id="name" v-model="project.name" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="Project name" aria-required="true" aria-invalid="false" required/>
                        </div>
                        <div class="form--item">
                            <label for="description" class="label required">Description: </label>
                            <textarea class="project--description" name="description" id="description" v-model.trim="project.description" @keyup="textAreaAdjust($event)" ref="description" :maxlength="limit" @focus="onWrite($event)" placeholder="Project description?"></textarea>
                        </div>
                        <div class="form--item">
                            <label for="deadline" class="label required">Deadline: </label>
                            <input type="date" name="deadline" id="deadline" v-model="project.deadline" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="dd/mm/yyyy" aria-required="true" aria-invalid="false" required/>
                        </div>
                        <div class="form--item">
                            <label for="time" class="label required">Time: (00:00 to 23:59)</label>
                            <input type="time" name="time" id="time" v-model="project.time" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="00:00" aria-required="true" aria-invalid="false" required>
                        </div>
                        <div class="form--item">
                            <label for="contribution" class="label required">Contribution: </label>
                            <select v-model="project.currency" name="currency" id="currency" class="form--item--currency" style="font-size: 1rem;">
                                <option disabled value="">--</option>
                                <option value="NGN">NGN</option>
                                <option value="USD">USD</option>
                                <option value="EURO">EURO</option>
                                <option value="BTC">BTC</option>
                            </select>
                            <input type="text" name="contribution" id="contribution" v-model="project.contribution" style="width: 70%; font-size: 1rem !important;" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="30" aria-required="true" aria-invalid="false" required/>
                        </div>
                        <div>
                            <button type="button" class="btn" @click="createProject()">Submit Project</button>
                        </div>
                    </form>
                </div>
            </section> -->
            <section class="projects" v-for="project in filteredProjects" :key="project.id" style="position: relative;">
                <div class="projects--item--name">
                    <h3 class="">{{ project.name}}</h3>
                    <div style="position: absolute; right: 0; top: 0;">
                        <!-- <button v-if="project.owner" type="button" class="projects--icon" :class="{'projects--icon--enable': !update}" @click="updateProject()" :disabled="!update">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="pencil" unicode="" d="M203-7l50 51-131 131-51-51v-60h72v-71h60z m291 518q0 12-12 12-5 0-9-4l-303-302q-4-4-4-10 0-12 13-12 5 0 9 4l303 302q3 4 3 10z m-30 107l232-232-464-465h-232v233z m381-54q0-29-20-50l-93-93-232 233 93 92q20 21 50 21 29 0 51-21l131-131q20-22 20-51z" horiz-adv-x="857.1">
                                    </path>
                                </g>
                            </svg>
                        </button> -->
                        <button v-if="!project.owner && !project.subscriptions.includes(user.id)" type="button" class="projects--icon--subscribe" @click="subscribe(project)" >
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top;">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="bell-alt" unicode="" d="M509-96q0 8-9 8-33 0-57 24t-23 57q0 9-9 9t-9-9q0-41 29-70t69-28q9 0 9 9z m455 160q0-29-21-50t-50-21h-250q0-59-42-101t-101-42-101 42-42 101h-250q-29 0-50 21t-21 50q28 24 51 49t47 67 42 89 27 114 11 146q0 84 66 157t171 89q-5 10-5 21 0 23 16 38t38 16 38-16 16-38q0-11-5-21 106-16 171-89t66-157q0-78 11-146t27-114 42-89 47-67 51-49z" horiz-adv-x="1000"> </path>
                                </g>
                            </svg>
                            Subscribe
                        </button>
                        <button v-if="!project.owner && project.subscriptions.includes(user.id)" type="button" class="projects--icon--subscribe" @click="subscribe(project)" >
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top;">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#000000" glyph-name="bell-off" unicode="" d="M869 375q34-199 167-311 0-29-22-50t-50-21h-250q0-59-42-101t-101-42-100 42-42 100z m-298-480q9 0 9 9t-9 8q-32 0-56 24t-24 57q0 9-9 9t-9-9q0-41 29-70t69-28z m560 892q4-5 4-13t-6-12l-1045-905q-5-5-13-4t-12 6l-47 53q-4 6-4 14t6 12l104 89q-11 18-11 37 28 24 51 49t47 67 42 89 28 114 11 146q0 84 65 157t171 89q-4 10-4 21 0 23 15 38t38 16 38-16 16-38q0-11-4-21 69-10 122-46t82-88l234 202q5 5 13 4t12-6z" horiz-adv-x="1142.9"> </path>
                                </g>
                            </svg>
                            Unsubscribe
                        </button>
                    </div>
                </div><hr>
                <div class="projects--item--description">
                    <div>Description:</div>
                    <div>{{ project.description}}</div>
                </div>
                <div class="projects--items">
                    <div class="projects--item--created_at">
                        <div>Created:</div>
                        <div>{{timer(project.created_at)}}</div>
                    </div>
                    <div class="projects--item--deadline">
                        <div>Deadline:</div>
                        <div>{{ project.time}}  ·  {{ project.deadline}}</div>
                    </div>
                    <div class="projects--item--contribution">
                        <div>Contribution:</div>
                        <div>{{project.currency}} {{ project.contribution}}</div>
                    </div>
                </div>
                <!-- <div v-if="project.subscriptions.includes(user.id) && active != project" class="project--create--button">
                    <button type="button" class="project--btn" @click="active = project;">Donate</button>
                </div>
                <hr v-if="active == project">
                <div class="projects--donate--form" v-if="project.subscriptions.includes(user.id) && active == project">
                    <div class="projects--donate--form--title">
                        <h3 style="text-align: center; margin: .5rem 0">Payment Information</h3><hr>
                        <div style="position: absolute; right: 0; top: 0;">
                            <button type="button" class="project--icon" :class="{'project--icon--enable': create}" @click="active = ''">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7"> </path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <form class="projects--form" action="" method="post">
                        <div class="projects--donate--form--inputs">
                            <label for="card_name">Card Name:</label>
                            <input type="text" name="card_name" id="card_name" placeholder="JOHN DOE" aria-required="true" aria-invalid="false" required>
                        </div>
                        <div class="projects--donate--form--inputs">
                            <label for="card_number">Card Number:</label>
                            <input type="text" name="card_number" id="card_number" placeholder="0000 0000 0000 0000" aria-required="true" aria-invalid="false" required>
                        </div>
                        <div class="projects--donate--form--inputs">
                            <label for="card_number">Expiration:</label>
                            <input type="text" name="card_number" id="card_number" placeholder="mm/yy" aria-required="true" aria-invalid="false" required>
                        </div>
                        <div class="projects--donate--form--inputs">
                            <label for="card_number">Security Code:</label>
                            <input type="text" name="card_number" id="card_number" placeholder="000" aria-required="true" aria-invalid="false" required>
                        </div>
                        <div class="project--create--button" style="margin-left: auto; margin-right: .5rem;">
                            <button type="button" class="project--btn" @click="onPay(project); active = '';">Make Payment</button>
                        </div>
                    </form>
                </div> -->
            </section>
        </div>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
import { mapGetters } from 'vuex'
export default {
	name: 'Projects',
    components: {
        Header,
    },
    data() {
        return {
			menu: false,
            active: {},
            limit: 280,
            // subscribe: false,
            create: false,
            update: false,
            donate: false,
            project: {
                name: '',
                description: '',
                deadline: '',
                time: '',
                contribution: '',
                currency: '',
                active: true,
            },
        }
    },
	computed: {
        ...mapGetters(['projects', 'user']),
        filteredProjects() {
            return this.projects.filter(project => !project.subscriptions.includes(this.user.id));
        },
    },
    mounted() {
        this.timer();
    },
    methods: {
		toggleMenu(val) {
			this.menu = val;
		},
        enterCreate() {
            this.create = true;
        },
        exitCreate() {
            this.create = !this.create;
        },
		timer(ref_time) {
            const millis = Date.now() - ref_time;

            return Math.floor(millis / 1000) < 60? Math.floor(millis / 1000) + 's' : Math.floor(millis / 1000 / 60) < 60 ? Math.floor(millis / 1000 / 60) + 'm' :  Math.floor(millis / 1000 / 60 / 60) < 24 ? Math.floor(millis / 1000 / 60 / 60) + 'h' : Math.floor(millis / 1000 / 60 / 60 / 24) + 'd';
		},
		onWrite(event) {
			if (event) {
				this.focus = true;
			}
		},
        // Multi line textarea: https://stackoverflow.com/a/51908469 also check: https://github.com/facebook/flow/issues/2050#issuecomment-326773333
		textAreaAdjust(event) {
			event.target.style.height = "1px";
			event.target.style.height = (25+event.target.scrollHeight)+"px";
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
        subscribe(project) {
            if (!project.subscriptions.includes(this.user.id)) {
                project.subscriptions.push(this.user.id);
            } else {
                project.subscriptions.splice(project.subscriptions.indexOf(this.user.id), 1);
            }
        },
        // removeSubscription(project) {
        //     project.subscriptions.splice(project.subscriptions.indexOf(this.user.id), 1);
        //     this.subscribe = !this.subscribe
        // },
        onDonate() {
            this.donate = true;
        },
        onPay() {
            this.donate = false;
        },
        createProject() {
            this.projects.push({
                id: Date.now() + '_' + this.user.id,
                owner: true,
                user: this.user.full_name,
                name: this.project.name,
                description: this.project.description,
                deadline: this.project.deadline,
                time: this.project.time,
                currency: this.project.currency,
                contribution: this.project.contribution,
                active: this.project.active,
                created_at: Date.now(),
            });
            this.project = {}
            this.create = false;
        },
        updateProject() {},
    }
}
</script>

<style scoped>
.projects--container {
    padding: 1rem;
}
.projects {
    font-size: 1.5rem;
    font-size: inherit;
    display: block;
    margin-top: 1rem;
    /* background-color: #fff; */
    background-color: #edf2f7;
    border-radius: .25rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.project--create {
    margin: 1rem 0;
}
.project--create--button {
    padding: 1rem 0;
}
.project--btn {
	border: 0.1rem solid #f2ecec;
	background-color: #DFAB24;
    outline: none;
	border-radius: 0.5rem;
	text-align: center;
	width: 100%;
	color: #FFFFFF;
	padding: 0.5rem 1rem;
	margin: 0;
	cursor: pointer;
	transition: all 1s ease-out;
}
.project--btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}
.project {
    padding: .5rem 0;
    border-bottom: 8px solid #edf2f7;
    background-color: #fff;
    border-radius: 10px;
    /* border-bottom-width: 8px;
    border-color: #edf2f7; */
}
.project--title {
    position: relative;
    padding: 1rem;
}
.project--icon {
    /* background-color: #edf2f7; */
    border-radius: 9999px;
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
    margin-right: .5rem;
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
.project--icon:hover {
    background-color: #fff;
}
.project--icon--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.form {
    width: 100%;
}
.form--item {
	display: inline-block;
	padding: 1rem;
	margin-bottom: 1rem;
	border: 1px solid #555;
    border: none;
	border-radius: 5px;
	width: 100%;
	position: relative;
}
.form--item--currency {
    width: 30%;
    outline: none;
    border: none;
    border-bottom: 1px solid;
    padding: 0.45rem;
    font-size: 1rem !important;
}
.required:after {
	color: #FF0000;
	content: "*";
	font-weight: 500;
	padding-left: 0.1rem;
}
.label {
	position: absolute;
	margin-top: 0.3rem;
	/*   top: 0.5rem; */
}
.label {
    top: 0.2rem;
	font-size: 0.5rem;
	margin-top: 0rem;
}
textarea,
input[type=text],
input[type=email],
input[type=password],
input[type=date],
input[type=time],
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
    padding: .5rem 1rem;
    margin: 1rem .5rem;
}
.btn:hover {
    background-color: #fff;
}
.btn--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.project--description {
	width: 100%;
	padding: .2rem;
	resize: none;
	outline: none;
    border: none;
    border-bottom: 1px solid #000000;
	overflow:hidden;
}
.projects {
    margin: 1rem 0;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
}
.projects:hover {
    background-color:#f7fafc;
}
.projects--item--name {
    /* margin: 1rem 0; */
    padding: 1rem 0;
}
.projects--item--description,
.projects--item--deadline,
.projects--item--contribution,
.projects--item--created_at {
    text-align: left;
    margin: 1rem 0;
}
.projects--items {
    display: flex;
    justify-content: space-between;
    font-size: .8rem;
}
.projects--icon {
    /* background-color: #edf2f7; */
    border-radius: 9999px;
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
    /* margin-right: .5rem; */
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
.projects--icon:hover {
    background-color: #fff;
}
.projects--icon--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.projects--icon--subscribe {
    display: inline-block;
    font-size: .5rem;
    padding: .5rem;
    color: #718096;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem .5rem;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
}
.projects--icon--subscribe:hover {
    background-color: #fff;
}
/* .projects--icon--subscribe--enable {
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
} */
.projects--donate--form {
    text-align: left;
    margin: 1rem 0;
}
.projects--donate--form--title {
    position: relative;
    padding: 1.5rem;
}
.projects--donate--form--inputs {
    width: 100%;
    padding: .5rem 0;
}
/* Wider screen */
@media screen and (min-width: 480px) {
.projects--form {
    display: flex;
    flex-wrap: wrap;
}
.projects--donate--form--inputs {
    width: 50%;
    padding: .5rem;
}
.projects--icon--subscribe {
    display: inline-block;
    font-size: inherit;
    padding: .5rem;
    color: #718096;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.4rem .5rem;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #edf2f7;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
}
}
</style>