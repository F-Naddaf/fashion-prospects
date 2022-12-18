<template>
  <div class="auth-container">
    <div class="image-container">
      <img alt="banner-image" src="../assets/Banner-image.png" />
    </div>
    <div class="auth-form-container">
      <div class="btns">
        <div>
          <button @click="handelLogin">Login</button>
        </div>
        <div>
          <button @click="handelSignup">SignUp</button>
        </div>
      </div>
      <span :class="`${!showLogin && 'underline'}`"></span>
      <section :class="`${!showLogin && 'show-signup'}`">
        <div>
          <SignUpForm />
        </div>
        <div>
          <LoginForm />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Auth',
  data() {
    return {
      showLogin: true,
    };
  },
  methods: {
    handelLogin() {
      if (!this.showLogin) {
        this.showLogin = true;
      }
    },
    handelSignup() {
      if (this.showLogin) {
        this.showLogin = false;
      }
    },
  },
  components: {
    LoginForm,
    SignUpForm,
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 93vh;
  width: 100%;
  background: radial-gradient(#fff, #ffcbe6);
}
.image-container {
  width: 50%;
}
img {
  width: 90%;
  filter: drop-shadow(2px 5px 8px);
  padding: 0 100px;
}
p {
  font-size: 20px;
}
.auth-form-container .login {
  top: 35%;
}
.auth-form-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  max-width: 500px;
  height: 45vh;
  margin: 0 200px 0 200px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 1s;
  overflow: hidden;
}
.auth-form-container .btns {
  display: flex;
  position: absolute;
  top: 10px;
  width: 100%;
}
.auth-form-container span {
  width: 80px;
  height: 3px;
  background-color: #ff0084;
  transform: translate(-125px, -15px);
  transition: transform 0.5s;
}
.auth-form-container .underline {
  transform: translate(125px, -15px);
  transition: transform 0.5s;
}
.auth-form-container .btns div {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: all 1s;
}

.auth-form-container button {
  width: 50%;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  color: #ff0084;
}
.auth-form-container button:hover {
  cursor: pointer;
}
.auth-form-container section {
  display: flex;
  transform: translate(-250px);
  width: 180%;
  justify-content: space-between;
  transition: transform 1s;
}
.auth-form-container .show-signup {
  display: flex;
  transform: translate(250px);
  width: 180%;
  justify-content: space-between;
  transition: transform 1s;
}
</style>
