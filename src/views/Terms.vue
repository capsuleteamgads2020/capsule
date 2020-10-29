<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="terms">
			<section class="">
				<h2 class="terms--title">Terms of Use</h2>
				<h4>Last updated on 30th October 2020</h4>
				<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; border: 0; margin: 2rem 0;">
			</section>
			<section>
				<h3>INTRODUCTION AND ACCEPTANCE OF TERMS</h3>
				<p class="terms--body">
					Capsule, Inc. (collectively, "we," "us" or "Capsule") provides you access to the Capsule Services (defined below) subject to the terms 
					and conditions described in this document (this "Terms of Use") and any other guidelines, rules or licenses posted in connection with 
					any Online Community (defined below). This Terms of Use also includes our Privacy Policy, incorporated by this reference.
					By using this Service, clicking “I Agree”, registering a User Account (defined below), purchasing an Online Community, 
					or by indicating your agreement to this Terms of Use through a similar mechanism, you are agreeing to be bound by this Terms of Use. 
					If you do not agree to this Terms of Use, do not use the Services. If you under the age of 18, but at least 13 years of age, 
					you represent and agree that you are an emancipated minor or possess legal parental or guardian consent to use the Services 
					and are fully able and competent to enter into all of the conditions, obligations, affirmations, representations and warranties set forth in this Terms of Use. 
					The Services are not intended for, nor directed at, individuals under the age of 13 (or under the applicable age of consent in your jurisdiction); 
					if you are under 13 years of age (or the applicable age of consent in your jurisdiction), do not use the Services.
				</p>
				<h3>ACCESS AND USER ACCOUNTS</h3>
				<p class="terms--body">
					Access: There are different ways in which you may access or use the Services. In each and every instance, you are only authorized to use the Services 
					if you agree to abide by all applicable laws, rules, regulations, as well as this Terms of Use. You may access the Services as:
					<ul class="terms--list">
						<li>a "Visitor," meaning any individual that browses any of our Services, including, without limitation,<br> through a mobile or other wireless device without being registered,</li>
						<li>a "Student," meaning that you have created a User Account (defined below) registered and have enrolled in <br> and paid for access to the Online Communitieses and other Capsule’s Services and/or services, content, and/or certification provided by Health Partners <br> and that you intend to complete the applicable program, including the homework assignments and exams, and other requirements related to those individual programs.</li>
						<li>an "Attendee," meaning that you have created a User Account and that you intend to audit the Online Communitieses, <br> i.e., attend or view lectures online without accessing final projects or assessments required for certification, or completing the homework assignments, <br> exams or other Communitiese work related to assessments for certification.</li>
						<li>a “Mentor” meaning that you have a User Account and have entered into the Mentor Services Agreement with Capsule to provide mentoring and project review services to Students.</li>
					</ul>
					The term "User" refers to a Visitor, Student, Attendee, Mentor, or any other person that participates, interacts with, or otherwise makes use of any of the Services and/or any Capsule community (e.g., moderators, volunteers, or experts-in-residence)
				</p>
			</section>
		</div>
		<!-- <Footer></Footer> -->
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
// import Footer from '@/components/partials/Footer.vue'
export default {
	name: 'Terms',
	components: {
		Header,
		// Footer,
	},
	data() {
		return {
			menu: false,
		}
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
		},
	}
}
</script>

<style scoped>
/* Terms */
.terms {
	margin: 1rem;
	/* background-color: #fef3e7; */
}
.terms--title {
	text-align: center;
	margin: 2rem 0;
}
.terms--body {
	text-align: left;
}
.terms--list {
	list-style-type: disc;
}
</style>