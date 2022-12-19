<template>
  <form class="login-input-form" id="login-form">
    <input
      type="email"
      :value="email"
      placeholder="email@example.com"
      required
    />
    <input type="password" :value="password" placeholder="Password" required />
    <button>Login</button>
    <router-link to="/">Forgot Password</router-link>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
};
</script>

<style>
.login-input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}
.login-input-form label p {
  margin: 0;
}
.login-input-form input {
  width: 97%;
  padding: 5px;
  margin-bottom: 20px;
}
.login-input-form input::placeholder {
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
