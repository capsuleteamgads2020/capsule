<template>
    <div class="group--container">
        <div>
            <section v-if="isAdmin" class="group--create">
                <div class="group--create--button">
                    <button type="button" class="group--btn" @click="enterCreate">Create Group</button>
                </div>
            </section>
            <section v-if="create" class="group">
                <div class="group--title">
                    <h3 class="">Create a Group</h3>
                    <div style="position: absolute; right: 0; top: 0;">
                        <button type="button" class="group--icon" :class="{'group--icon--enable': create}" @click="exitCreate()">
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
                            <label for="name" class="label required">Group Name: </label>
                            <input type="text" name="name" id="name" v-model="group.name" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="Group name" aria-required="true" aria-invalid="false" required/>
                        </div>
                        <div class="form--item">
                            <label for="description" class="label required">Group Description: </label>
                            <textarea class="group--description" name="description" id="description" v-model.trim="group.description" @keyup="textAreaAdjust($event)" ref="description" :maxlength="limit" @focus="onWrite($event)" placeholder="Group description"></textarea>
                        </div>
                        <div class="group--title">
                            <h3 class="">Partner Organisation</h3>
                        </div>
                        <div style="border: 1px solid #000000; margin-bottom: 10px;" v-for="(partner, counter) in partners" :key="counter">
                            <div class="group--title">
                                <h3 class="">Partner {{counter+1}}</h3>
                                <div style="position: absolute; right: 0; top: 0;">
                                    <button type="button" class="group--icon" :class="{'group--icon--enable': create}" @click="deletePartner()">
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                            <g transform="translate(10,70) scale(0.05,-0.05)">
                                                <path fill="#000000" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7"> </path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div><hr>
                            <div class="form--item">
                                <label for="partner_name" class="label">Name: </label>
                                <input type="text" name="partner_name" id="partner_name" v-model="partner.name" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="Name" aria-invalid="false"/>
                            </div>
                            <div class="form--item">
                                <label for="partner_email" class="label">Email: </label>
                                <input type="text" name="partner_email" id="partner_email" v-model="partner.email" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="Email" aria-invalid="false"/>
                            </div>
                            <div class="form--item">
                                <label for="partner_phone" class="label">Phone Number: </label>
                                <input type="tel" name="partner_phone" id="partner_phone" v-model="partner.phone" @focus="onFocus($event)" @blur="onBlur($event)" placeholder="+234 800 000 0000" aria-invalid="false"/>
                            </div>
                        </div>
                        <div style="position: relative; margin-bottom: 3rem;">
                            <div style="position: absolute; right: 0; top: 0;">
                                <button type="button" class="group--icon" :class="{'group--icon--enable': create}" @click="addPartner()">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: top; margin-left: 10px;">
                                        <g transform="translate(10,70) scale(0.05,-0.05)">
                                            <path fill="#000000" glyph-name="plus" unicode="" d="M786 439v-107q0-22-16-38t-38-15h-232v-233q0-22-16-37t-38-16h-107q-22 0-38 16t-15 37v233h-232q-23 0-38 15t-16 38v107q0 23 16 38t38 16h232v232q0 22 15 38t38 16h107q23 0 38-16t16-38v-232h232q22 0 38-16t16-38z" horiz-adv-x="785.7"> </path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn" @click="createGroup()">Submit group</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        <div v-if="groups">
            <section v-for="group in filteredGroups" :key="group.id">
                <div class="group">
                    <div class="group-preview">
                        <h6>Group</h6>
                        <h2>{{ group.name }}</h2>
                        <a href="#">
                            View all members: {{ group.members.length }}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100" style="vertical-align: bottom; color: #fff; opacity: 0.6;">
                                <g transform="translate(10,70) scale(0.05,-0.05)">
                                    <path fill="#ffffff" glyph-name="users" unicode="" d="M331 350q-90-3-148-71h-75q-45 0-77 22t-31 66q0 197 69 197 4 0 25-11t54-24 66-12q38 0 75 13-3-21-3-37 0-78 45-143z m598-356q0-66-41-105t-108-39h-488q-68 0-108 39t-41 105q0 30 2 58t8 61 14 61 24 54 35 45 48 30 62 11q6 0 24-12t41-26 59-27 76-12 75 12 60 27 41 26 23 12q35 0 63-11t47-30 35-45 24-54 15-61 8-61 2-58z m-572 713q0-59-42-101t-101-42-101 42-42 101 42 101 101 42 101-42 42-101z m393-214q0-89-63-152t-151-62-152 62-63 152 63 151 152 63 151-63 63-151z m321-126q0-43-31-66t-77-22h-75q-57 68-147 71 45 65 45 143 0 16-3 37 37-13 74-13 33 0 67 12t54 24 24 11q69 0 69-197z m-71 340q0-59-42-101t-101-42-101 42-42 101 42 101 101 42 101-42 42-101z">
                                    </path>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div class="group-info">
                        <!-- <div class="progress-container">
                            <div class="progress">Rating: {{ group.rating }}</div>
                            <span class="progress-text">Members: {{ group.members }}</span>
                        </div> -->
                        <div class="group-header">
                            <h6>Group Description</h6>
                        </div>
                        <div class="group-body">
                            <p class="description">{{ group.description }}</p>
                        </div>
                        <div class="group-footer">
                            <span class="rating">Rating: {{ group.rating }}</span>
                            <button type="button" class="btn" v-if="group.members.includes(user.uid)" @click="join(group)">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#ffffff" glyph-name="user-times" unicode="" d="M393 350q-89 0-152 63t-62 151 62 152 152 63 151-63 63-152-63-151-151-63z m601-179l139-138q5-6 5-13 0-8-5-13l-76-76q-5-5-12-5-8 0-13 5l-139 139-139-139q-5-5-13-5-7 0-12 5l-76 76q-5 5-5 13 0 7 5 13l139 138-139 139q-5 5-5 13 0 7 5 13l76 75q5 5 12 5 8 0 13-5l139-139 139 139q5 5 13 5 7 0 12-5l76-75q5-6 5-13 0-8-5-13z m-278 0l-101-101q-21-20-21-50 0-30 21-51l46-46q-11-2-24-2h-488q-67 0-108 39t-41 106q0 30 2 58t8 61 15 60 24 55 34 45 48 30 62 11q11 0 22-10 86-68 178-68t178 68q11 10 22 10 15 0 31-4-15-15-22-28t-8-31q0-30 21-51z" horiz-adv-x="1142.9">
                                        </path>
                                    </g>
                                </svg>
                                Leave
                            </button>
                            <button type="button" class="btn" v-if="!group.members.includes(user.uid)" @click="join(group)">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                         <path fill="#ffffff" glyph-name="user-plus" unicode="" d="M393 350q-89 0-152 63t-62 151 62 152 152 63 151-63 63-152-63-151-151-63z m536-71h196q7 0 13-6t5-12v-107q0-8-5-13t-13-5h-196v-197q0-7-6-12t-12-6h-107q-8 0-13 6t-5 12v197h-197q-7 0-12 5t-6 13v107q0 7 6 12t12 6h197v196q0 7 5 13t13 5h107q7 0 12-5t6-13v-196z m-411-125q0-29 21-51t50-21h143v-133q-38-28-95-28h-488q-67 0-108 39t-41 106q0 30 2 58t8 61 15 60 24 55 34 45 48 30 62 11q11 0 22-10 44-34 86-51t92-17 92 17 86 51q11 10 22 10 73 0 121-54h-125q-29 0-50-21t-21-50v-107z" horiz-adv-x="1142.9"> </path>
                                    </g>
                                </svg>
                                Join
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-else>No group!!!</div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
	name: 'Group',
    data() {
        return {
            create: false,
            limit: 280,
            group: {
                name: '',
                description: '',
                active: true,
            },
            partners: [
                {
                    name: '',
                    email: '',
                    phone: '',
                }
            ],
        }
    },
    watch: {
        groups: {
            handler(){
                this.$emit('group', this.groups.filter(group => group).length);
            },
            deep: true
        },
    },
    computed: {
        ...mapGetters(['groups', 'isAdmin', 'isUser', 'user']),
        filteredGroups() {
            return this.groups.filter(group => !!group.members.length && group.members.includes(this.user.uid));
        },
    },
    mounted() {
        this.$emit('group', this.groups.filter(group => group).length);
    },
    methods: {
        enterCreate() {
            this.create = true;
        },
        exitCreate() {
            this.create = !this.create;
        },
        addPartner(){
            this.partners.push({
                name: '',
                email: '',
                phone: '',
            })
        },
        deletePartner(counter){
            this.partners.splice(counter,1);
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
        createGroup() {
            this.$store.dispatch('addGroup', {
                name: this.group.name,
                description: this.group.description,
                active: this.group.active,
                partners: this.partners,
                created_at: Date.now(),
            })
        },
        join(group) {
            if (!group.members.includes(this.user.uid)) {
                group.members.push(this.user.uid);
            } else {
                group.members.splice(group.members.indexOf(this.user.uid), 1);
            }
        },
    }
}
</script>

<style scoped>
.group--container {
    display: block;
    margin-top: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.group--create {
    margin: 1rem 0;
}
.group--create--button {
    padding: 1rem 0;
}
.group--btn {
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
.group--btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}
.group {
    /* padding: .5rem 0;
    border-bottom: 8px solid #edf2f7;
    background-color: #fff;
    border-radius: 10px; */
    /* border-bottom-width: 8px;
    border-color: #edf2f7; */
}
.group--title {
    position: relative;
    padding: 1rem;
}
.group--icon {
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
.group--icon:hover {
    background-color: #fff;
}
.group--icon--enable {
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
.group--description {
	width: 100%;
	padding: .2rem;
	resize: none;
	outline: none;
    border: none;
    border-bottom: 1px solid #000000;
	overflow:hidden;
}
.group {
    background-color: #fff;
    border-radius: 10px 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    /* max-width: 100%; */
    margin: 1rem 0;
    /* overflow: hidden; */
    /* width: 700px; */
}
.group-preview {
    background-color: #DFAB24;
    border-radius: 10px 10px 0 0;
    color: #fff;
    padding: 30px;
    /* max-width: 250px; */
}
.group h6 {
    opacity: 0.6;
    margin: 0;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 1px solid;
}
.group h2 {
    letter-spacing: 1px;
    margin: 10px 0;
}
.group-preview a {
    color: #fff;
    display: inline-block;
    font-size: 12px;
    opacity: 0.6;
    margin-top: 30px;
    text-decoration: none;
}
.group-info {
    padding: 30px;
    position: relative;
    width: 100%;
}
.group-body .description {
    text-align: left;
}
.group-footer {
    display: flex;
    justify-content: space-between;
    text-align: left;
}
.group-footer .rating {
    font-size: 10px;
    opacity: 0.6;
    letter-spacing: 1px;
    /* margin-right: 0.5rem; */
}
/* button */
/* As per discussion on handling buttons https://codyhouse.co/blog/post/vertical-text-alignment-in-buttons-and-inputs */
.btn {
    /* reset user agent stylesheet */
    background-color: #DFAB24;
    border: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    color: #FFFFFF;
    appearance: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
}
.btn:hover {
    /* background-color: #FFFFFF;
    color: #DFAB24; */
    opacity: .5;
}
</style>