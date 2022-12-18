<template>
  <form class="signup-input-form" id="signup-form">
    <input
      type="text"
      :value="username"
      placeholder="username"
      required
      pattern="^[A-Za-z0-9]{3,10}$"
    />
    <input
      type="email"
      :value="email"
      placeholder="email@example.com"
      required
    />
    <input type="password" :value="password" placeholder="Password" required />
    <input
      type="password"
      :value="password"
      placeholder="Conforf Password"
      required
    />
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  name: 'SignUpForm',
  userName: '3-10 characters without any special character!',
};
</script>

<style>
.signup-input-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
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
