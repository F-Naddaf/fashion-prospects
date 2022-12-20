<template>
  <form class="login-input-form" id="login-form">
    <div class="form-container">
      <label><p>Email *</p></label>
      <input
        type="email"
        placeholder="email@example.com"
        v-model="email"
        required
      />
    </div>
    <div class="form-container">
      <label><p>Password *</p></label>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        required
      />
    </div>
    <button>Login</button>
    <router-link to="/">Forgot Password</router-link>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
};
</script>

<style scoped>
.login-input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
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
.login-input-form button {
  width: 100%;
  padding: 6px;
  border: none;
  background-color: #ff0084;
  color: white;
  font-size: 14px;
  font-weight: 700;
}
.login-input-form button:hover {
  cursor: pointer;
  background-color: #b3005c;
}
.login-input-form a {
  margin: 8px auto auto auto;
  text-decoration: none;
  font-size: 12px;
  color: rgb(80, 80, 80);
}
.login-input-form a:hover {
  text-decoration: underline;
}
</style>
