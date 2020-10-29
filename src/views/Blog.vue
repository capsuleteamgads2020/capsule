<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="home">
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'

export default {
	name: 'Home',
	components: {
		Header,
	},
	data() {
		return {
			menu: false,
		}
	},
	computed: {
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
		}
	}
}
</script>

<style scoped>
.about {
	padding: 1rem;
}
</style>