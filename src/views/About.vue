<template>
	<div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="about">
			<section>
				<h1>About us</h1>
				<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; margin: 1rem 0; border: 0;">
			</section>
			<section class="about--description">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ratione numquam repellat odio, laudantium accusantium. 
					Culpa, voluptates ipsam quidem voluptatibus quae dignissimos dolor voluptate delectus. Nulla libero aut esse rem.
				</p>
			</section>
			<section>
				<h1>Contact us</h1>
				<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; margin: 1rem 0; border: 0;">
			</section>
			<section>
				<div>
					<form action="">
						<div class="form--item">
							<label for="name" class="required">Full Name: </label>
							<input type="text" name="name" id="name" v-model="user.name" @focus="onFocus($event)" @blur="onBlur($event)"/>
							<span></span>
						</div>
						<div class="form--item">
							<label for="email" class="required">Email: </label>
							<input type="email" name="email" id="email" v-model="user.email" @focus="onFocus($event)" @blur="onBlur($event)"/>
							<span></span>
						</div>
						<div class="form--item">
							<label for="phone" class="required">Phone Number: </label>
							<input type="tel" name="phone" id="phone" v-model="user.phone" @focus="onFocus($event)" @blur="onBlur($event)"/>
							<span></span>
						</div>
						<div class="form--item">
							<label for="message" class="required">Message: </label>
							<textarea class="contact--description" name="message" id="message" v-model.trim="user.message" @keyup="textAreaAdjust($event)" ref="message" :maxlength="limit" @focus="onWrite($event)" placeholder="Message"></textarea>
							<span></span>
						</div>
						<div>
							<button type="button" class="btn">Submit</button>
						</div>
					</form>
				</div>
			</section>
			<section>
				<h1>Contributors</h1>
				<hr class="" style="background-image: -webkit-linear-gradient(left, #fee7d0, #fc8917, #fee7d0); height: 0.2rem; margin: 1rem 0; border: 0;">
			</section>
			<section>
				<table class="contributors" id="myTable">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Name</th>
							<th>Role</th>
							<th>Twitter</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="contributor in contributors" :key="contributor.id">
							<td>{{ contributor.id }}</td>
							<td>{{ contributor.name }}</td>
							<td>{{ contributor.role }}</td>
							<td>{{ contributor.twitter }}</td>
						</tr>
					</tbody>
				</table>
			</section>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/partials/Header.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'About',
	components: {
		Header,
	},
	data() {
		return {
			menu: false,
            limit: 280,
			user: {
				name: '',
				email: '',
				phone: '',
				message: '',
			}
		}
	},
	computed: {
        ...mapGetters(['contributors']),
	},
	methods: {
		toggleMenu(val) {
			this.menu = val;
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
		onFocus(event) {
			// event.target.style.backgroundColor = 'pink'; 
			event.target.style.borderBottom = "1px solid #000000";
			event.target.previousElementSibling.style.top = '0rem';
			event.target.previousElementSibling.style.fontSize = '1rem';
			event.target.previousElementSibling.style.marginTop = '-0.2rem';
		},
		onBlur(event) {
			if (event.target.value) {
				event.target.style.backgroundColor = '#FFFFFF';
				event.target.style.borderBottom = "none";
				event.target.previousElementSibling.style.top = '0.2rem';
				event.target.previousElementSibling.style.fontSize = '0.5rem';
				event.target.previousElementSibling.style.marginTop = '0rem';
			} else {
				event.target.style.backgroundColor = '';
				event.target.style.borderBottom = 'none';
				event.target.previousElementSibling.style.top = '';
				event.target.previousElementSibling.style.fontSize = '';
				event.target.previousElementSibling.style.marginTop = '0.3rem';
			}
		}
	}
}
</script>

<style scoped>
.about {
	padding: 1rem;
}
.about--description {
	text-align: left;
}
.form--item {
  display: inline-block;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  position: relative;
}
.required:after {
  color: #FF0000;
  content: "*";
  font-weight: 500;
  padding-left: 0.1rem;
}
label {
  position: absolute;
  margin-top: 0.3rem;
/*   top: 0.5rem; */
}
textarea,
input[type=text],
input[type=email],
input[type=password],
input[type=tel] {
	width: 100%;
	padding: 0.5rem;
	outline: none;
	border: none;
}
input[type=text]:focus, label {
/*   font-size: 0.5rem; */
}
input[type=text]:focus {
  width: 100%;
}
.contact--description {
	width: 100%;
	padding: .2rem;
	resize: none;
	outline: none;
    border: none;
    border-bottom: 1px solid #000000;
	overflow:hidden;
}
.btn {
	border: 0.1rem solid #f2ecec;
    background-color: #DFAB24;
	border-radius: 0.5rem;
	text-align: center;
	width: 100%;
	color: #FFFFFF;
	padding: 0.5rem 1rem;
	/* margin: 1rem; */
	cursor: pointer;
	transition: all 1s ease-out;
}
.btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}

.contributors {
    /* font-family: "Trebuchet MS", Arial, Helvetica, sans-serif; */
    border-collapse: collapse;
    width: 100%;
}
.contributors td, .contributors th {
    border: 1px solid #fdb873;
    padding: 8px;
    text-align: center;
}
.contributors tr:nth-child(even) {
    background-color: #fdc48b;      
}
.contributors tr:hover {
    background-color: #fff;
}
.contributors th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #DFAB24;
    color: white;
}

@media only screen and (min-width: 964px) {
/* .about {
	text-align: center;
	font-weight: 500;
} */
.btn {
	border: 0.1rem solid #f2ecec;
	background-color: #DFAB24;
	border-radius: 0.5rem;
	text-align: center;
	width: 100%;
	font-size: 1.2rem;
	color: #FFFFFF;
	padding: 0.5rem 1rem;
	/* margin: 1rem; */
	transition: all 1s ease-out;
}
.btn:hover {
	border: 0.1rem solid #DFAB24;
	background-color: #f2ecec;
	color: #000000;
	transition: all 1s ease-in;
}
}
</style>