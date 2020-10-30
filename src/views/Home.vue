<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="home">
			<div v-if="message" style="color: #ff0000; background-color: #fff; padding: .5rem 0; text-align: center;" v-html="message"></div>
			<section class="home--header">
			</section>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
import { mapGetters } from 'vuex'

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
        ...mapGetters(['message']),
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