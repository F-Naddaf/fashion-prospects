<template>
  <form
    @submit.prevent="handelSubmit"
    class="signup-input-form"
    id="signup-form"
  >
    <ul class="error-container">
      <li v-for="(error, index) in errors" :key="index" class="error-section">
        {{ error }}
      </li>
    </ul>
    <input type="text" placeholder="username" v-model="userName" required />
    <input
      type="email"
      placeholder="email@example.com"
      v-model="email"
      required
    />
    <input type="password" placeholder="Password" v-model="password" required />
    <input
      type="password"
      placeholder="Conform Password"
      v-model="conformPassword"
      required
    />
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
      conformPassword: '',
      errors: [],
    };
  },
  methods: {
    handelSubmit() {
      this.errors = [];
      if (!this.userName) {
        this.errors.push('User name is empty');
      } else {
        if (!this.validUserName(this.userName)) {
          this.errors.push(
            'User name must be at least 5 characters include 1 number, 1 capital character!',
          );
        }
      }
      if (!this.email) {
        this.errors.push('Email is empty');
      } else {
        if (!this.validEmail(this.email)) {
          this.errors.push('invalid Email');
        }
      }
      if (!this.password) {
        this.errors.push('Password is empty');
      } else {
        if (!this.validPassword(this.password)) {
          this.errors.push(
            'Password must be at least 8 characters include 1 number, 1 capital character & 1 special character!',
          );
        }
      }
      if (!this.conformPassword) {
        this.errors.push('Password is empty');
      } else {
        if (
          this.validConformPassword(this.conformPassword) !==
          this.validPassword(this.password)
        ) {
          this.errors.push('Password is not match!');
        }
      }
    },
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validUserName(userName) {
      const re = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{5,10}/;
      return re.test(userName);
    },
    validPassword(password) {
      const re =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return re.test(password);
    },
    validConformPassword(conformPassword) {
      const re =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      return re.test(conformPassword);
    },
  },
};
</script>

<style>
.signup-input-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}
.error-container {
  width: 100%;
  padding: 0;
}
.error-section {
  font-size: 14px;
  text-align: justify;
  color: red;
  padding-bottom: 15px;
  line-height: 1;
}
.signup-input-form label p {
  margin: 0;
}
.signup-input-form input {
  width: 97%;
  padding: 5px;
  margin-bottom: 20px;
}
.signup-input-form input::placeholder {
  color: rgba(80, 80, 80, 0.7);
  font-size: 12px;
}
.signup-input-form button {
  width: 100%;
  padding: 6px;
  border: none;
  background-color: #ff0084;
  color: white;
  font-size: 14px;
  font-weight: 700;
}
.signup-input-form button:hover {
  cursor: pointer;
  background-color: #b3005c;
}
.signup-input-form a {
  margin: 8px auto auto auto;
  text-decoration: none;
  font-size: 12px;
  color: rgb(80, 80, 80);
}
.signup-input-form a:hover {
  text-decoration: underline;
}
</style>
