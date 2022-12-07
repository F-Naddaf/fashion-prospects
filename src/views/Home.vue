<template>
  <NavBar />
  <!-- <HeroSection /> -->
  <!-- <category /> -->
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/Logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
// import HeroSection from '@/components/HeroSection.vue';
// import Category from '@/components/Category.vue';

export default {
  name: 'Home',
  components: {
    NavBar,
    // HeroSection,
    // Category,
  },
};
</script>
