<template>
    <div class="notification--container">
        <div v-if="content">
            <section class="notification" v-for="notification in unreadNotifications" :key="notification.id">
                <div class="notification--header">
                    <h3 class="">{{ notification.name }}</h3>
                </div>
                <div class="notification--body">
                    <p>{{ notification.message }}</p>
                </div>
                <div class="notification--footer">
                    <button type="button" class="btn" v-if="!notification.read" @click="read(notification)">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                            <g transform="translate(10,70) scale(0.05,-0.05)">
                                <path fill="#DFAB24" glyph-name="ok" unicode="" d="M932 534q0-22-15-38l-404-404-76-76q-16-15-38-15t-38 15l-76 76-202 202q-15 16-15 38t15 38l76 76q16 16 38 16t38-16l164-165 366 367q16 16 38 16t38-16l76-76q15-16 15-38z" horiz-adv-x="1000">
                                </path>
                            </g>
                        </svg>
                        Mark as read
                    </button>
                    <button type="button" class="btn" v-else @click="read(notification)">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 100 100">
                            <g transform="translate(10,70) scale(0.05,-0.05)">
                                <path fill="#DFAB24" glyph-name="cancel" unicode="" d="M724 112q0-22-15-38l-76-76q-16-15-38-15t-38 15l-164 165-164-165q-16-15-38-15t-38 15l-76 76q-16 16-16 38t16 38l164 164-164 164q-16 16-16 38t16 38l76 76q16 16 38 16t38-16l164-164 164 164q16 16 38 16t38-16l76-76q15-15 15-38t-15-38l-164-164 164-164q15-15 15-38z" horiz-adv-x="785.7">
                                </path>
                            </g>
                        </svg>
                        Mark as unread
                    </button>
                </div>
            </section>
        </div>
        <div v-else style="padding: 3rem 0;">No notification!!!</div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
	name: 'Notification',
    data() {
        return {
            
        }
    },
    watch: {
        // notifications: {
        //     // As per discussion on watching nested object here: https://stackoverflow.com/a/42134176
        //     handler() {
        //         this.$emit('notification', this.notifications.filter(notification => notification.read == false).length);
        //     },
        //     deep: true
        // },
    },
    computed: {
        ...mapGetters(['notifications', 'user']),
        unreadNotifications() {
			return this.notifications.filter(notification => notification.read == false);
        },
        content() {
            return this.unreadNotifications.length > 0;
        }
    },
    mounted() {
        // this.$emit('notification', this.notifications.filter(notification => notification.read == false).length);
    },
    methods: {
        read(payload) {
            const notification = {
                id: payload.id,
                name: payload.name,
                message: payload.message,
                read: !payload.read,
            };
            this.$store.dispatch('updateNotification', notification);
        },
    },
}
</script>

<style scoped>
.notification--container {
    display: block;
    margin-top: 0.5rem;
    background-color: #fff;
    border-radius: .25rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05);
}
.notification {
    border-bottom-width: 8px;
    border-bottom: 8px solid #edf2f7;
    border-top: 8px solid #edf2f7;
    border-color: #edf2f7;
    padding: .5rem 0;
}
.notification:hover {
    background-color:#f7fafc;
}
.notification--header h3 {
    font-weight: 700;
    color: #000000;
    padding: .5rem 1rem;
    border-bottom: 1px solid;
}
.notification--body {
    display: flex;
    /* background-color:#f7fafc; */
    align-items: center;
    padding: .5rem 1rem;
    text-align: left;
}
.notification--footer {
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
}
/* button */
/* As per discussion on handling buttons https://codyhouse.co/blog/post/vertical-text-alignment-in-buttons-and-inputs */
.btn, .form-control {
    /* reset user agent stylesheet */
    background-color: transparent;
    border-radius: 0;
    color: inherit;
    appearance: none;
}
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    outline: none;
}
</style>