<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="home">
			<section class="home--header">
			</section>
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
.home {
	position: relative;
	padding: 1rem;
}
.home--header {
}
</style>