<template>
  <NavBar />
  <!-- <router-link to="/jewelery">Home</router-link> |
    <router-link :to="{ name: 'About'}">About</router-link> -->
  <router-view :key="$route.path" />
</template>
<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
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
