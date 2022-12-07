<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'About'}">About</router-link>
  </nav> -->
  <router-view />
</template>
<script>

export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  background-color: #f3f5f6;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
