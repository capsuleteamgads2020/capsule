<template>
    <div class="" ref="container">
        <header ref="header">
			<div>
				<!-- <div class="hamburger" id="hamburger" ref="hamburger" @click.prevent="menu"><span class="openMenu" ref="openMenu">&#9776;</span><span name="close menu" class="closeMenu" ref="closeMenu">&#10005;</span></div> -->
				<div class="hamburger" id="hamburger" ref="hamburger" @click.prevent="menu"><span class="openMenu" ref="openMenu">&#9776;</span></div>
			</div>
			<div class="logo mobile--logo">
				<router-link class="mobile--logo--link" style="" :to="{ name: 'Home' }"><img alt="Capsule logo" src="../../assets/logo.svg"></router-link>
			</div>
        </header>
		<nav class="nav" ref="nav">
			<!-- https://stackoverflow.com/a/48633080-->
			<span class="hamburger" id="hamburger" ref="hamburger" @click.prevent="menu"><span name="close menu" class="closeMenu" ref="closeMenu">&#10005;</span></span>
			<router-link :disabled='!isMenu' class="link--item logo mobile--logo--link" style="background-color: transparent;" :to="{ name: 'Home' }"><img alt="Capsule logo" src="../../assets/logo.svg"></router-link>
			<ul class="menu">
				<!-- <li class="list--item logo"><router-link class="link--item" :to="{ name: 'Home' }"><img alt="Capsule logo" src="../../assets/logo.svg"></router-link></li> -->
				<li class="list--item"><router-link class="link--item home" :to="{ name: 'Home' }">Home</router-link></li>
				<li class="list--item"><router-link class="link--item" :to="{ name: 'About' }">About</router-link></li>
				<li class="list--item"><router-link class="link--item" :to="{ name: 'Forum' }">Forum</router-link></li>
				<li v-if="isUser" class="list--item"><router-link class="link--item" :to="{ name: 'Projects' }">Projects</router-link></li>
				<li class="list--item"><router-link class="link--item" :to="{ name: 'Groups' }">Groups</router-link></li>
				<!-- <li class="list--item"><router-link class="link--item" :to="{ name: 'Blog' }">Blog</router-link></li> -->
				<li v-if="isUser" class="list--item"><router-link class="link--item" :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
				<li v-if="isUser" class="list--item"><a class="link--item" to="#" @click.stop="onSignOut">Sign Out</a></li>
				<li v-if="!isUser" class="list--item"><router-link class="link--item" :to="{ name: 'Account' }">Account</router-link></li>
			</ul>
		</nav>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			isHovering: false,
			isMenu: false,
			message: '',
		}
	},
	created() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize);
	},
	computed: {
        ...mapGetters(['isUser']),
    },
	methods: {
		handleResize() {
			if (window.innerWidth > 940) {
				this.$emit('toggleMenu', this.isMenu = false);
				if (this.$refs.nav || this.$refs.hamburger || this.$refs.header) {
					this.$refs.header.classList.remove('active');
					this.$refs.nav.classList.remove('active');
					this.$refs.hamburger.classList.remove('active');
				}

			}
		},
		menu() {
			this.$emit('toggleMenu', this.isMenu = !this.isMenu);
			//Open and closes the menu icon in mobile mode touchend
			const hamburger = this.$refs.hamburger;
			const header = this.$refs.header;
			const nav = this.$refs.nav;
			// const overlay = document.querySelector('#overlay');
			// overlay.classList.toggle('active');
			header.classList.toggle('active');
			nav.classList.toggle('active');
			const open = this.$refs.openMenu;
			const close = this.$refs.closeMenu;
			if (this.isMenu == true) {
				hamburger.classList.add('active');
				open.style.display = 'none';    
				close.style.display = 'block';
			} else {
				hamburger.classList.remove('active');
				open.style.display = 'block';
				close.style.display = 'none';
			}
		},
		onSignOut() {
			// handle logout
			this.$store.dispatch('signOut')
			.then(() => {
				// Sign-out successful.
				this.message = 'Your sign out was successfully!!!';
				this.$emit('message', this.message);
				this.$store.dispatch('getMessage', this.message);
				this.$router.push({name: 'Account'});
				// window.location.reload();
			})
			.catch((error) =>{
				// An error happened.
				this.status = error.message;
				this.$store.dispatch('getMessage', this.message);
				this.$router.push("/account");
				// this.$router.push({name: 'account'})
			});
		},
	},
}
</script>

<style scoped>
.angle {
	-webkit-transform: rotate(-45deg);
	transform: rotate(-180deg);
	display: inline-block;
	/* margin-left: 1rem; */
	/* content: '\e75f'; */
}
ul {
	/*   list-style-type: none; */
	list-style: none; /* Remove list bullets */
	padding: 0;
	margin: 0;
}
li {
	padding: 0;
	margin: 0;
}
a {
	text-decoration: none;
	font-size: 1.5rem;
	color: #000000;
}

/* mobile devices */
header {
    /* background-color: #834147;
    background-color: #adb7d3; */
    background-color: #DFAB24;
    text-align: center;
    /* -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75); */
    /* filter: drop-shadow(1px 2px 3px #000000); */
}
/* header.active {
background-color: #834147;
} */
.account {
	background-color: #fc3217;
}
	.list--item.main_logo {
	display: none
}
.mobile--logo {
	color: #ffffff;
	padding: 1rem 1.5rem;
}
.mobile--logo--link {
	background-color: #DFAB24 !important;
}
.logo {
	color: #FFFFFF;
	text-align: left;
	padding-top: 1.2rem;
	padding-top: 1rem;
	font-size: 1.5rem;
	font-weight: 700;
	max-height: 68px;
}
.hamburger {
	position: absolute;
	right: 0;
	cursor: pointer;
	margin-right: 1.5rem;
	/* top: 0.5rem; */
	font-size: 2.5rem;
	color: #FFFFFF;
	z-index: 20;
}
.hamburger.active {
	position: absolute;
	/* left: -3.5rem; */
	/* right: unset; */
	z-index: 20;
}
.closeMenu {
	display: none;
	padding-top: 0.5rem;
}
nav {
	background-color: #DFAB24;
	position: absolute;
	padding: 0;
	margin: 0;
	font-size: 1.5rem;
	text-align: center;
	width: 100%;
	height: 100%;
	/* padding-top: 3.5rem; */
	top: 0;
	left: -100%;
	z-index: 10;
	transition: all 500ms linear;
}
nav.active {
	position: fixed;
	width: 100%;
	height: 100%;
	/* padding-top: 3.5rem; */
	top: 0;
	left: 0;
	z-index: 10;
	transition: all 500ms linear;
}
.menu {
	font-size: 0;
	border-top: 1px solid #ffffff;
}
.list--item {
	display: block;
	font-size: 1.5rem;
	padding: 0;
	margin: 0;
	cursor: pointer;
	border-bottom: 1px solid #ffffff;
}
.list--item.logo {
	margin-right: 0;
}
/* .list--item:hover { */
/*   background-color: #b2bbcf; */
/* } */
.link--item {
	font-size: 1.5rem;
	font-weight: 700;
	display: block;
	padding: 1rem 1.5rem;
	margin: 0;
	color: #FFFFFF;
	-webkit-transition: all 1s ease-out;
	transition: all 1s ease-out;
}
.link--item:hover {
	color: #000000;
	/*   opacity: 0.5; */
	background-color: #fee7d0;
	transition: all 0.6s ease-in;
}
/* Wider screen */
@media screen and (min-width: 940px) {
/* @media screen and (min-width: 481px) and (max-width: 1020px) { */
.mobile--logo {
	display: none;
}
.hamburger {
	display: none;
}
/* nav {
  background-color: #DFAB24;
  display: flex;
  position: relative;
} */
nav {
	background-color: #DFAB24;
	position: relative;
	display: flex;
	padding: 0;
	margin: 0;
	font-size: 1.5rem;
	text-align: center;
	width: 100%;
	height: 100%;
	padding: 0 12rem;
	top: 0;
	left: 0;
	z-index: 10;
	transition: all 500ms linear;
}
.menu {
	border-top: none;
}
.logo {
  margin: 0 1rem;
  padding-top: 0.6rem;
  cursor: pointer;
  /* display: inline-block; */
}
.logo:hover {
  opacity: 0.8;
}
.menu {
  margin: 0 1rem;
  padding: 0;
}
.list--item {
  display: inline-block;
  padding:  0;
  margin: 0;
  border-bottom: none;
}
.link--item {
  display: block;
  padding: 1.5rem;
  margin: 0;
  transition: all 1s ease-out;
/*   background-color: red; */
}
.link--item:hover {
  background-color: #fecccc; 
  transition: all 0.6s ease-in;
/*   padding: 1rem; */
  margin: 0;
}
}
</style>