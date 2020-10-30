<template>
    <div class="bookmarks--container">
        <section class="bookmarks" v-if="bookmarks.length">
            <section  v-for="(bookmark) in bookmarks" :key="bookmark.id" style="border-bottom: 1px solid #DFAB24;">
                <section class="bookmarks--item">
                    <div class="bookmarks--profile">
                        <div class="bookmarks--profile--avatar">
                            <router-link class="link--item home" :to="{ name: 'Home' }">
                                <img src="../../assets/avatar.jpeg" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;">
                                <!-- <img :src="bookmark.avatar" alt="Avatar" style="border-radius: 9999px; max-height: 4rem; width: 4rem;"> -->
                            </router-link>
                        </div>
                        <div class="bookmarks--profile--detail">
                            <div class="bookmarks--user">{{ bookmark.user }}</div>
                            <div class="bookmarks--dot">·</div>
                            <div class="bookmarks--timeline" title="11:36 PM · Sep 22, 2020"><time datetime="2020-09-22T22:36:39.000Z">{{timer(bookmark.created_at)}}</time></div>
                        </div>
                    </div>
                    <div class="bookmarks--content" :class="{ active: !bookmark }">
                        <div class="bookmarks--text">
                            <div>{{ bookmark.comment }}</div>
                        </div>
                        <!-- <div class="bookmarks--text">{{ bookmark.images }}</div> -->
                        <div v-if="!bookmark" class="bookmarks--timestamp">
                            <div class="bookmarks--datetime">1:23 PM · Oct 22, 2020</div>
                        </div>
                        <div v-if="!bookmark" class="bookmarks--content--divider"></div>
                        <div v-if="!bookmark" class="bookmarks--metrics">
                            <div class="bookmarks--metrics--replies">
                                <div class="bookmarks--metrics--replies--count">{{ bookmark.replies.length }}</div>
                                <div class="bookmarks--metrics--replies--text">{{ bookmark.replies.length > 1 ?  'Replies' : 'Replies'}}</div>
                            </div>
                            <div class="bookmarks--metrics--likes">
                                <div class="bookmarks--metrics--likes--count">{{ bookmark.likes.length }}</div>
                                <div class="bookmarks--metrics--likes--text">{{ bookmark.replies.length > 1 ?  'Likes' : 'Like'}}</div>
                            </div>
                        </div>
                        <div v-if="bookmark" class="bookmarks--content--divider"></div>
                        <div class="bookmarks--options">
                            <div class="bookmarks--controls">
                                <button type="button" class="bookmarks--reply--button">
                                    <svg viewBox="0 0 24 24" class="bookmarks--reply--button--icon">
                                        <g>
                                            <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                                        </g>
                                    </svg>
                                    <span class="bookmarks--reply--count">{{ bookmark.replies.length }}</span>
                                </button>
                                <button type="button" class="bookmarks--like--button">
                                    <svg viewBox="0 0 24 24" class="bookmarks--like--button--icon">
                                        <g>
                                            <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                                            <path v-if="bookmark.likes.includes(user.id)" :class="{like: bookmark.likes.includes(user.id)}" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
                                        </g>
                                    </svg>
                                    <span class="bookmarks--like--count">{{ bookmark.likes.length }}</span>
                                </button>
                            </div>
                            <div class="bookmarks--bookmark">
                                <button type="button" class="bookmarks--bookmark--button" @click="unBookmark(bookmark)">
                                    <svg viewBox="0 0 24 24" class="bookmarks--bookmark--button--icon">
                                        <g>
                                            <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
        <section class="bookmarks" v-else>
            <div>Bookmark is empty!!!</div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
	name: 'Bookmarks',
    data() {
        return {
            bookmark: true,
        }
    },
    computed: {
        ...mapGetters(['bookmarks', 'user']),
        // ...mapState(['bookmarks', 'auth']),
    },
    mounted() {
        this.timer();
    },
    methods: {
        timer(ref_time) {
            const millis = Date.now() - ref_time;

            return Math.floor(millis / 1000) < 60? Math.floor(millis / 1000) + 's' : Math.floor(millis / 1000 / 60) < 60 ? Math.floor(millis / 1000 / 60) + 'm' :  Math.floor(millis / 1000 / 60 / 60) < 24 ? Math.floor(millis / 1000 / 60 / 60) + 'h' : Math.floor(millis / 1000 / 60 / 60 / 24) + 'd';
        },
		unBookmark(bookmark) {
			this.$store.dispatch('updateBookmark', bookmark)
		},
    }
}
</script>

<style scoped>
.like {
	fill: #e0245e;
	display: block;
}
.bookmarks--container {
    font-size: inherit;
    display: block;
    margin-top: 1rem;
    /* background-color: #fff; */
    background-color: #edf2f7;
    border-radius: .25rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.bookmarks {
    padding: .5rem 0;
    /* border-bottom: 8px solid #edf2f7; */
    background-color: #fff;
    border-radius: 10px;
    /* border-bottom-width: 8px;
    border-color: #edf2f7; */
}
.bookmarks:hover {
    background-color:#f7fafc;
}

/* bookmarks */
.bookmarks--item {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 1rem;
	padding-bottom: 5px;
	font-weight: 600;
}
.bookmarks--profile {
	display: flex;
	margin-top: .5rem;
}
.bookmarks--profile--avatar {
    margin-right: 10px;
	width: 20%;
}
.bookmarks--profile--detail {
	display: flex;
	margin-top: 1.5rem;
}
.bookmarks--user {
	font-weight: 600;
}
.bookmarks--dot {
    font-weight: 400;
    overflow-wrap: break-word;
    line-height: 1.3125;
	margin-left: 5px;
}
.bookmarks--timeline {
	margin-left: 5px;
}
.bookmarks--text {
	text-align: left;
	/* margin: .5rem 0; */
}
.bookmarks--timestamp {
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
.bookmarks--content {
	display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: auto;
	padding-left: 10px;
}
.bookmarks--content.active {
	display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0;
	padding-left: 0;
	padding: 1rem;
}
.bookmarks--datetime {
	white-space: pre-wrap;
    word-wrap: break-word;
}
.bookmarks--metrics {
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
.bookmarks--metrics--replies {
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
.bookmarks--metrics--replies--count {
	margin-right: .2rem;
}
.bookmarks--metrics--likes {
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
.bookmarks--metrics--likes--count {
	margin-right: .2rem;
}
.bookmarks--options {
	display: flex;
	justify-content: space-between;
	margin: .5rem 0;
}
.bookmarks--control {
	display: flex;
}
.bookmarks--reply--button, .bookmarks--like--button, .bookmarks--bookmark--button {
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
.bookmarks--reply--button--icon, .bookmarks--like--button--icon, .bookmarks--bookmark--button--icon {
	width: 16px;
    height: 16px;
	margin-right: 5px;
}
.bookmarks--bookmark {

}
.bookmarks--content--divider {
	border-top: 1px solid #DFAB24;
}


</style>