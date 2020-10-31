<template>
  <div class="reset--pass">
    <div class="dismiss--pass change" @click.prevent="toggleModal">
       <span class="hamburger" id="hamburger" ref="hamburger"><span name="close menu" class="closeMenu" ref="closeMenu">&#10005;</span></span>
    </div>
    <div class="page_head"><h2 class="page_header">Reset Your Password</h2><hr class="scotch-rule"></div> 
        <p>Please provide the email address you used when you signed up for your account.</p>
        
        <p>We will send you an email with a link to reset your password.</p><br>
    <form>
        <!-- <BaseInput label="Email" v-model="email" type="email" placeholder="user-email@domain.com" class="field" aria-required="true" aria-invalid="false" required></BaseInput> -->
        <div class="wrap">
          <!-- <BaseButton type="submit" buttonClass="-fill-gradient" @click="onRresetPassword">Send Token</BaseButton> -->
        </div>
    </form>
  </div>
</template>

<script>
// import firebase from '../../firebaseConfig'
export default {
    name: 'ResetPassword',
    props: ['forgotPassword'],
        data () {
            return {
                isResettingPassword: false,
                email: ''
            }
    },
    methods: {
        toggleModal () {
            this.$emit('resetPassword', this.isResettingPassword)
        },
        onRresetPassword () {
          // this.performingRequest = true
          // firebase.auth().sendPasswordResetEmail(this.passwordForm.email).then(() => {
          //     this.performingRequest = false
          //     this.passwordResetSuccess = true
          //     this.passwordForm.email = ''
          // }).catch(err => {
          //     this.performingRequest = false
          //     this.errorMsg = err.message
          // })
        }
    }
}
</script>


<style scoped>
.recover_pass {
    cursor: pointer;
}
.reset--pass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1rem 1.5rem;
  width: 24rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: -2px 17px 55px 28px rgba(0,0,0,1);
  -moz-box-shadow: -2px 17px 55px 28px rgba(0,0,0,1);
  box-shadow: -2px 17px 55px 28px rgba(0,0,0,1);
  /* box-shadow: 0px 2px 5px #666; */
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in-out;
}
.reset--pass_active {
  /* display: block; */
  position: absolute;
  height: 80%;
  top: 70px;
  background: #e2e2e2;
  right: 0;
  left: 0;
  margin: 0 10px;
  padding: 15px;
}
/* Email Recovery Exit Button */
.dismiss--pass {
  display: inline-block;
  position: absolute;
  right: 17px;
  top: 4px;
  cursor: pointer;
  z-index: 10;
}
/* .bar1, .bar2, .bar3 {
  width: 35px;
  height: 5px;
  background-color: #000000;
  margin: 6px 0;
  transition: 0.4s;
}
.change .bar1 {
  -webkit-transform: rotate(-45deg) translate(-9px, 6px) ;
  transform: rotate(-45deg) translate(-9px, 6px) ;
}
.change .bar2 {
  opacity: 0;
}
.change .bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px) ;
  transform: rotate(45deg) translate(-8px, -8px) ;
} */
.show {
  transform: rotate(45deg);
}
</style>