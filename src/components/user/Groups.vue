<template>
    <div>
		<div v-if="status" style="color: #ff0000; background-color: #fff; padding: .5rem 0; text-align: center;" v-html="status"></div>
	<!-- <div class="container" ref="" :class="{active: menu}"> -->
		<!-- <Header @toggleMenu="toggleMenu"></Header> -->
		<div class="groups--container">
            <section class="groups--title">
                <h3 class="">Avialable Groups</h3>
            </section><hr>
            <section v-if="!!filteredGroups.length" class="groups">
                <!-- Object.entries(userInfo).length !== 0 -->
                <div class="group" v-for="group in filteredGroups" :key="group.id">
                    <div class="group-preview">
                        <h6>Group</h6>
                        <h2>{{ group.name }}</h2>
                        <a href="#">
                            View all members: {{ group.members || 0 }}
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
                            <span class="rating">Rating: {{ group.rating || 0 }}</span>
                            <!-- <button type="button" class="btn" v-if="isUser" @click="join(group)">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                                    <g transform="translate(10,70) scale(0.05,-0.05)">
                                        <path fill="#ffffff" glyph-name="user-times" unicode="" d="M393 350q-89 0-152 63t-62 151 62 152 152 63 151-63 63-152-63-151-151-63z m601-179l139-138q5-6 5-13 0-8-5-13l-76-76q-5-5-12-5-8 0-13 5l-139 139-139-139q-5-5-13-5-7 0-12 5l-76 76q-5 5-5 13 0 7 5 13l139 138-139 139q-5 5-5 13 0 7 5 13l76 75q5 5 12 5 8 0 13-5l139-139 139 139q5 5 13 5 7 0 12-5l76-75q5-6 5-13 0-8-5-13z m-278 0l-101-101q-21-20-21-50 0-30 21-51l46-46q-11-2-24-2h-488q-67 0-108 39t-41 106q0 30 2 58t8 61 15 60 24 55 34 45 48 30 62 11q11 0 22-10 86-68 178-68t178 68q11 10 22 10 15 0 31-4-15-15-22-28t-8-31q0-30 21-51z" horiz-adv-x="1142.9">
                                        </path>
                                    </g>
                                </svg>
                                Leave
                            </button> -->
                            <button type="button" class="btn" @click="join(group)">
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
            <section v-else class="groups" style="padding-top: 2rem; padding-bottom: 2rem;">
                <div>No group available!!!</div>
            </section>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/partials/Header.vue'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
    name: 'Groups',
    components: {
        // Header,
    },
    data() {
        return {
            menu: false,
            status,
        }
    },
    watch: {
        // groups: {
        //     handler(){
        //         this.$emit('group', this.groups.filter(group => group).length);
        //     },
        //     deep: true
        // },
    },
    computed: {
        ...mapGetters(['groups', 'user', 'isUser', 'userInfo', 'message']),
        filteredGroups() {
            if (this.isUser && this.userInfo) {
                return this.groups.filter(group => !this.userInfo.groups.includes(group.id));
            }
            return this.groups;
        },
    },
    mounted() {
        // this.$store.dispatch('getGroups');
        // this.$emit('group', this.groups.filter(group => group).length);
    },
    methods: {
		toggleMenu(val) {
			this.menu = val;
		},
		callFunction() {
            setTimeout(() => this.status = '', 10000);
        },
        notification() {
			if (this.message != '') {
				this.status = this.message;
				this.callFunction();
				this.$store.dispatch('getMessage', '');
			}
		},
        join(group) {
            if (!this.isUser) {
                this.$store.dispatch('getMessage', 'Sign in to join group');
                this.notification();
                return;
            }
            if (this.userInfo.groups.includes(group.id)) {
                return;
            }
            var joinGroup = firebase.functions().httpsCallable('joinGroup');
            joinGroup({id: group.id, name: group.name, user_id: this.user.uid})
            .then((res) => {
                // Read result of the Cloud Function.
                this.$store.dispatch('joinGroup', group);
                this.$store.dispatch('updateUserInfoGroup', group);
                this.$store.dispatch('getMessage', res.data.message);
                if (this.message != '') {
                    this.status = this.message;
                    this.callFunction();
                }
            })
            .catch((error) => {
                this.$store.dispatch('getMessage', error.message);
            });
        },
    }
}
</script>

<style scoped>
/* .groups--container {
    padding: 1rem;
} */
.groups--title {
    padding: 1rem;
}
.groups {
    display: block;
    margin-top: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.group {
    background-color: #fff;
    border-radius: 10px 10px 0 0 ;
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
    /* background-color: #DFAB24;
    color: #DFAB24; */
    opacity: .5;
}
</style>