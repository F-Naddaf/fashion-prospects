<template>
  <NavBar />
  <router-view :key="$route.path" />
  <FooterCompo v-if="$route.path !== '/auth' && $route.path !== '/about'" />
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import FooterCompo from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterCompo,
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
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
