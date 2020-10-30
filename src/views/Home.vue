<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu" @message="message"></Header>
		<div class="home">
			<div v-if="status" style="color: #ff0000; background-color: #fff; padding: .5rem 0; text-align: center;" v-html="status"></div>
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
			status: '',
		}
	},
	computed: {
        ...mapGetters(['message']),
	},
	mounted(){
		if (this.message != '') {
			this.status = this.message;
			this.callFunction();
		}
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
		},
		// message(message) {
		// 	this.status = message;
		// },
		callFunction: function () {
            var v = this;
            setTimeout(function () {
                v.status = '';
            }, 10000);
        },
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