<template>
  <form @submit.prevent="handelSubmit" class="signup-input-form">
    <ul class="error-container">
      <li v-for="(error, index) in errors" :key="index" class="error-section">
        {{ error }}
      </li>
    </ul>
    <p v-if="success" class="success-message">{{ this.success }}</p>
    <div class="form-container">
      <label><p>User Name *</p></label>
      <input
        type="text"
        placeholder="username"
        v-model="user.userName"
        required
      />
    </div>
    <div class="form-container">
      <label><p>Email *</p></label>
      <input
        type="email"
        placeholder="email@example.com"
        v-model="user.email"
        required
      />
    </div>
    <div class="form-container">
      <label><p>Password *</p></label>
      <input
        type="password"
        placeholder="Password"
        v-model="user.password"
        required
      />
    </div>
    <div class="form-container">
      <label><p>Conform Password *</p></label>
      <input
        type="password"
        placeholder="Conform Password"
        v-model="conformPassword"
        required
      />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'SignUpForm',
  data() {
    return {
      user: {
        userName: '',
        email: '',
        password: '',
      },
      conformPassword: '',
      errors: [],
      success: '',
    };
  },
  methods: {
    async handelSubmit() {
      this.errors = [];
      try {
        const response = await fetch(`http://localhost:5000/api/users/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });
        const result = await response.json();
        if (result.success) {
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
          this.success = 'You have created an account successfully';
        } else {
          this.errors.push('Sorry something went wrong');
        }
      } catch (error) {
        this.errors.push('Sorry something went wrong');
      }
      if (!this.user.userName) {
        this.errors.push('User name is empty');
      } else {
        if (!this.validUserName(this.user.userName)) {
          this.errors.push(
            'User name must be at least 5 characters include 1 number, 1 capital character!',
          );
        }
      }
      if (!this.user.email) {
        this.errors.push('Email is empty');
      } else {
        if (!this.validEmail(this.user.email)) {
          this.errors.push('invalid Email');
        }
      }
      if (!this.user.password) {
        this.errors.push('Password is empty');
      } else {
        if (!this.validPassword(this.user.password)) {
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
          this.validPassword(this.user.password)
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

<style scoped>
.signup-input-form {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin-bottom: -20px;
}
.error-container {
  position: absolute;
  top: -140px;
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
.success-message {
  position: absolute;
  top: -100px;
  width: 100%;
  padding: 0;
  font-size: 14px;
  color: green;
}
.form-container {
  position: relative;
  width: 100%;
}
.form-container label p {
  position: absolute;
  top: -20px;
  font-size: 12px;
  font-weight: 700;
  margin-left: 8px;
  background-color: rgba(255, 255, 255);
  padding: 0 6px;
  color: #b3005c;
}
.form-container input {
  width: 97%;
  padding: 5px;
  margin-bottom: 20px;
}
.form-container input::placeholder {
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
