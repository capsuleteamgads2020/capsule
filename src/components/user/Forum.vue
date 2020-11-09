<template>
	<div>
	<!-- <div class="container" ref="" :class="{active: menu}">
		<Header @toggleMenu="toggleMenu"></Header>
		<div class="forum"> -->
			<div class="forum--container">
				<section class="comment" :class="{ active: !isReplying }">
					<div class="comment--avatar">
						<router-link class="link--item home" :to="{ name: 'Home' }">
							<!-- <img :src="user.avatar" :alt="user.full_name" width= 400 onerror="this.onerror=null;this.src='../assets/avatar.jpeg';" style="border-radius: 9999px; max-height: 4rem; width: 4rem;"/> -->
							<img src="../../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
						</router-link>
					</div>
					<div class="comment--content">
						<div class="comment--box">
							<label class="comment--label">
								<textarea class="comment--text" name="comment" v-model.trim="comment" @keyup="textAreaAdjust($event)" ref="comment" :maxlength="limit" @focus="onWrite($event)" placeholder="What’s happening?"></textarea>
							</label>
						</div>
						<div v-if="files.length > 0" class="comment--content--divider"></div>
						<div class="comment--attachments">
							<div class="comment--attachments--container">
								<div v-if="maximum">{{ message }}</div>
								<div v-for="(file, key) in files" :key="key" class="comment--file--listing">
									<img class="preview" :ref="'comment-image'+parseInt( key )"/>
									<button type="button" class="comment--remove--file--listing--button" @click="removeFile( key )">
										<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="40" viewBox="0 0 100 100" class="comment--remove--file--listing--button--icon">
											<g transform="translate(10,70) scale(0.05,-0.05)">
												<path fill="#e0245e" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
												</path>
											</g>
										</svg>
									</button>
									<!-- <span class="comment--remove--file--listing" @click="removeFile( key )">x</span> -->
								</div>
							</div>
						</div>
						<div v-if="focus || files.length > 0" class="comment--content--divider"></div>
						<div class="comment--options">
							<!-- <div class="comment--files">
								<div class="comment--image">
									<button type="button" class="comment--image--button" :class="{'comment--image--button--enable': file}" :disabled="file" name="commentButton" @click="addFiles()">
										<svg viewBox="0 0 24 24" class="comment--image--button--icon">
											<g>
												<path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
												<circle cx="8.868" cy="8.309" r="1.542"></circle>
											</g>
										</svg>
									</button>
									<label>
										<input type="file" id="files" ref="files" name="files" accept="image/*" multiple @change="handleFilesUpload()"/>
									</label>
									<label>
										<input type="file" id="file" ref="file" name="file" accept="image/*" @change="handleFilesUpload()"/>
									</label>
								</div>
							</div> -->
							<div class="comment--controls" v-if="commentCounter">
								<div class="comment--counter">
									<svg class="comment--counter--icon" viewBox="0 0 20 20">
										<circle cx="10" cy="10" fill="none" stroke-width="2" r="9" stroke="#38444D"></circle>
										<circle cx="-10" cy="10" fill="none" stroke-width="2" r="9" stroke-linecap="round" class="comment--counter--icon--stroke" :class="{ active: commentMaximum }" style="transform: rotate(270deg);" :style="commentStrokeDash"></circle>
										<text v-if="commentMaximum" x="8" y="13" fill="#e0245e" style="font-size: 0.5rem;">{{limit - comment.length}}</text>
									</svg>
								</div>
								<div class="comment--controls--divider"></div>
								<div class="comment--button">
									<button type="button" class="comment--btn" @click="submitComment">
										<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
											<g transform="translate(10,70) scale(0.05,-0.05)">
												<path fill="#ffffff" glyph-name="paper-plane" unicode="" d="M984 844q19-14 15-36l-142-857q-3-16-18-25-8-5-18-5-6 0-13 3l-253 103-135-164q-10-13-27-13-7 0-12 2-11 4-17 13t-7 21v195l482 590-596-516-221 91q-20 7-22 30-1 23 18 33l928 536q9 5 18 5 11 0 20-6z" horiz-adv-x="1000">
												</path>
											</g>
										</svg>
										Send
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div class="css-file forum--divider" :class="{ active: !isReplying }"></div>
				<section  v-for="(comment, index) in comments" :key="comment.id" style="border-bottom: 1px solid #DFAB24;">
					<section class="comments">
						<div class="comments--profile">
							<div class="comments--profile--avatar">
								<router-link class="link--item home" :to="{ name: 'Home' }">
									<img src="../../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
									<!-- <img :src="comment.avatar" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;"> -->
								</router-link>
							</div>
							<div class="comments--profile--detail">
								<div class="comments--user">{{ comment.user }}</div>
								<div class="comments--dot">·</div>
								<div class="comments--timeline" title="11:36 PM · Sep 22, 2020"><time datetime="2020-09-22T22:36:39.000Z">{{timer(comment.created_at)}}</time></div>
							</div>
						</div>
						<div class="comments--content" :class="{ active: active == comment }">
							<div class="comments--text">
								<div>{{ comment.comment }}</div>
							</div>
							<!-- <div class="comments--text">{{ comment.images }}</div> -->
							<div v-if="active == comment" class="comments--timestamp">
								<div class="comments--datetime">1:23 PM · Oct 22, 2020</div>
							</div>
							<div v-if="active == comment" class="comments--content--divider"></div>
							<div v-if="active == comment" class="comments--metrics">
								<div class="comments--metrics--replies">
									<div class="comments--metrics--replies--count">{{ comment.replies.length }}</div>
									<div class="comments--metrics--replies--text">{{ comment.replies.length > 1 ?  'Replies' : 'Replies'}}</div>
								</div>
								<div class="comments--metrics--likes">
									<div class="comments--metrics--likes--count">{{ comment.likes.length }}</div>
									<div class="comments--metrics--likes--text">{{ comment.replies.length > 1 ?  'Likes' : 'Like'}}</div>
								</div>
							</div>
							<div v-if="active == comment" class="comments--content--divider"></div>
							<div class="comments--options">
								<div class="comments--controls">
									<button type="button" class="comments--reply--button" @click="active = comment; clearFiles();">
										<svg viewBox="0 0 24 24" class="comments--reply--button--icon">
											<g>
												<path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
											</g>
										</svg>
										<span class="comments--reply--count">{{ comment.replies.length }}</span>
									</button>
									<button type="button" class="comments--like--button" @click="onLike(comment, user.uid)">
										<svg viewBox="0 0 24 24" class="comments--like--button--icon">
											<g>
												<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
												<path v-if="comment.likes.includes(user.uid)" :class="{like: comment.likes.includes(user.uid)? true : false}" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
											</g>
										</svg>
										<span class="comments--like--count">{{ comment.likes.length }}</span>
									</button>
								</div>
								<div class="comments--bookmark">
									<button type="button" class="comments--bookmark--button" @click="bookmark(comment)">
										<svg viewBox="0 0 24 24" class="comments--bookmark--button--icon">
											<g>
												<path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
											</g>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</section>
					<!-- <div style="background-color: red; width: 80%;">fhhdfhhd</div> -->
					<section class="reply" :class="{ active: active == comment }">
						<div class="reply--avatar">
							<router-link class="link--item home" :to="{ name: 'Home' }">
								<!-- <img :src="user.avatar" :alt="user.full_name" width= 400 onerror="this.onerror=null;this.src='../assets/avatar.jpeg';" style="border-radius: 9999px; max-height: 4rem; width: 4rem;"/> -->
								<img src="../../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
							</router-link>
						</div>
						<div class="reply--content">
							<div class="reply--back">
								<button type="button" class="reply--back--btn" @click="active = ''; clearFiles();">&#10132;</button>
							</div>
							<div class="reply--box">
								<label class="reply--label">
									<textarea class="reply--text" name="reply" v-model.trim="reply" @keyup="textAreaAdjust($event)" ref="reply" :maxlength="limit" @focus="onWrite($event)" placeholder="What’s happening?"></textarea>
								</label>
							</div>
							<!-- <div v-if="files.length > 0" class="reply--content--divider"></div> -->
							<!-- <div class="reply--attachments">
								<div class="reply--attachments--container">
									<div v-if="maximum">{{ message }}</div>
									<div v-for="(file, key) in files" :key="key" class="reply--file--listing">
										<img class="preview" :ref="'reply-image'+parseInt( key )"/>
									</div>
								</div>
							</div> -->
							<div v-if="focus" class="reply--content--divider"></div>
							<div class="reply--options">
								<div class="reply--files">
									<!-- <div class="reply--image">
										<button type="button" class="reply--image--button" :class="{'reply--image--button--enable': file}" :disabled="file" name="replyButton" @click="addReplyFiles($event, index)">
											<svg viewBox="0 0 24 24" class="reply--image--button--icon">
												<g>
													<path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
													<circle cx="8.868" cy="8.309" r="1.542"></circle>
												</g>
											</svg>
										</button>
										<label>
											<input type="file" id="replyfiles" name="replyFiles" ref="replyFiles" accept="image/*" multiple @change="handleReplyFilesUpload($event, index)"/>
										</label>
										<label>
											<input type="file" id="replyfile" name="replyFiles" ref="replyFile" accept="image/*" @change="handleReplyFilesUpload($event, index)"/>
										</label>
									</div> -->
								</div>
								<div class="reply--controls" v-if="replyCounter">
									<div class="reply--counter">
										<svg class="reply--counter--icon" viewBox="0 0 20 20">
										<circle data-v-649c4a52="" cx="10" cy="10" fill="none" stroke-width="2" r="9" stroke="#38444D"></circle>
										<circle cx="-10" cy="10" fill="none" stroke-width="2" r="9" stroke-linecap="round" class="reply--counter--icon--stroke" :class="{ active: replyMaximum }" style="transform: rotate(270deg);" :style="replyStrokeDash"></circle>
										<text v-if="replyMaximum" x="8" y="13" fill="#e0245e" style="font-size: 0.5rem;">{{limit - reply.length}}</text>
										</svg>
									</div>
									<div class="reply--controls--divider"></div>
									<div class="reply--button">
										<button type="button" class="reply--btn" @click="submitReply(comment, index)">
											<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
												<g transform="translate(10,70) scale(0.05,-0.05)">
													<path fill="#ffffff" glyph-name="paper-plane" unicode="" d="M984 844q19-14 15-36l-142-857q-3-16-18-25-8-5-18-5-6 0-13 3l-253 103-135-164q-10-13-27-13-7 0-12 2-11 4-17 13t-7 21v195l482 590-596-516-221 91q-20 7-22 30-1 23 18 33l928 536q9 5 18 5 11 0 20-6z" horiz-adv-x="1000">
													</path>
												</g>
											</svg>
											Reply
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
					<!-- <section class="replies" :class="{ active: active == comment }"> -->
						<section class="replies" :class="{ active: active == comment }" v-for="reply in comment.replies" :key="reply.id" style="border-top: 1px solid #DFAB24;">
							<div class="replies--avatar">
								<router-link class="link--item home" :to="{ name: 'Home' }">
									<img src="../../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
									<!-- <img :src="comment.avatar" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;"> -->
								</router-link>
							</div>
							<div class="replies--content">
								<div class="replies--name">
									<div class="replies--user">{{ reply.user }}</div>
									<div class="replies--dot">·</div>
									<div class="replies--time" title="11:36 PM · Sep 22, 2020"><time datetime="2020-09-22T22:36:39.000Z">{{timer(reply.created_at)}}</time></div>
								</div>
								<div class="replies--text">{{ reply.reply }}</div>
								<!-- <div class="replies--text">{{ reply.images }}</div> -->
								<!-- <div class="replies--options">
									<div class="replies--controls">
										<button type="button" class="replies--reply--button" @click="active = comment">
											<svg viewBox="0 0 24 24" class="replies--reply--button--icon">
												<g>
													<path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
												</g>
											</svg>
											<span class="replies--reply--count">33</span>
										</button>
										<button type="button" class="replies--like--button">
											<svg viewBox="0 0 24 24" class="replies--like--button--icon">
												<g>
													<path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
													<path fill="#DFAB24" v-if="like" :class="{liked: true}" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
												</g>
											</svg>
											<span class="replies--like--count">33</span>
										</button>
									</div>
									<div class="replies--bookmark">
										<button type="button" class="replies--bookmark--button">
											<svg viewBox="0 0 24 24" class="replies--bookmark--button--icon">
												<g>
													<path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
												</g>
											</svg>
										</button>
									</div>
								</div> -->
							</div>
						</section>
					<!-- </section> -->
				</section>
					
			</div>
		<!-- </div> -->
	</div>
</template>

<script>
// @ is an alias to /src
// import Header from '@/components/partials/Header.vue'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
export default {
	name: 'Forum',
	components: {
		// Header,
	},
	props: {
	},
	data() {
		return {
			active: {},
			// like: false,
			menu: false,
			focus: false,
			message: '',
			maximum: false,
			minimum: true,
			files: [],
			limit: 144,
			initial: 56.5487,
			// current: 56.5487,
			count: 0,
			files_urls: [],
			keywords: [],
			comment: '',
			reply: '',
		}
	},
	computed: {
		isReplying() {
			return Object.entries(this.active).length !== 0;
		},
		file: function () {
			return this.files.length >= 4;
		},
		replyCounter() {
			return this.reply.length > 0;
		},
		replyMaximum() {
			return this.reply.length > 135;
		},
		commentCounter() {
			return this.comment.length > 0 || this.files.length > 0;
		},
		commentMaximum() {
			return this.comment.length > 135;
		},
		commentStrokeDash() {
			return {
				// As per discussed adding variables to inline css here: https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
				'stroke-dashoffset': ((this.limit - this.comment.length) * this.initial) / this.limit,
				'stroke-dasharray': this.initial,
			};
		},
		replyStrokeDash() {
			return {
				// As per discussed adding variables to inline css here: https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component
				'stroke-dashoffset': ((this.limit - this.reply.length) * this.initial) / this.limit,
				'stroke-dasharray': this.initial,
			};
		},
		likes() {
            return this.comments.filter(comment => {
                comment.likes.includes(this.user.uid);
            })
		},
		like() {
			return this.comments.some(comment => comment.likes.includes(this.user.uid));
			// return (this.comments.some(comment => comment.likes.includes(this.user.id)));
		},
		...mapGetters(['comments', 'user', 'userInfo', 'idToken']),
	},
	mounted() {
        // setInterval(this.myTimer(), 1000);
        this.timer();
    },
	methods: {
		toggleMenu(val) {
			this.menu = val;
		},
		timer(ref_time) {
            const millis = Date.now() - ref_time;

            return Math.floor(millis / 1000) < 60? Math.floor(millis / 1000) + 's' : Math.floor(millis / 1000 / 60) < 60 ? Math.floor(millis / 1000 / 60) + 'm' :  Math.floor(millis / 1000 / 60 / 60) < 24 ? Math.floor(millis / 1000 / 60 / 60) + 'h' : Math.floor(millis / 1000 / 60 / 60 / 24) + 'd';
		},
		search_word(title, keyword){
			var text = title.toLowerCase();
			var word = keyword.toLowerCase();
			var x = 0, y = 0;
		
			for (var i = 0; i < text.length; i++) {
				if(text[i] == word[0]) {
					for(var j = i; j < i+word.length; j++) {
						if(text[j] == word[j-i]) {
							y++;
						}
						if (y == word.length) {
							x++;
						}
					}
					y=0;
				}
			}
			return x? word : '';
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
		// Clear files
		clearFiles() {
			this.files = [];
		},
		// Add a file
		addFiles() {
			this.message = '';
			this.maximum = false;
			// multiple uploads
			if (this.minimum) {
				this.$refs.files.click();
			} else {
				this.$refs.file.click();
			}
		},
		// Handles the uploading of files
		handleFilesUpload() {
			if (this.minimum) {
				// vet file upload
				if (this.$refs.files.files.length > 4 || (this.files.length + this.$refs.files.files.length) > 4) {
					this.message = 'Maximum number of 4 files allowed';
					this.maximum = true;
					return;
				}
				// Get the uploaded files from the input.
				let uploadedFiles = this.$refs.files.files;
				// Adds the uploaded file to the files array
				for( var i = 0; i < uploadedFiles.length; i++ ){
					this.files.push( uploadedFiles[i] );
				}
			} else {
				// vet file upload
				if ((this.files.length + 1) > 4) {
					this.message = 'Maximum number of 4 files allowed';
					this.maximum = true;
					return;
				}
				this.files.push(this.$refs.file.files[0]);
			}
			// Check if number of uploaded files are less than 3
			this.minimum = this.files.length < 3 ? true : false;
			// Generate image previews for the uploaded files
			this.getImagePreviews();
		},
		// Gets the preview image for the file.
		getImagePreviews(){
			// Iterate over all of the files and generate an image preview for each one.
			for( let i = 0; i < this.files.length; i++ ) {
				// Ensure the file is an image file
				if (/\.(jpe?g|png|gif)$/i.test( this.files[i].name )) {
					// Create a new FileReader object
					let reader = new FileReader();
					// Add an event listener for when the file has been loaded to update the src on the file preview.
					reader.addEventListener("load", function() {
						this.$refs['comment-image'+parseInt( i )][0].src = reader.result;
					}.bind(this), false);

					/*
					Read the data for the file in through the reader. When it has
					been loaded, we listen to the event propagated and set the image
					src to what was loaded from the reader.
					*/
					reader.readAsDataURL( this.files[i] );
				}
			}
				
		},
		// Removes a select file the user has uploaded
        removeFile(key) {
            this.files.splice( key, 1 );
        },
		onLike (comment, id) {
            if (!comment.likes.includes(id)) {
				var likeComment = firebase.functions().httpsCallable('likeComment');
				likeComment({id: comment.id, user_id: this.user.uid})
				.then((res) => {
					// Read result of the Cloud Function.
					this.$store.dispatch('likeComment', comment);
					this.$store.dispatch('getMessage', res.data.message);
					if (this.message != '') {
						this.status = this.message;
						this.callFunction();
					}
				})
				.catch((error) => {
					this.$store.dispatch('getMessage', error.message);
				});
            } else {
				var unlikeComment = firebase.functions().httpsCallable('unlikeComment');
				unlikeComment({id: comment.id, user_id: this.user.uid})
				.then((res) => {
					// Read result of the Cloud Function.
					this.$store.dispatch('likeComment', comment);
					this.$store.dispatch('getMessage', res.data.message);
					if (this.message != '') {
						this.status = this.message;
						this.callFunction();
					}
				})
				.catch((error) => {
					this.$store.dispatch('getMessage', error.message);
				});
            }
		},
		bookmark(comment) {
			this.$store.dispatch('updateBookmark', comment)
		},
		submitComment() {
			this.$refs.comment.style.height = '36px';
			this.userInfo.keywords.forEach(keyword => {
				const res = this.search_word(this.comment, keyword);
				if (res) {
					this.keywords.push(res);
				}				
			})
            if(this.comment != '') {
                var comment = {
                    comment_id: Date.now() + '_' + this.user.uid,
                    admin: false,
                    user: this.user.displayName,
					avatar: this.user.photoURL,
					keywords: this.keywords,
					comment: this.comment,
					files_urls: [],
                    created_at: Date.now(),
                    likes: [],
                    replies: [],
				};
				this.$store.dispatch('addComment', comment)
				.then(() => {
					this.comment = '';
				})
				.catch(err => {
					return err;
				});
            }
		},
		submitReply(comment, index) {
			this.$refs.reply[index].style.height = '36px';
            if(this.reply != '') {
                
                let reply = {
					reply_id: Date.now() + '_' + this.user.id,
					comment_id: comment.id,
                    admin: false,
                    user: this.user.displayName,
                    avatar: this.user.photoURL,
                    reply: this.reply,
                    created_at: Date.now(),
				};
				this.$store.dispatch('addReply', reply)
				.then(() => {
					this.reply = '';
					this.active = '';
				})
				.catch(err => {
					return err;
				});
                // this.submitComment();
            }
        },
	},
}
</script>

<style scoped>
.like {
	fill: #e0245e;
	display: block;
}
.forum {
	/* padding: 1rem; */
	/* display: flex; */
}
.forum--container {
	border-top: 1px solid #DFAB24;
	border-left: 1px solid #DFAB24;
	border-right: 1px solid #DFAB24;
}
/* .comment {
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
} */

.comment {
    display: none;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 5px;
}
.comment.active {
    display: flex;
}
.comment--avatar {
    /* flex-basis: 49px;
    -webkit-box-flex: 0;
    flex-grow: 0; */
    /* padding-top: 5px; */
    margin-right: 10px;
	width: 20%;
}
.comment--content {
	display: flex;
    /* flex-basis: auto; */
    flex-direction: column;
    width: 80%;
	padding-top: 5px;
}
.comment--content--divider {
    background-color: #DFAB24;
    width: 100%;
    height: 1px;
	margin: 10px 0;
}
.comment--box {
	/* -webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box; */
	width: 100%;
	padding-right: 5px;
}
.comment--label {
	/* display: block;
	border: 3px solid #38c;
	padding: 10px; */
	width: 100%;
}
.comment--text {
	width: 100%;
	padding: .2rem;
	resize: none;
	outline: none;
    border: none;
	overflow:hidden;
}
/* .comment--text::-webkit-scrollbar {
   display: none;
} */
.comment--attachments--container {
	width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding-right: 5px;
    /* border: 1px solid #c3c3c3; */
}
.comment--file--listing {
	width: 50%;
	position: relative;
	/* max-width: 300px;
    max-height: 200px; */
	/* aspect-ratio:2/1; */
}
.comment--file--listing img {
    max-width: 100%;
	width: 100%;
	height: 100%;
	/* aspect-ratio:2/1; */
	/* object-fit: contain; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
	display: block; /* remove extra space below image */
}
.comment--remove--file--listing--button {
    border-radius: 9999px;
    display: inline-block;
    height: 1.5rem;
    width: 1.5rem;
    color: #718096;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
	margin: 0;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: #7f7f7f;
    position: absolute;
    top: .5rem;
    right: .5rem;
}
.comment--remove--file--listing--button--icon {
	vertical-align: top;
    margin-left: 5px;
}
.rem {
	color: red;
    cursor: pointer;
    transform: scale(1);
    position: absolute;
    top: 0;
    right: 1rem;
    background-color: #000000;
    border-radius: 9999px;
    max-height: 1.5rem;
    max-width: 1.5rem;
    height: 1rem;
    width: 1rem;
    opacity: .8;
}
.comment--remove--file--listing {
    color: red;
    cursor: pointer;
    transform: scale(2);
    position: absolute;
    top: 0;
    right: 1rem;
    background-color: #000000;
    border-radius: 9999px;
    max-height: 1.5rem;
    max-width: 1.5rem;
    height: 1.5rem;
    width: 1.5rem;
    opacity: .8;
}
.comment--options {
	display: flex;
    justify-content: space-between;
	/* margin-top: 10px; */
}
.comment--files {
	display: flex;
}
.comment--image--button {
	outline: none;
	border: none;
	cursor: pointer;
    background-color: transparent;
    border-radius: 0;
    /* color: inherit; */
    appearance: none;
	padding: 0;
    margin: 0;
}
.comment--image--button--enable {
	opacity: 0.5;
	cursor: not-allowed;
}
.comment--image--button--icon {
	width: 30px;
    height: 30px;
}
input[type="file"]{
    position: absolute;
    top: -500px;
}
.comment--controls {
    display: flex;
    flex-direction: row;
}
.comment--counter--icon {
	width: 30px;
    height: 30px;
	/* -webkit-transform: rotate(-80deg);
	transform: rotate(-80deg); */
	/* overflow: visible; */
}
.comment--counter--icon--stroke {
	stroke: #DFAB24;
}
.comment--counter--icon--stroke.active {
	stroke: #e0245e;
}
.comment--controls--divider {
    margin-left: calc(8px);
    background-color: rgb(107, 125, 140);
    height: 30px;
    width: 1px;
    margin-right: 10px;
}
.comment--button {
	padding-right: 5px;
}
.comment--btn {
    background-color: #DFAB24;
    border-radius: 5px;
    display: inline-block;
    /* height: 2.5rem;
    width: 2.5rem; */
    /* margin-right: 1rem; */
    /* padding: .5rem; */
    color: #ffffff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: .3rem;
    outline: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.forum--divider {
	display: none;
    height: 10px;
    background-color: #DFAB24;
	opacity: .5;
}
.forum--divider.active {
	display: block;
}
/* Comments */
.comments {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 5px;
	font-weight: 600;
}
.comments--profile {
	display: flex;
	margin-top: .5rem;
}
.comments--profile--avatar {
    margin-right: 10px;
	width: 20%;
}
.comments--profile--detail {
	display: flex;
	margin-top: 1.5rem;
}
.comments--user {
	font-weight: 600;
}
.comments--dot {
    font-weight: 400;
    overflow-wrap: break-word;
    line-height: 1.3125;
	margin-left: 5px;
}
.comments--timeline {
	margin-left: 5px;
}
.comments--text {
	text-align: left;
	/* margin: .5rem 0; */
}
.comments--timestamp {
	margin: .5rem 0;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
	display: flex;
    margin-right: 10px;
    font-weight: 600;
    overflow-wrap: break-word;
    min-width: 0px;
    line-height: 1.3125;
}
.comments--content {
	display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
	padding-left: 10px;
}
.comments--content.active {
	display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
	padding-left: 0;
	padding: 1rem;
}
.comments--datetime {
	white-space: pre-wrap;
    word-wrap: break-word;
}
.comments--metrics {
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
	display: flex;
	margin: .5rem 0;
    font-weight: 600;
    overflow-wrap: break-word;
    min-width: 0px;
    line-height: 1.3125;
}
.comments--metrics--replies {
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
	display: flex;
    margin-right: 10px;
    font-weight: 600;
    overflow-wrap: break-word;
    min-width: 0px;
    line-height: 1.3125;
}
.comments--metrics--replies--count {
	margin-right: .2rem;
}
.comments--metrics--likes {
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    flex-direction: row;
	display: flex;
    /* margin-right: 10px; */
    font-weight: 600;
    overflow-wrap: break-word;
    min-width: 0px;
    line-height: 1.3125;
}
.comments--metrics--likes--count {
	margin-right: .2rem;
}
.comments--options {
	display: flex;
	justify-content: space-between;
	margin: .5rem 0;
}
.comments--control {
	display: flex;
}
.comments--reply--button, .comments--like--button, .comments--bookmark--button {
    display: inline-block;
    display: inline-flex;
    justify-content: center;
    align-items: center;
	outline: none;
	border: none;
	cursor: pointer;
    background-color: transparent;
    border-radius: 0;
    appearance: none;
	padding: 0;
    margin: 0;
	margin-right: 5px;
}
.comments--reply--button--icon, .comments--like--button--icon, .comments--bookmark--button--icon {
	width: 16px;
    height: 16px;
	margin-right: 5px;
}
.comments--bookmark {

}
.comments--content--divider {
	border-top: 1px solid #DFAB24;
}
/* reply */
.reply {
    display: none;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 5px;
	font-weight: 600;
}
.reply.active {
    display: flex;
}
.reply--avatar {
    /* flex-basis: 49px;
    -webkit-box-flex: 0;
    flex-grow: 0; */
    /* padding-top: 5px; */
    margin-right: 10px;
	width: 20%;
}
.reply--content {
	display: flex;
    /* flex-basis: auto; */
    flex-direction: column;
    width: 80%;
	padding-top: 5px;
}
.reply--content--divider {
    background-color: #DFAB24;
    width: 100%;
    height: 1px;
	margin: 10px 0;
}
.reply--back {
	text-align: left;
}
.reply--back--btn {
    /* background-color: #DFAB24; */
    background-color: transparent;
    border-radius: 5px;
    color: inherit;
    appearance: none;
    display: inline-block;
    color: #000000;
    display: inline-flex;
    justify-content: center;
    align-items: center;
	font-size: 1.5rem;
    padding: 0 .2rem;
    outline: none;
    border: none;
    cursor: pointer;
    /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3); */
	-webkit-transform: rotate(-45deg);
	transform: rotate(-180deg);
}
.reply--box {
	/* -webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box; */
	width: 100%;
	padding-right: 5px;
}
.reply--label {
	/* display: block;
	border: 3px solid #38c;
	padding: 10px; */
	width: 100%;
}
.reply--text {
	width: 100%;
	padding: .2rem;
	resize: none;
	outline: none;
    border: none;
	overflow:hidden;
}
.reply--attachments--container {
	width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid #c3c3c3; */
}
.reply--file--listing {
	width: 50%;
	/* max-width: 300px;
    max-height: 200px; */
	/* aspect-ratio:2/1; */
}
.reply--file--listing img {
    max-width: 100%;
	width: 100%;
	height: 100%;
	/* aspect-ratio:2/1; */
	/* object-fit: contain; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
	display: block; /* remove extra space below image */
}
.reply--options {
	display: flex;
    justify-content: space-between;
	/* margin-top: 10px; */
}
.reply--files {
	display: flex;
}
.reply--image--button {
	outline: none;
	border: none;
	cursor: pointer;
    background-color: transparent;
    border-radius: 0;
    /* color: inherit; */
    appearance: none;
	padding: 0;
    margin: 0;
}
.reply--image--button--enable {
	opacity: 0.5;
	cursor: not-allowed;
}
.reply--image--button--icon {
	width: 30px;
    height: 30px;
}
input[type="file"]{
    position: absolute;
    top: -500px;
}
.reply--controls {
    display: flex;
    flex-direction: row;
}
.reply--counter--icon {
	width: 30px;
    height: 30px;
	/* overflow: visible; */
}
.reply--counter--icon--stroke {
	stroke: #DFAB24;
}
.reply--counter--icon--stroke.active {
	stroke: #e0245e;
}
.reply--controls--divider {
    margin-left: calc(8px);
    background-color: rgb(107, 125, 140);
    height: 30px;
    width: 1px;
    margin-right: 10px;
}
.reply--button {
	padding-right: 5px;
}
.reply--btn {
    background-color: #DFAB24;
    border-radius: 5px;
    display: inline-block;
    /* height: 2.5rem;
    width: 2.5rem; */
    /* margin-right: 1rem; */
    /* padding: .5rem; */
    color: #ffffff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: .3rem;
    outline: none;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
}
.forum--divider {
    height: 10px;
    background-color: #DFAB24;
	opacity: .5;
}

/* Replies */
.replies {
	display: none;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 5px;
}
.replies.active {
	display: flex;
}
.replies--avatar {
    /* flex-basis: 49px;
    -webkit-box-flex: 0;
    flex-grow: 0; */
    /* padding-top: 5px; */
    margin-right: 10px;
	width: 20%;
}
.replies--content {
	display: flex;
    /* flex-basis: auto; */
    flex-direction: column;
    width: 80%;
	padding-top: 5px;
}
.replies--name {
	display: flex;
}
.replies--user {
	font-weight: 600;
}
.replies--dot {
    font-weight: 400;
    overflow-wrap: break-word;
    line-height: 1.3125;
	margin-left: 5px;
}
.replies--time {
	margin-left: 5px;
}
.replies--text {
	text-align: left;
	margin: .5rem 0;
}
.replies--options {
	display: flex;
	justify-content: space-between;
}
.replies--control {
	display: flex;
}
.replies--reply--button, .replies--like--button, .replies--bookmark--button {
    display: inline-block;
    display: inline-flex;
    justify-content: center;
    align-items: center;
	outline: none;
	border: none;
	cursor: pointer;
    background-color: transparent;
    border-radius: 0;
    appearance: none;
	padding: 0;
    margin: 0;
	margin-right: 5px;
}
.replies--reply--button--icon, .replies--like--button--icon, .replies--bookmark--button--icon {
	width: 16px;
    height: 16px;
	margin-right: 5px;
}
.replies--bookmark {

}
/* Wider screen */
@media screen and (min-width: 482px) {
.comment--remove--file--listing--button {
    border-radius: 9999px;
    /* display: inline-block; */
    height: 2.5rem;
    width: 2.5rem;
    color: #718096;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
	margin: 0;
    outline: none;
    border: none;
    cursor: pointer;
    /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3); */
    background-color: #7f7f7f;
    position: absolute;
    top: .5rem;
    right: .5rem;
}
.comment--remove--file--listing--button--icon {
	vertical-align: top;
    margin-left: 10px;
}
.comments--reply--button--icon, .comments--like--button--icon, .comments--bookmark--button--icon {
	width: 20px;
    height: 20px;
}
}
</style>