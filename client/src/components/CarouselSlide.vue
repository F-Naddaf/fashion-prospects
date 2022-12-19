<template>
  <div v-show="visibleSlide.includes(index)" class="carousel-slider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['visibleSlide', 'index'],
  data() {
    return {};
  },
};
</script>

<style></style>
