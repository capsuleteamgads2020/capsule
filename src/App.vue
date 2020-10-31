<template>
  <div id="app">
    <div class="up--arrow">&uarr;</div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/partials/Header.vue'
export default {
  components: {
    // Header,
  }
  
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0%;
	padding: 0%;
}
* {
	box-sizing: border-box;
}
body {
	/* background-color: #fee5e5; */
	background-color: #f4f4f4;
	margin: 0;
	padding: 0;
	font-size: 1rem;
	font-family: fantasy;
	font-family: papyrus;
	/*   font-family: Impact; */
}
ul {
	list-style-type: none;
}
h2, h3 {
	margin: 0;
	padding: 0;
}
.container {
    margin-left: 0%;
    transition: all 500ms linear;
}
.container.active {
    position: fixed;
    margin-left: 100%;
    transition: all 500ms linear;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active,
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
	-webkit-box-shadow: 0 0 0 30px #FFFFFF inset !important;
	box-shadow: inset 0 0 6px #FFFFFF;
    appearance: menulist-button;
    background-color: #ffffff !important;
    background-image: none !important;
    color: -internal-light-dark(#ffffff, #ffffff) !important;
    color: #ffffff !important;
}
.up--arrow {
	position: absolute;
	font-size: 2rem;
	font-weight: 500;
	width: 5rem;
	height: 5rem;
	background-color: #DFAB24;
	border: 0.1rem solid #fecccc;
	text-align: center;
	padding-top: 1.2rem;
	margin: 2rem;
	border-radius: 50%;
	transition: all 1s ease-out;
	position: absolute;
	display: none;
	right: 0%;
	bottom: 0%;
}
.up--arrow:hover {
	display: block;
	background-color: #fecccc;
	border: 0.1rem solid #DFAB24;  
	transition: all 0.6s ease-in;
}
/* Wider screen */
/* @media screen and (min-width: 940px) { */
@media screen and (min-width: 480px) {
body {
	/* font-size: 1.5rem; */
}
}
</style>
