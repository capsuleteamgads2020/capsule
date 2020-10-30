<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="dashboard">
			<section>
				<h1>{{ user.full_name }}'s Dashboard</h1>
				<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; margin: 1rem 0; border: 0;">
			</section>
			<section class="profile">
				<div class="avatar">
					<img :alt="user.full_name" src="../assets/avatar.jpeg">
				</div>
				<div class="icon--container">
					<!-- As per svg description here: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text -->
					<button class="notification" @click="enableNotification">
						<!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" width="40" height="40"> -->
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 55" class="icon">
							<title>notification</title>
							<!-- <text x="55" y="40" fill="red">{{ notifications }}</text> -->
							<g transform="translate(10,70) scale(0.05,-0.05)">
								<path class="profile--icon" glyph-name="mail" unicode="" d="M929 11v428q-18-20-39-37-149-114-238-188-28-24-46-38t-48-27-57-13h-2q-26 
									0-57 13t-48 27-46 38q-88 74-238 188-21 17-39 37v-428q0-8 6-13t12-5h822q7 0 12 5t6 13z m0 586v14t-1 7-1 7-3 5-5 4-8 2h-822q-7 
									0-12-6t-6-12q0-94 82-159 108-84 224-177 4-2 20-16t25-21 25-17 28-16 24-5h2q11 0 24 5t28 16 25 17 25 21 20 16q116 93 224 177 30 
									24 56 65t26 73z m71 21v-607q0-37-26-63t-63-27h-822q-36 0-63 27t-26 63v607q0 37 26 63t63 26h822q37 0 63-26t26-63z" horiz-adv-x="1000">
								</path>
							</g>
							<circle v-if="notifications" cx="55" cy="35" r="10" stroke="#ff0000" stroke-width="3" fill="#ff0000"></circle>
							<!-- <text v-if="notifications" x="52" y="38" fill="#ffffff">{{ notifications }}</text> -->
							<text v-if="notifications" :x="x" :y="y" fill="#ffffff">{{ unreadNotifications }}</text>
							<text x="2" y="100" fill="#DFAB24">Notification</text>
							<line v-if="isNotification" x1="0" y1="105" x2="70" y2="105" style="stroke: #DFAB24; stroke-width: 4;"></line>
							<!-- <line x1="0" y1="100" x2="200" y2="100" style="stroke:rgb(255,0,0);stroke-width:4" /> -->
						</svg>
						<!-- <span>Notification</span> -->
					</button>
					<button class="group" @click="enableGroup">
						<!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40" viewBox="0 0 100 100"> -->
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 55" class="icon">
							<title>group</title>
							<g transform="translate(10,70) scale(0.05,-0.05)">
								<path class="profile--icon" glyph-name="users" unicode="" d="M331 350q-90-3-148-71h-75q-45 0-77 22t-31 66q0 197 69 197 4 0 
									25-11t54-24 66-12q38 0 75 13-3-21-3-37 0-78 45-143z m598-356q0-66-41-105t-108-39h-488q-68 0-108 39t-41 105q0 30 
									2 58t8 61 14 61 24 54 35 45 48 30 62 11q6 0 24-12t41-26 59-27 76-12 75 12 60 27 41 26 23 12q35 0 63-11t47-30 
									35-45 24-54 15-61 8-61 2-58z m-572 713q0-59-42-101t-101-42-101 42-42 101 42 101 101 42 101-42 42-101z 
									m393-214q0-89-63-152t-151-62-152 62-63 152 63 151 152 63 151-63 63-151z m321-126q0-43-31-66t-77-22h-75q-57 
									68-147 71 45 65 45 143 0 16-3 37 37-13 74-13 33 0 67 12t54 24 24 11q69 0 69-197z m-71 340q0-59-42-101t-101-42-101 
									42-42 101 42 101 101 42 101-42 42-101z">
								</path>
							</g>
							<circle v-if="filteredGroups" cx="55" cy="35" r="10" stroke="#ff0000" stroke-width="3" fill="#ff0000"></circle>
							<text v-if="filteredGroups" x="52" y="38" fill="#ffffff">{{ filteredGroups }}</text>
							<line v-if="isGroup" x1="14" y1="105" x2="53" y2="105" style="stroke: #DFAB24; stroke-width: 4;"></line>
							<!-- <text x="15" y="100" fill="#DFAB24">Group</text> -->
							<text x="15" y="100" fill="#DFAB24">Group</text>
						</svg>
						<!-- <span>Group</span> -->
					</button>
					<button class="setting" @click="enableSettings">
						<!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40" viewBox="0 0 100 100"> -->
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 55" class="icon">
							<title>settings</title>
							<g transform="translate(10,70) scale(0.05,-0.05)">
								<path class="profile--icon" glyph-name="cog" unicode="" d="M571 350q0 59-41 101t-101 42-101-42-42-101 42-101 101-42 101 42 41 101z m286 
									61v-124q0-7-4-13t-11-7l-104-16q-10-30-21-51 19-27 59-77 6-6 6-13t-5-13q-15-21-55-61t-53-39q-7 0-14 5l-77 
									60q-25-13-51-21-9-76-16-104-4-16-20-16h-124q-8 0-14 5t-6 12l-16 103q-27 9-50 21l-79-60q-6-5-14-5-8 0-14 6-70 
									64-92 94-4 5-4 13 0 6 5 12 8 12 28 37t30 40q-15 28-23 55l-102 15q-7 1-11 7t-5 13v124q0 7 5 13t10 7l104 16q8 25 
									22 51-23 32-60 77-6 7-6 14 0 5 5 12 15 20 55 60t53 40q7 0 15-5l77-60q24 13 50 21 9 76 17 104 3 16 20 16h124q7 0 
									13-5t7-12l15-103q28-9 50-20l80 59q5 5 13 5 7 0 14-5 72-67 92-95 4-5 4-12 0-7-4-13-9-12-29-37t-30-40q14-28 
									23-54l102-16q7-1 12-7t4-13z" horiz-adv-x="857.1">
								</path>
							</g>
							<!-- <text x="10" y="100" fill="#DFAB24">Settings</text> -->
							<text x="10" y="100" fill="#DFAB24">Settings</text>
							<line v-if="isSettings" x1="10" y1="105" x2="56" y2="105" style="stroke: #DFAB24; stroke-width: 4;"></line>
						</svg>
						<!-- <span>Settings</span> -->
					</button>
					<button class="bookmarks" @click="enableBookmarks">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 55" class="icon">
							<title>Bookmarks</title>
							<g transform="translate(10,70) scale(0.05,-0.05)">
								<path class="bookmark--icon" glyph-name="bookmark" unicode="" d="M650 779q12 0 24-5 19-8 29-23t11-35v-719q0-19-11-35t-29-23q-10-4-24-4-27 0-47 
									18l-246 236-246-236q-20-19-46-19-13 0-25 5-18 7-29 23t-11 35v719q0 19 11 35t29 23q12 5 25 5h585z" horiz-adv-x="714.3">
								</path>
							</g>
							<text x="0" y="100" fill="#DFAB24">Bookmarks</text>
							<line v-if="isBookmarks" x1="0" y1="105" x2="64" y2="105" style="stroke: #DFAB24; stroke-width: 4;"></line>
						</svg>
					</button>
					<button class="project" @click="enableProject">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 55" class="icon">
							<title>Project</title>
							<g transform="translate(10,70) scale(0.05,-0.05)">
								<path class="project--icon" glyph-name="gift" unicode="" d="M518 93v400h-179v-400q0-14 10-21t26-8h107q16 0 26 8t10 21z m-255 471h109l-70 90q-15 17-39 17-22 0-38-15t-15-38 15-38 38-16z m384 54q0 22-15 38t-38 15q-24 0-39-17l-69-90h108q22 0 38 16t15 38z m210-143v-179q0-7-5-12t-13-5h-53v-233q0-22-16-37t-38-16h-607q-22 0-38 16t-16 37v233h-53q-8 0-13 5t-5 12v179q0 8 5 13t13 5h245q-51 0-88 36t-37 89 37 88 88 37q60 0 94-43l72-92 71 92q34 43 94 43 52 0 88-37t37-88-37-89-88-36h245q8 0 13-5t5-13z" horiz-adv-x="857.1">
								</path>
							</g>
							<text x="12" y="100" fill="#DFAB24">Project</text>
							<line v-if="isProject" x1="12" y1="105" x2="52" y2="105" style="stroke: #DFAB24; stroke-width: 4;"></line>
						</svg>
					</button>
				</div>
			</section>
			<section v-if="isNotification">
				<!-- <Notifications @notification="notification"></Notifications> -->
				<Notifications></Notifications>
			</section>
			<section v-if="isGroup">
				<!-- <Groups @group="group"></Groups> -->
				<Group></Group>
			</section>
			<section v-if="isSettings">
				<Settings></Settings>
			</section>
			<section v-if="isBookmarks">
				<Bookmarks></Bookmarks>
			</section>
			<section v-if="isProject">
				<Project></Project>
			</section>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
import Notifications from '@/components/user/Notifications.vue'
import Group from '@/components/user/Group.vue'
import Settings from '@/components/user/Settings.vue'
import Bookmarks from '@/components/user/Bookmarks.vue'
import Project from '@/components/user/Project.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard',
	components: {
		Header,
		Notifications,
		Group,
		Settings,
		Bookmarks,
		Project,
	},
	data() {
		return {
			x: 52,
			y: 38,
			isNotification: true,
			isGroup: false,
			isSettings: false,
			isBookmarks: false,
			isProject: false,
			// notifications: '',
			// groups: '',
			menu: false,
		}
	},
	computed: {
		...mapGetters(['notifications', 'bookmarks', 'groups', 'user']),
		// ...mapState(['bookmarks', 'auth']),
		unreadNotifications() {
			return this.notifications.filter(notification => notification.read == false).length;
		},
		filteredGroups() {
            return this.groups.filter(group => group.members.includes(this.user.id)).length;
        },
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
		},
		// notification(val) {
		// 	this.notifications = val;
		// },
		// group(val) {
		// 	this.groups = val;
		// },
		enableNotification() {
			if (this.isNotification) {
				return;
			} else {
				this.isNotification = true;
				this.isGroup = false;
				this.isSettings = false;
				this.isBookmarks = false;
				this.isProject = false;
			}
		},
		enableGroup() {
			if (this.isGroup) {
				return;
			} else {
				this.isGroup = true;
				this.isNotification = false;
				this.isSettings = false;
				this.isBookmarks = false;
				this.isProject = false;
			}
		},
		enableSettings() {
			if (this.isSettings) {
				return;
			} else {
				this.isSettings = true;
				this.isNotification = false;
				this.isGroup = false;
				this.isBookmarks = false;
				this.isProject = false;
			}
		},
		enableBookmarks() {
			if (this.isBookmarks) {
				return;
			} else {
				this.isBookmarks = true;
				this.isSettings = false;
				this.isNotification = false;
				this.isGroup = false;
				this.isProject = false;
			}
		},
		enableProject() {
			if (this.isProject) {
				return;
			} else {
				this.isProject = true;
				this.isBookmarks = false;
				this.isSettings = false;
				this.isNotification = false;
				this.isGroup = false;
			}
		}
	}
}
</script>

<style scoped>
.dashboard {
	padding: 1rem;
}
.profile {
    display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: space-evenly;
	border-bottom: 1px solid #DFAB24;
	border-bottom-width: 4px;
    border-bottom-style: inset;
}
.avatar img {
	border-radius: 9999px;
    max-height: 8rem;
    width: 8rem;
}
.icon--container {
	/* border-bottom: 1px solid rgb(223, 171, 36); */
	/* border-bottom: 1px solid #DFAB24; */
    display: flex;
}
.notification, .group, .setting, .bookmarks, .project {
	margin-left: 0.5rem;
	font-size: 0.8rem;
	display: flex;
    flex-direction: column;
	outline: none;
    border: none;
    background-color: transparent;
	margin: 0;
    padding: 0;
}
/* .icon {
	width: 50px;
	height: 55px;
} */
.icon {
	width: 50px;
	height: 100px;
}
.profile--icon {
    fill: #DFAB24;
}
.bookmark--icon {
	fill: #DFAB24;
}
.project--icon {
	fill: #DFAB24;
}
@media screen and (min-width: 480px) {
.icon {
	width: 100px;
	height: 170px;
}
}
</style>