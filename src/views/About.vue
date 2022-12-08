<template>
  <NavBar />
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'About',
  components: {
    NavBar,
  },
};
</script>
